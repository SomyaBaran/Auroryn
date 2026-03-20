import express from "express";
import { Signup } from "./controllers/authControllers";
import { Signin } from "./controllers/authControllers";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

app.post("/auth/signup", Signup);
app.post("/auth/signin", Signin);

app.listen(3000, () => {
    console.log("Port is listening on 3000");
});

