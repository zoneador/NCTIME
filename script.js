function adicionarLinha() {
  const tabela = document.getElementById("inputTable").getElementsByTagName("tbody")[0];
  const novaLinha = tabela.insertRow();

  const cellLocal = novaLinha.insertCell(0);
  const cellHoras = novaLinha.insertCell(1);
  const cellMinutos = novaLinha.insertCell(2);

  cellLocal.innerHTML = '<input type="text" placeholder="Nome do local">';
  cellHoras.innerHTML = '<input type="number" value="0">';
  cellMinutos.innerHTML = '<input type="number" value="0">';
}

function processarTabela() {
  const currentDate = document.getElementById('currentDate').value;
  const currentTime = document.getElementById('currentTime').value;
  const tabela = document.getElementById("inputTable").getElementsByTagName("tbody")[0];

  const [day, month, year] = currentDate.split('/').map(Number);
  const [hours, minutes] = currentTime.split(':').map(Number);
  const baseDate = new Date(year, month - 1, day, hours, minutes);

  const lousa = document.getElementById('lousa');
  lousa.innerHTML = '<strong>Lousa de Horários:</strong>';

  for (let i = 0; i < tabela.rows.length; i++) {
    const local = tabela.rows[i].cells[0].querySelector('input').value.trim();
    const addHours = parseInt(tabela.rows[i].cells[1].querySelector('input').value) || 0;
    const addMinutes = parseInt(tabela.rows[i].cells[2].querySelector('input').value) || 0;

    if (!local) continue;

    const novaData = new Date(baseDate.getTime());
    novaData.setHours(novaData.getHours() + addHours);
    novaData.setMinutes(novaData.getMinutes() + addMinutes);

    const newDay = String(novaData.getDate()).padStart(2, '0');
    const newMonth = String(novaData.getMonth() + 1).padStart(2, '0');
    const newYear = novaData.getFullYear();
    const newHours = String(novaData.getHours()).padStart(2, '0');
    const newMinutes = String(novaData.getMinutes()).padStart(2, '0');

    const resultado = `Local: ${local} - Próximo horário: ${newDay}/${newMonth}/${newYear} às ${newHours}:${newMinutes}`;

    const novaEntrada = document.createElement('div');
    novaEntrada.className = 'entry';
    novaEntrada.innerText = resultado;
    lousa.appendChild(novaEntrada);
  }
}
