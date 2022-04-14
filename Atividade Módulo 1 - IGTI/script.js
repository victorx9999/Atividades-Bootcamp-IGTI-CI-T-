const valor = document.getElementById("valor")
const prazoAnos = document.getElementById("prazoAnos")
const jurosAno = document.getElementById("jurosAno")
const btn = document.querySelector('button')
const prazoMeses = document.getElementById("prazoMeses")
const jurosMes = document.getElementById("jurosMes")
const jurosA = document.getElementById("jurosA")
const list = document.querySelector('.table')


btn.addEventListener('click', function () {
  let valores = valor.value
  let prazo = prazoAnos.value
  let juros = jurosAno.value
  let juros_mes = (Math.pow(1 + parseFloat(juros), (1 / 12)) - 1)
  let totalMeses = parseInt(prazo) * 12

  prazoMeses.value = totalMeses
  jurosMes.value = juros_mes

  let amortizacao = parseFloat(valores / totalMeses)
  let juros_final
  let juros_acumulado = 0

  for (let i = 0; i < totalMeses; i++) {

    juros_final = valores * juros_mes
    juros_acumulado += juros_final

    const view = `
      <tr>
        <td> ${i + 1} </td>
         <td> ${amortizacao.toFixed(2)} </td>
         <td> ${juros_final.toFixed(2)} </td>
         <td> ${(amortizacao + juros_final).toFixed(2)}</td>
      </tr>
    `
    list.insertAdjacentHTML('beforeend', view)
    valores = valores - amortizacao
  }

  jurosA.value = juros_acumulado.toFixed(2)
})
