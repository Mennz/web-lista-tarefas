const form = document.getElementById("form-tarefa");
const input = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");

let tarefas = [];

function renderizar() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa, indice) => {
    const li = document.createElement("li");
    if (tarefa.feita) li.classList.add("concluida");

    const span = document.createElement("span");
    span.textContent = tarefa.texto;
    span.addEventListener("click", () => {
      tarefa.feita = !tarefa.feita;
      renderizar();
    });

    li.appendChild(span);
    lista.appendChild(li);
  });
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const texto = input.value.trim();
  if (texto === "") return;

  tarefas.push({ texto, feita: false });
  input.value = "";
  renderizar();
});
