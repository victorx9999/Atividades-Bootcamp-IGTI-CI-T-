// Variáveis globais para armazenar os dados carregados do backend.
let employees = [];
let roles = [];

/**
 * Função que inicializa a aplicação. Ela é async pois queremos usar
 * a sintaxe await para simplificar o código.
 */
async function init() {
  // Carrega os dados do backend e guarda nas duas variáveis.
  [employees, roles] = await Promise.all([
    fetchJson("http://localhost:3000/employees"),
    fetchJson("http://localhost:3000/roles"),
  ]);

  // Inicializa a interface.
  initUi();
}

// Chama init para inicializar a aplicação
init();

/**
 * Função auxiliar que carrega dados JSON da url dada e
 * os transforma em objeto. Retorna uma Promise.
 */
function fetchJson(url) {
  return fetch(url).then((r) => {
    if (r.ok) {
      return r.json();
    } else {
      throw new Error(r.statusText);
    }
  });
}

/**
 * Função que inicializa a interface.
 */
function initUi() {
  initRolesUi();
  updateEmployeesUi();
  document.addEventListener("change", updateEmployeesUi);
}

/**
 * Função que inicializa a interface na parte de filtros por role.
 */
function initRolesUi() {
  // Obtém referência para fieldset da roles
  const rolesEl = document.getElementById("roles");

  for (const role of roles) {
    // Cria um label e input checkbox para cada role
    const labelEl = document.createElement("label");
    const checkEl = document.createElement("input");
    checkEl.type = "checkbox";
    checkEl.value = role.id;
    checkEl.name = "roles";
    labelEl.append(checkEl);
    labelEl.append(role.name);
    rolesEl.append(labelEl);
  }
}

/**
 * Função que atualiza a exibição da tabela de employees levando em conta
 * os filtros e ordenação.
 */
function updateEmployeesUi() {
  // Filtra os employees.
  let filteredEmployees = getFilteredEmployees();

  // Ordena os employees.
  sortEmployees(filteredEmployees);

  // Exibe a quantidade de employees.
  const counter = document.getElementById("count");
  counter.textContent = "(" + filteredEmployees.length + ")";

  // Apaga o conteúdo da tabela.
  const tbody = document.getElementById("data");
  tbody.innerHTML = "";

  for (employee of filteredEmployees) {
    // Busca a role do employee
    const role = roles.find((role) => role.id == employee.role_id);

    // Gera o elemento tr com os dados do employee e adiciona no tbody
    const tr = document.createElement("tr");
    tr.append(
      createTd(employee.id),
      createTd(employee.name),
      createTd(role.name),
      createTd(employee.salary)
    );
    tbody.append(tr);
  }
}

/**
 * Função que filtra os employees de acordo com a roles selecionadas.
 * Retorna um novo array.
 */
function getFilteredEmployees() {
  // Obtém os checkboxes marcados
  let inputs = document.querySelectorAll("input[name='roles']:checked");

  // Monta um array com os ids das roles selecionadas
  const checkedRoles = [];
  for (const input of inputs) {
    checkedRoles.push(+input.value);
  }

  if (checkedRoles.length) {
    // Filtra os dados. Se o id da role está no array checkedRoles o employee
    // deve ser incluído.
    return employees.filter((e) => checkedRoles.indexOf(e.role_id) != -1);
  } else {
    // Como não há role selecionada, exibe tudo
    return employees;
  }
}

/**
 * Ordena o array de employees recebido de acordo com o critério
 * de ordenação selecionado.
 */
function sortEmployees(array) {
  // Obtém o critério de ordenação.
  const sortBy = document.getElementById("sortby").value;

  // Ordena de acordo com o critério.
  array.sort((a, b) => {
    switch (sortBy) {
      case "nameAsc":
        return compare(a.name, b.name);
      case "nameDesc":
        return -compare(a.name, b.name);
      case "salaryAsc":
        return compare(a.salary, b.salary);
      case "salaryDesc":
        return -compare(a.salary, b.salary);
    }
  });
}

/**
 * Função auxiliar que, dados parâmetros a e b, retorna 1
 * se a maior que b, -1 se a menor que b ou 0 se ambos são iguais.
 */
function compare(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}

/**
 * Função auxiliar que gera um elemento td com o texto dado.
 */
function createTd(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}
