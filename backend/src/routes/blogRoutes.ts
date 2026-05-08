import { Router } from "express";
import { type Request, type Response } from "express";
import { middleware } from "../middlewares/middleware";
import { prisma } from "../../lib/prisma";

export const blogRouter = Router();
blogRouter.post("/new", middleware, async (req: Request, res: Response) => {
    const title = req.body.title;
    const content = req.body.content;
    //@ts-ignore
    const authorId = req.userId;
    if (!title || !content) {
        return res.status(400).json({
            error: "Title and description required"
        });
    }

    const blog = await prisma.blog.create({
        data: {
            title,
            content,
            authorId,
            published: true
        }
    });

    return res.status(201).json({
        blog
    });
});

blogRouter.get("/user-blogs", middleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const authorId = req.userId;
    if (!authorId) {
        return res.status(400).json({
            error: "Unauthorized"
        });
    }

    const blogs = await prisma.blog.findMany({
        where: { authorId }
    });
    return res.status(201).json({
        blogs
    });
});

blogRouter.get("/all", async (req: Request, res: Response) => {
    const blogs = await prisma.blog.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" }
    });
    res.json({ blogs })
})

blogRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const blog = await prisma.blog.findUnique({
        where: { id: id as string }
    });
    if (!blog) {
        return res.status(400).json({
            err: "blog not found"
        })
    }
    return res.status(200).json({
        blog
    });
});

blogRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    const blog = await prisma.blog.update({
        where: { id: id as string },
        data: { content }
    });
    return res.json({ blog });
})

blogRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = await prisma.blog.delete({
        where: { id: id as string }
    });
    return res.json({
        success: true
    });
})