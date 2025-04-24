import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  signInSchema,
  SignInType,
  signUpSchema,
  SignUpType,
} from "../schemas/validationSchemas";
import ErrorHandler from "../utils/errorHandler";
import { prisma } from "../utils/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password }: SignUpType = req.body;

    const validation = signUpSchema.safeParse({ name, email });

    if (!validation.success) {
      const error = new ErrorHandler(validation.error.issues[0].message, 400);
      return next(error);
    }

    //check for existing user
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const error = new ErrorHandler("User already exists", 400);
      return next(error);
    }

    //hash the pasword
    let hashedPassword;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    //create user
    const newUser = await prisma.user.create({
      data: {
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: password ? hashedPassword : undefined,
      },
    });

    if (!newUser) {
      const error = new ErrorHandler("User could not be created", 500);
      return next(error);
    }

    //send httpOnly token
    const token = generateToken(newUser.id);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      expires: new Date(Date.now() + 900 * 60 * 1000),
    });

    res.status(201).json({
      statusTxt: "success",
      message: "User created successfully",
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  }
);

const signIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: SignInType = req.body;

    const validation = signInSchema.safeParse({ email, password });

    if (!validation.success) {
      const error = new ErrorHandler(validation.error.issues[0].message, 400);
      return next(error);
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      const error = new ErrorHandler("Invalid credentials", 400);
      return next(error);
    }

    //check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user?.password!);

    if (!isPasswordCorrect) {
      const error = new ErrorHandler("Invalid credentials", 400);
      return next(error);
    }

    //send httpOnly token
    const token = generateToken(user.id);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      expires: new Date(Date.now() + 900 * 60 * 1000),
    });

    res.status(200).json({
      statusTxt: "success",
      message: "User signed in successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  }
);
const signOut = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // destroy the token
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({
      statusTxt: "success",
      message: "User signed out successfully",
    });
  }
);

export { signUp, signIn, signOut };
