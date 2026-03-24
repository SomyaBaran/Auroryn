import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";


export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            error: "No token provided"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string;
            email?: string;
        };
        //@ts-ignore
        req.userId = decoded.id;
        //@ts-ignore
        req.email = decoded.email;

        next();
    } catch (err) {
        return res.status(401).json({
            error: "Invalid token",
        });
    }
};