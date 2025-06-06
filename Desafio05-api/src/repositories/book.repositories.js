import db from "../config/database.js";

db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    num_paginas TEXT NOT NULL,
    isbn TEXT,
    editora TEXT)`);

function createBookRepository(newBook) {
    return new Promise((resolve, reject) => {
      const { titulo, num_paginas, isbn, editora } = newBook;
    db.run(
      `INSERT INTO books (titulo, num_paginas, isbn, editora) VALUES (?, ?, ?, ?)`,
      [titulo, num_paginas, isbn, editora],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newBook });
        }
      }
    );
  });
}

function findAllBooksRepository() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM books`, [], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

function findBookByIdRepository(bookId) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM books WHERE id = ?`, [bookId], (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}

function updateBookRepository(updatedBook, bookId) {
    return new Promise((resolve, reject) => {
        const fields = ['titulo', 'num_paginas', 'isbn', 'editora'];
        let query = 'UPDATE books SET'
        const values = []
        fields.forEach((field) => {
            if (updatedBook[field] !== undefined) {
                query += ` ${field} = ?,`
                values.push(updatedBook[field])
            }
        })
        query = query.slice(0, -1)
        query += ' WHERE id = ?';
        values.push(bookId);
        db.run(query, values, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve({ id: this.lastID, ...updatedBook })
            }
        })
    })
}
function deleteBookRepository(bookId) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM books WHERE id = ?`, [bookId], function (err) {
            if (err) {
                reject(err)
            } else {
                resolve({ message: "Livro deletado com sucesso", id: bookId })
            }
        })
    })
}

export default {createBookRepository, findAllBooksRepository, findBookByIdRepository, updateBookRepository, deleteBookRepository};