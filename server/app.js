import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors";
import database from "../server/config/db.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

const app = express();

database();

app.use(express.json());
app.use(morgan("dev"))
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
)
app.use(express.urlencoded({ extended: true }));

import userRoute from "./routes/userRoute.js"
import courseRoute from "./routes/courseRoute.js"
import paymentRoute from "./routes/paymentRoute.js"
import miscRoutes from "./routes/miscellaneousRoutes.js"

app.use("/api/v1/user", userRoute)
app.use("/api/v1/courses", courseRoute)
app.use("/api/v1/payments", paymentRoute)
app.use('/api/v1', miscRoutes);




app.all('*', (req,res) => {
    res.status(404).send('Page not found!!')
})

app.use(errorMiddleware)


export default app;
