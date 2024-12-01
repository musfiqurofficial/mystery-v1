import jwt from "jsonwebtoken";
import connectMongo from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  await connectMongo();

  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    console.log(`user: ${user}`);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ name: user.name, email: user.email, image: user.imageUrl });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
