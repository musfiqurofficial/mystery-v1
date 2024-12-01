// pages/api/products/index.js
import connectMongo from "@/lib/db";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await connectMongo(); // Ensure MongoDB connection

  if (req.method === "GET") {
    try {
      const products = await Product.find({});
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else if (req.method === "POST") {
    const { name, description, price } = req.body;
    try {
      const newProduct = new Product({ name, description, price });
      await newProduct.save();
      res.status(201).json({ product: newProduct });
    } catch (error) {
      res.status(400).json({ error: "Failed to add product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
