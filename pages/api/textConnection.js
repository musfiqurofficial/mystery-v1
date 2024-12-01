// /pages/api/testConnection.js

import connectMongo from "@/lib/db";

export default async function handler(req, res) {
  try {
    await connectMongo();
    res.json({ message: "Testing MongoDB connection!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Connection failed", error: error.message });
  }
}
