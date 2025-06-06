import express from "express";
import cors from "cors";
import bookRouters from "./src/routes/book.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bookRouters);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
