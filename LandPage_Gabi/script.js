// Configuração da meta de horas
const TARGET_HOURS = 250;
let registeredHours = 0;

// Elementos do Painel de Progresso
const hoursRegisteredEl = document.getElementById('hoursRegistered');
const hoursRemainingEl = document.getElementById('hoursRemaining');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

// Função para recalcular o painel de progresso
function updateProgress() {
    // Atualiza os textos dos cards
    hoursRegisteredEl.textContent = `${registeredHours}h`;
    
    const remaining = TARGET_HOURS - registeredHours;
    // Se ultrapassar a meta, o restante fica em 0
    hoursRemainingEl.textContent = `${remaining < 0 ? 0 : remaining}h`;

    // Calcula a porcentagem do progresso
    let percentage = (registeredHours / TARGET_HOURS) * 100;
    if (percentage > 100) percentage = 100; // Limita a barra visual em 100%

    // Atualiza a barra de progresso visualmente
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${Math.round(percentage)}% Concluído`;
}

// Evento de envio do formulário
document.getElementById('activityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('actName');
    const groupSelect = document.getElementById('actGroup');
    const hoursInput = document.getElementById('actHours');

    const nameError = document.getElementById('nameError');
    const groupError = document.getElementById('groupError');
    const hoursError = document.getElementById('hoursError');

    let isValid = true;

    // Validação do Nome
    if (nameInput.value.trim() === "") {
        nameError.textContent = "Por favor, insira o nome da atividade.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    // Validação do Grupo
    if (groupSelect.value === "") {
        groupError.textContent = "Por favor, selecione um grupo.";
        isValid = false;
    } else {
        groupError.textContent = "";
    }

    // Validação da Carga Horária
    if (hoursInput.value === "" || Number(hoursInput.value) <= 0) {
        hoursError.textContent = "A carga horária deve ser maior que 0.";
        isValid = false;
    } else {
        hoursError.textContent = "";
    }

    // Se for válido, adiciona à tabela e soma as horas
    if (isValid) {
        const hoursAdded = Number(hoursInput.value);
        
        // Soma as horas ao total
        registeredHours += hoursAdded;
        
        // Adiciona na tabela
        addActivityToTable(nameInput.value, groupSelect.value, hoursAdded);
        
        // Atualiza o painel
        updateProgress();

        // Reseta o formulário
        document.getElementById('activityForm').reset();
    }
});

function addActivityToTable(name, group, hours) {
    const tbody = document.querySelector('#activitiesTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${name}</td>
        <td>${group}</td>
        <td>${hours}h</td>
        <td><button class="btn-delete">Excluir</button></td>
    `;

    // Ação do botão de excluir
    row.querySelector('.btn-delete').addEventListener('click', function() {
        // Remove as horas correspondentes ao excluir
        registeredHours -= hours;
        if (registeredHours < 0) registeredHours = 0;
        
        // Atualiza o progresso e remove a linha física
        updateProgress();
        row.remove();
    });

    tbody.appendChild(row);
}

// Inicializa o painel com 0h
updateProgress();