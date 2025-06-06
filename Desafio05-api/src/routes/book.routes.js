import { Router } from "express";
import bookControllers from "../controller/book.controllers.js";

const router = Router();

router.post("/livros", bookControllers.createBookController);
router.get("/livros", bookControllers.findAllBooksController);
router.get("/livros/:id", bookControllers.findBookByIdController);
router.put("/livros/:id", bookControllers.updateBookController);
router.delete("/livros/:id", bookControllers.deleteBookController);

export default router;