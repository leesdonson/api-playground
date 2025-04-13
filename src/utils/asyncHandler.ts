import { NextFunction, Request, Response } from "express";

interface FnProps {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}
export const asyncHandler = (fn: FnProps) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};
