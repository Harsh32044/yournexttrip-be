import mongoose from "mongoose";
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
    const blogs = await blog.find(
      {},
      "title excerpt author publishDate tags image"
    );

    const formattedBlogs = blogs.map((blog) => blog.toJSON());

    res.json({
      blogs: formattedBlogs,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

/**
 * @openapi
 * /blog/{id}:
 *   get:
 *     summary: Gets a blog by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Blog object
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ error: "Invalid blog ID" });
    }
    const blogs = await blog.findById(req.params.id).lean();
    if (!blogs) {
      res
        .status(404)
        .json({
          msg: "We couldn't find that blogsterpiece. Please try another ;(",
        });
    } else {
      res.status(200).json({
        blogs,
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

export default router;
