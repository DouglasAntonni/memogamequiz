const plantsInfo = [
    {
        name: "Hortelã",
        info: "Planta refrescante que ajuda na digestão e alivia náuseas. Muito usada em chás e infusões.",
        image: "src/images/Garden/Hortelã.jpg",
        top: "20%",
        left: "30%"
    },
    {
        name: "Camomila",
        info: "Conhecida por suas propriedades calmantes e anti-inflamatórias. Auxilia no sono e relaxamento.",
        image: "src/images/Garden/Camomila.jpg",
        top: "40%",
        left: "60%"
    },
    {
        name: "Alecrim",
        info: "Estimula a memória e a concentração. Também possui propriedades anti-inflamatórias.",
        image: "src/images/Garden/Alecrim.jpg",
        top: "70%",
        left: "20%"
    },
    {
        name: "Boldo",
        info: "Muito eficaz para problemas digestivos e do fígado. Usado tradicionalmente após refeições.",
        image: "src/images/Garden/boldo.jpg",
        top: "30%",
        left: "80%"
    },
    {
        name: "Erva-Cidreira",
        info: "Possui efeito calmante e ajuda a reduzir a ansiedade. Também auxilia na digestão.",
        image: "src/images/Garden/Erva-Cidreira.jpg",
        top: "60%",
        left: "40%"
    },
    {
        name: "Gengibre",
        info: "Anti-inflamatório natural, ajuda na digestão e fortalece o sistema imunológico.",
        image: "src/images/Garden/Gengibre.jpg",
        top: "50%",
        left: "10%"
    },
    {
        name: "Lavanda",
        info: "Conhecida por seu aroma relaxante, ajuda a melhorar o sono e reduzir o estresse.",
        image: "src/images/Garden/Lavanda.jpg",
        top: "10%",
        left: "50%"
    },
    {
        name: "Calêndula",
        info: "Possui propriedades cicatrizantes e anti-inflamatórias. Muito usada em cosméticos.",
        image: "src/images/Garden/Calêndula.jpg",
        top: "80%",
        left: "70%"
    }
];

let foundPlants = 0;
let timeLeft = 120;
let timer;

function createGarden() {
    const garden = document.getElementById('garden');
    plantsInfo.forEach((plant, index) => {
        const plantElement = document.createElement('div');
        plantElement.className = 'plant';
        const img = document.createElement('img');
        img.src = plant.image;
        img.alt = `${plant.name} - planta medicinal`;
        plantElement.appendChild(img);
        plantElement.style.top = plant.top;
        plantElement.style.left = plant.left;
        plantElement.onclick = () => showPlantInfo(index);
        garden.appendChild(plantElement);
    });
    startTimer();
}

function showPlantInfo(index) {
    const plant = plantsInfo[index];
    document.getElementById('plantImage').src = plant.image;
    document.getElementById('plantName').textContent = plant.name;
    document.getElementById('plantInfo').textContent = plant.info;
    document.getElementById('infoModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    
    const plantElement = document.querySelectorAll('.plant')[index];
    if (!plantElement.classList.contains('found')) {
        foundPlants++;
        document.getElementById('score').textContent = foundPlants;
        plantElement.classList.add('found');
        
        if (foundPlants === plantsInfo.length) {
            endGame(true);
        }
    }
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function endGame(won) {
    clearInterval(timer);
    const message = won 
        ? `Parabéns! Você encontrou todas as plantas em ${120 - timeLeft} segundos!`
        : `Tempo esgotado! Você encontrou ${foundPlants} plantas.`;

    setTimeout(() => {
        alert(message);
        window.location.href = "quiz.html"; // Altere "quiz.html" para o caminho correto do seu quiz
    }, 500);
}


function resetGame() {
    foundPlants = 0;
    timeLeft = 120;
    document.getElementById('score').textContent = '0';
    document.getElementById('time').textContent = '120';
    document.querySelectorAll('.plant').forEach(plant => plant.classList.remove('found'));
    startTimer();
}

createGarden();