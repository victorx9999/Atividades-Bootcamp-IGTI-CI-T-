const regiaoSelecionada = document.querySelector('#regioes');
const list = document.querySelector('.table')
const list2 = document.getElementById('tbody')
const quantidadeItens = document.getElementById('quantidadeItens')




regiaoSelecionada.addEventListener('change', () => {
    var allCheckboxes = document.querySelectorAll('input[type=checkbox]:checked');
    let subregiao = [];

    allCheckboxes.forEach((checkbox) => {
        subregiao.push(checkbox.value);
    });

    console.log(subregiao)


    regiaoSelect = regiaoSelecionada.value

    let url
    if (regiaoSelect == 'Todos') {
        url = 'https://restcountries.com/v3.1/all'
    } else {
        url = 'https://restcountries.com/v3.1/region/' + regiaoSelect
    }
    limparTabela()

    fetch(url)
        .then(res => res.json())
        .then(paises => {
            console.log(paises.filter(paises => paises.subregion == subregiao))
            // paises.filter(paises => paises.subregion == subregiao)
            for (let i of paises) {
                
                const view = `
            <tr>
              <td> ${i.name.common} </td>
               <td> ${i.capital} </td>
               <td> ${i.subregion} </td>
               <td> ${i.population}</td>
            </tr>
          `
                list.insertAdjacentHTML('beforeend', view)
            }
            quantidadeItens.innerHTML = paises.length
        
        })

})


function limparTabela() {
    let tb = document.getElementById('table');
    while (tb.rows.length > 1) {
        tb.deleteRow(1);
    }
}

