import { useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { LivrosService } from "../../api/LivrosService";

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({});

  async function createLivro(event) {
    event.preventDefault(); // Impede recarregar a página

    const body = {
      id: Number(livro.id),
      titulo: livro.titulo,
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora,
    };

    if (livro.titulo && livro.num_paginas && livro.isbn && livro.editora) {
      try {
        const response = await LivrosService.createLivro(body);
        alert(response.data.mensagem || "Livro cadastrado com sucesso!");
        document.getElementById("formulario").reset();
        setLivro({});
      } catch (error) {
        const {
          response: { data, status },
        } = error;
        alert(`${status} - ${data.mensagem || data}`);
      }
    } else {
      alert("Preencha todos os campos.");
    }
  }

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario" onSubmit={createLivro}>
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                required
                onChange={(e) => setLivro({ ...livro, titulo: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                onChange={(e) =>
                  setLivro({ ...livro, num_paginas: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                onChange={(e) => setLivro({ ...livro, isbn: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                onChange={(e) =>
                  setLivro({ ...livro, editora: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <button type="submit">Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosCadastro;
