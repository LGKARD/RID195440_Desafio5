import bookRepository from "../repositories/book.repositories.js";

async function createBookService(newBook) {
    const book = await bookRepository.createBookRepository(newBook);

    return book;
}
async function findAllBooksService() {
    const books = await bookRepository.findAllBooksRepository();
    return books;
} 

async function findBookByIdService(bookId) {
    const book = await bookRepository.findBookByIdRepository(bookId);
    if (!book) throw new Error("Livro não encontrado");
    return book;
}

async function updateBookService(updatedBook, bookId) {
    const book = await bookRepository.findBookByIdRepository(bookId);
    if (!book) throw new Error("Livro não encontrado");
    const response = await bookRepository.updateBookRepository(updatedBook, bookId);
    return response
}

async function deleteBookService(bookId) {
    const book = await bookRepository.findBookByIdRepository(bookId);
    if (!book) throw new Error("Livro não encontrado");
    const response = await bookRepository.deleteBookRepository(bookId);
    return response
}

export default { createBookService, findAllBooksService, findBookByIdService, updateBookService, deleteBookService };