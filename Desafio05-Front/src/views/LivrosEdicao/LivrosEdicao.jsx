import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { useParams } from "react-router-dom";
import { LivrosService } from "../../api/LivrosService";

const LivrosEdicao = () => {
  let { livroId } = useParams();

  const [livro, setLivro] = useState({});

  async function getLivro() {
    try {
      const { data } = await LivrosService.getLivro(livroId);
      console.log("Dados do livro:", data);
      setLivro(data);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
      alert("Erro ao buscar livro");
    }
  }

  async function editLivro() {
    const body = {
      id: Number(livro.id),
      titulo: livro.titulo,
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora,
    };

    if (
      livro.id != undefined &&
      livro.id != "" &&
      livro.titulo != undefined &&
      livro.titulo != "" &&
      livro.num_paginas != undefined &&
      livro.num_paginas != "" &&
      livro.isbn != undefined &&
      livro.isbn != "" &&
      livro.editora != undefined &&
      livro.editora != ""
    ) {
      try {
        const { data } = await LivrosService.updateLivro(
          Number(livro.id),
          body
        );
        console.log("Resposta do update:", data);
        alert(data?.mensagem || "Livro atualizado com sucesso!");
      } catch (error) {
        const { response } = error;
        console.error("Erro na atualização:", response);
        alert(
          `${response?.status || ""} - ${response?.data || "Erro desconhecido"}`
        );
      }
    } else {
      alert("Por favor, preencha todos os campos corretamente!");
    }
  }

  useEffect(() => {
    getLivro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                required
                onChange={(event) =>
                  setLivro({ ...livro, titulo: event.target.value })
                }
                value={livro.titulo || ""}
              />
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="number"
                required
                onChange={(event) =>
                  setLivro({ ...livro, num_paginas: event.target.value })
                }
                value={livro.num_paginas || ""}
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                onChange={(event) =>
                  setLivro({ ...livro, isbn: event.target.value })
                }
                value={livro.isbn || ""}
              />
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                onChange={(event) =>
                  setLivro({ ...livro, editora: event.target.value })
                }
                value={livro.editora || ""}
              />
            </div>
            <div className="form-group">
              <button type="button" onClick={editLivro}>
                ATUALIZAR LIVRO
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
