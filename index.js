const taxas = {
  'Caixa': 1.0487,
  'Santander': 1.0567,
  'Bradesco': 1.0532,
  'Itaú': 1.0519,
  'Nubank': 1.0595,
  'Inter': 1.0602
};

if (document.getElementById('formFinanciamento')) {
  document.getElementById('formFinanciamento').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const valor = document.getElementById('valor').value;
    const banco = document.getElementById('banco').value;
    const parcelas = document.getElementById('parcelas').value;

    if (valor === '' || banco === '' || parcelas === '') {
      alert('Preencha todos os campos!');
      return;
    }

    const valorLimpo = valor.replace('R$', '').replace(/\./g, '').replace(',', '.');
    window.location.href = `simulation.html?valor=${valorLimpo}&banco=${banco}&parcelas=${parcelas}`;
  });
}

if (window.location.pathname.includes('simulation.html')) {
  const params = new URLSearchParams(window.location.search);
  const valor = parseFloat(params.get('valor'));
  const banco = params.get('banco');
  const parcelas = parseInt(params.get('parcelas'));

  if (valor && banco && parcelas) {
    const taxa = taxas[banco];
    const valorFinal = valor * Math.pow(taxa, parcelas);
    const valorParcela = valorFinal / parcelas;

    document.querySelector('.installment-value').textContent = formatarCampo(valorParcela);
    document.querySelector('.final-value').textContent = formatarCampo(valorFinal);
    document.querySelector('.financing-info').textContent = `* Financiamento em ${parcelas} meses.`;
  } else {
    alert('Dados inválidos! Retorne ao simulador.');
    window.location.href = 'index.html';
  }
}

function formatarCampo(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function voltarSimulador() {
  window.location.href = 'index.html';
}