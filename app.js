import { createServer } from "http";
import fs from "fs/promises";
import path from "path";
import url from "url";

const PORT = 5000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  let filePath = "";

  try {
    if (req.method === "GET" && req.url === "/") {
      filePath = path.join(__dirname, "public", "index.html");
    } else if (req.method === "GET" && req.url === "/about") {
      filePath = path.join(__dirname, "public", "about.html");
    } else if (req.method === "GET" && req.url === "/contact-me") {
      filePath = path.join(__dirname, "public", "contact-me.html");
    } else {
      throw new Error("HTTP method not supported");
    }

    const data = await fs.readFile(filePath);
    res.end(data);
  } catch (error) {
    console.log(error);
    const data = await fs.readFile("./public/404.html");
    res.statusCode = 404;
    res.end(data);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
