import "dotenv/config";
import express from "express";
import { Signup } from "./controllers/authControllers";
import { Signin } from "./controllers/authControllers";
import cors from "cors";
import { middleware } from "./middlewares/middleware";
import { blogRouter } from "./routes/blogRoutes";
import { prisma } from "../lib/prisma";

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://auroryn.vercel.app", "https://auroryn-eqt5.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/blog", blogRouter);

app.post("/auth/signup", Signup);
app.post("/auth/signin", Signin);

app.get("/check", middleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            email: true,
            firstName: true,
            lastName: true,
        }
    });

    if (!user) {
        return res.status(404).json({
            error: "user not found"
        });
    }

    return res.json({
        msg: "Welcome to dashboard",
        user
    });
});

app.listen(3000, () => {
    console.log("Port is listening on 3000");
});