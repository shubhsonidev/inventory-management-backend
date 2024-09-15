require("dotenv").config();

const express = require("express");
const { connectToDB } = require("./connection");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const basicAuth = require("express-basic-auth");
const app = express();

const port = process.env.PORT || 4200;

connectToDB().then(console.log("connected to DB"));

app.use(express.json({ limit: "200mb" }));
app.use(express.text({ limit: "200mb" }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use("/api/user", userRouter);

app.use("/api/product", productRouter);

app.use("/api/category", categoryRouter);

app.use(
  "/api-docs",
  basicAuth({
    users: { shubh: "shubh" },
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.listen(port, () => {
  console.log(`Server is started at PORT: ${port}`);
});
