const form = document.getElementById("form-tarefa");
const input = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");
const botoesFiltro = document.querySelectorAll("#filtros button");

// getItem devolve string, tem que dar parse
let tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
let filtroAtual = "todas";

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function filtrar(tarefa) {
  if (filtroAtual === "pendentes") return !tarefa.feita;
  if (filtroAtual === "concluidas") return tarefa.feita;
  return true;
}

function renderizar() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa, indice) => {
    if (!filtrar(tarefa)) return;

    const li = document.createElement("li");
    if (tarefa.feita) li.classList.add("concluida");

    const span = document.createElement("span");
    span.textContent = tarefa.texto;
    span.addEventListener("click", () => {
      tarefa.feita = !tarefa.feita;
      salvar();
      renderizar();
    });

    span.addEventListener("dblclick", () => {
      const inputEdicao = document.createElement("input");
      inputEdicao.type = "text";
      inputEdicao.value = tarefa.texto;
      inputEdicao.classList.add("input-edicao");

      function confirmarEdicao() {
        const novoTexto = inputEdicao.value.trim();
        if (novoTexto !== "") tarefa.texto = novoTexto;
        salvar();
        renderizar();
      }

      inputEdicao.addEventListener("blur", confirmarEdicao);
      inputEdicao.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") inputEdicao.blur();
      });

      li.replaceChild(inputEdicao, span);
      inputEdicao.focus();
    });

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "remover";
    botaoRemover.addEventListener("click", () => {
      tarefas.splice(indice, 1);
      salvar();
      renderizar();
    });

    li.appendChild(span);
    li.appendChild(botaoRemover);
    lista.appendChild(li);
  });
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const texto = input.value.trim();
  if (texto === "") return;

  tarefas.push({ texto, feita: false });
  input.value = "";
  salvar();
  renderizar();
});

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filtro;

    botoesFiltro.forEach((b) => b.classList.remove("filtro-ativo"));
    botao.classList.add("filtro-ativo");

    renderizar();
  });
});

renderizar();
