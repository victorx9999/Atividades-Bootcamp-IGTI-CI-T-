const eventoCheckbox = document.querySelector('#checkbox')
const eventoSelect = document.querySelector('#select')
const quantidadeItens = document.getElementById('quantidadeItens')

url = 'http://localhost:3000'


let arrayServidores = []
let cargosServidores = []

function fetchJson(url) {
    return fetch(url).then((r) => {
        return r.json();
    });
}

function employees() {
    Promise.all([
        fetchJson(url + "/employees"),
        fetchJson(url + "/roles"),
    ]).then(([employees, roles]) => {

        arrayServidores = employees
        cargosServidores = roles

        let table = renderTable(arrayServidores, cargosServidores);
        document.getElementById("app").innerHTML = table;

        quantidadeItens.innerHTML = arrayServidores.length
    });
}
employees();


function renderTable(employees, roles) {
    let rows = employees
        .map((employee) => {
            let role = cargosServidores.find((role) => role.id == employee.role_id)
            return `<tr><td>${employee.id}</td><td>${employee.name}</td><td>${role.name}</td><td>${employee.salary}</td></tr>`;
        })
    return `<table>${rows.join("")}</table>`;
}

function renderTableFilter(employees, roles) {
    let rows = employees
        .filter(employee => (roles.includes(employee.role_id)))
        .map((employee) => {
            let role = cargosServidores.find((role) => role.id == employee.role_id)
            return `<tr><td>${employee.id}</td><td>${employee.name}</td><td>${role.name}</td><td>${employee.salary}</td></tr>`;
        })

    quantidadeItens.innerHTML = rows.length
    return `<table>${rows.join("")}</table>`;
}

function roles() {
    fetch(url + "/roles")
        .then(res => res.json())
        .then(res => {
            for (let i of res) {
                const view =
                    `
            <input type="checkbox" id="${i.id}" name="${i.name}" value="${i.name}" checked>
            <label for="${i.id}"> ${i.name}</label><br>
            `
                checkbox.insertAdjacentHTML('beforeend', view)
            }
        })

}
roles()

eventoCheckbox.addEventListener('change', () => {
    let allCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
    let rolesCheckbox = [];
    allCheckboxes.forEach((checkbox) => {
        if (!rolesCheckbox.includes(checkbox.id))
            rolesCheckbox.push(parseInt(checkbox.id));
    });
    let table = renderTableFilter(arrayServidores, rolesCheckbox)
    document.getElementById("app").innerHTML = table;
})



eventoSelect.addEventListener('change', () => {
    if (eventoSelect.value == 'Name Asc') {
        arrayServidores.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            } else {
                return 1;
            }
        })

        let table = renderTable(arrayServidores, cargosServidores)
        document.getElementById("app").innerHTML = table;
    }
    else if (eventoSelect.value == 'Name Desc') {
        arrayServidores.sort(function (a, b) {
            if (a.name > b.name) {
                return -1;
            } else {
                return 1;
            }
        })

        let table = renderTable(arrayServidores, cargosServidores)
        document.getElementById("app").innerHTML = table;
    }
    else if (eventoSelect.value == 'Salary Asc') {
        arrayServidores.sort(function (a, b) {
            if (a.salary < b.salary) {
                return -1
            } else if (a.salary > b.salary) {
                return 1
            } else {
                return 0
            }
        })

        let table = renderTable(arrayServidores, cargosServidores)
        document.getElementById("app").innerHTML = table;

    }
    else if (eventoSelect.value == 'Salary Desc') {
        arrayServidores.sort(function (a, b) {
            if (a.salary > b.salary) {
                return -1
            } else if (a.salary < b.salary) {
                return 1
            } else {
                return 0
            }
        })

        let table = renderTable(arrayServidores, cargosServidores)
        document.getElementById("app").innerHTML = table;
    }
})

