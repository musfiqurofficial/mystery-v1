// pages/api/products/[id].js
import connectMongo from "@/lib/db";
import Product from "@/models/Product";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectMongo();

  if (req.method === "PUT") {
    const { name, description, price } = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, description, price },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ product: updatedProduct });
    } catch (error) {
      res.status(400).json({ error: "Failed to update product" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete product" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
