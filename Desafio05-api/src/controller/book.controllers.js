import bookService from "../service/book.services.js";

async function createBookController(req, res) {
    const newBook = req.body;

    try{
        const createdBook = await bookService.createBookService(newBook);
        res.status(201).json(createdBook);
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}

async function findAllBooksController(req, res) {
    try{
        const books = await bookService.findAllBooksService();
        res.status(200).json(books);
    }catch(err){
        res.status(404).json({ error: err.message });
    }
}

async function findBookByIdController(req, res) {
    const bookId = req.params.id;
    try {
        const book = await bookService.findBookByIdService(bookId);
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

async function updateBookController(req, res) {
    const updatedBook = req.body;
    const bookId = req.params.id;
    try {
        const response = await bookService.updateBookService(updatedBook, bookId);
        res.status(200).send({ mensagem: "Livro atualizado com sucesso!" });
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

async function deleteBookController(req, res) {
    const bookId = req.params.id;
    try {
        const response = await bookService.deleteBookService(bookId);
        res.status(200).send({ mensagem: "Livro deletado com sucesso!" });
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

export default { createBookController, findAllBooksController, findBookByIdController, updateBookController, deleteBookController };