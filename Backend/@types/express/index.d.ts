/** @format */

declare global {
  namespace Express {
    interface Response {
      userId: String;
    }
    interface Request {
      userId: String;
    }
    interface Session {
      userId: String;
    }
  }
}
