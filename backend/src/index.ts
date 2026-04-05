import express from "express";
import { Signup } from "./controllers/authControllers";
import { Signin } from "./controllers/authControllers";
import cors from "cors"
import { middleware } from "./middlewares/middleware";
import { blogRouter } from "./routes/blogRoutes";

const app = express();
app.use(express.json());
app.use(cors())
app.use("/blog", blogRouter);

app.post("/auth/signup", Signup);
app.post("/auth/signin", Signin);

app.listen(3000, () => {
    console.log("Port is listening on 3000");
});


app.get("/check", middleware, (req, res) => {
    //@ts-ignore
    const userId = req.userId!;
    //@ts-ignore
    const email = req.email!;

    return res.json({
        message: "Welcome to dashboard",
        userId,
        email
    });
});
