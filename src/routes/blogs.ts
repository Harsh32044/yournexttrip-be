import express, { Request, Response } from "express";
const router = express.Router();

import { blog } from "../models/db";

/**
 * @openapi
 * /blog:
 *   get:
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: List of blogs
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const blogs = await blog.find({}, "title excerpt author publishDate tags image");

    const formattedBlogs = blogs.map((blog) => blog.toJSON());

    res.json({
      "blogs": formattedBlogs,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

export default router;
