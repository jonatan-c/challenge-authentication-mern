export const PORT = process.env.PORT || 3000;
export const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://username:password@localhost:27020/?authMechanism=DEFAULT";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
