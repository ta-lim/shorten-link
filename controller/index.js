import express from "express";
import connectDB from "../config/db.js";
import index from "./routes/index.js";
import url from "./routes/url.js";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//connect to database
connectDB();

app.use(express.json({ extend: false }));
app.use(express.static(path.join(__dirname, "../view")));

//define Route

app.use("/", index);
app.use("/api/url", url);

app.get("/", async (req, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => {
  console.log(`server at port: ${port}`);
});

// export default main
