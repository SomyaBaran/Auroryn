import { prisma } from "../../lib/prisma";
import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;


if (!JWT_SECRET || JWT_SECRET.length === 0) {
    throw new Error("JWT_SECRET must be set and at least 32 characters long");
}

const SignupSchema = z.object({
    email: z.email(),
    password: z
        .string(),
    username: z
        .string()
});


export const Signup = async (req: Request, res: Response) => {    
    const result = SignupSchema.safeParse(req.body);
    // console.log(result)

    if(!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.format(),
        })
    }
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    if (!email || !username || !password) {
        return res.status(400).json({
            error: "email, username & password required"
        });
    }

    const existing = await prisma.user.findFirst({
        where: { email }
    });
    if (existing) {
        return res.status(400).json({ error: "email already exists" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: {
            email,
            username,
            password: hashed
        }
    });

    const token = jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.status(201).json({
        token,
        user: {
            id: user.id,
            email: user.email
        }
    });

};

export const Signin = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            error: "email & password required"
        });
    }

    const user = await prisma.user.findFirst({
        where: { email }
    });
    if (!user) {
        return res.status(401).json({
            error: "Invalid credentials"
        });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: "24h" }
    );

    res.json({
        token,
        user: {
            id: user.id,
            email: user.email
        }
    });

};