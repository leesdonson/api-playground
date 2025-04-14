class ErrorHandler extends Error {
  statusCode: number;
  statusTxt: string;
  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
    this.statusTxt = status >= 400 && status < 500 ? "Failed" : "Error";

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
