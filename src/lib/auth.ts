import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (email: string): string => {
  return jwt.sign({ email, iat: Date.now() }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): { email: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    return decoded;
  } catch (error) {
    return null;
  }
};

export const validateAdminCredentials = (
  email: string,
  password: string
): boolean => {
  const adminPassword = process.env.ADMIN_PASSWORD || "iloveyou@2025";
  return email === "admin@example.com" && password === adminPassword;
};
