let participants = [];

function addParticipant() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (name && email && !participants.some(p => p.email === email)) {
        participants.push({ name, email });
        updateParticipantsList();
        nameInput.value = '';
        emailInput.value = '';
    } else {
        alert("Nome ou email inválido ou já adicionado!");
    }
}

function updateParticipantsList() {
    const participantsList = document.getElementById('participantsList');
    participantsList.innerHTML = '';

    participants.forEach(participant => {
        const listItem = document.createElement('li');
        listItem.textContent = `${participant.name} - ${participant.email}`;
        participantsList.appendChild(listItem);
    });
}

function drawSecretSanta() {
    if (participants.length < 2) {
        alert("É necessário pelo menos dois participantes para realizar o sorteio!");
        return;
    }

    // Embaralha os participantes e faz os pares de amigo secreto
    let shuffled = participants.slice().sort(() => Math.random() - 0.5);
    let pairs = shuffled.map((participant, index) => {
        const nextIndex = (index + 1) % shuffled.length;
        return { giver: participant, receiver: shuffled[nextIndex] };
    });

    // Exibe links de email para cada participante
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "<h2>Envie o email para cada participante:</h2>";

    pairs.forEach(pair => {
        const subject = `Seu Amigo Secreto`;
        const body = `Olá, ${pair.giver.name}! O seu amigo secreto é ${pair.receiver.name}. Boa sorte no Amigo Secreto!`;
        const mailtoLink = `mailto:${pair.giver.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        const link = document.createElement('a');
        link.href = mailtoLink;
        link.textContent = `Enviar email para ${pair.giver.name}`;
        resultsDiv.appendChild(link);

        const lineBreak = document.createElement('br');
        resultsDiv.appendChild(lineBreak);
    });
}
