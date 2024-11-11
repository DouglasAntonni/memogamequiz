const quizQuestions = [
    {
        image: "src/images/quiz/img1.jpeg",
        question: "Qual nome dessa erva medicinal?",
        answers: ["Própolis verde", "Erva Cidreira"],
        correctAnswerIndex: 0 // "Não" é a resposta correta
    },
    {
        image: "src/images/quiz/img2.jpeg",
        question: "Essa erva foi plantada na horta de uma escola escola. Ela é uma planta com aroma...?",
        answers: ["Semelhante a de uma cebola", "Semelhante a de um limão"],
        correctAnswerIndex: 1 // "Sim" é a resposta correta
    },
    {
        image: "src/images/quiz/img3.jpeg",
        question: "Pessoas que consomem alhos em doses adequadas diariamente são muito menos possíveis de serem vitimas de:",
        answers: ["pegarem resfriado", "sentirem uma dor de cabeça"],
        correctAnswerIndex: 0 // "Sim" é a resposta correta
    },
    {
        image: "src/images/quiz/img4.jpeg",
        question: "A Hortelã é uma planta medicinal e aromática, possuem propriedades que ajudam a...",
        answers: ["Cuidade dos cabelos", "Tratar problemas digestivos, enjoo ou vômitos"],
        correctAnswerIndex: 1 // "Sim" é a resposta correta
    },
    {
        image: "src/images/quiz/img5.jpeg",
        question: "Medicamentos fitoterápicos e plantas medicinais são a mesma coisa.",
        answers: ["Verdadeiro", "Falso"],
        correctAnswerIndex: 0 // "Sim" é a resposta correta
    },
    {
        image: "src/images/quiz/img6.jpeg",
        question: "Qual é o nome dessa planta?",
        answers: ["Coentro", "Espada de São Jorge", "Costela de Adão"],
        correctAnswerIndex: 1 // "Sim" é a resposta correta
    },
    {
        image: "src/images/quiz/img7.jpeg",
        question: "Chás tem prazo de validade.",
        answers: ["verdadeiro", "falso"],
        correctAnswerIndex: 0 // "Sim" é a resposta correta
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
    initQuiz();
});

function initQuiz() {
    loadQuestion();
}

function loadQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    const questionData = quizQuestions[currentQuestionIndex];

    quizContainer.innerHTML = `
        <h2>Plantas Medicinais</h2>
        <img src="${questionData.image}" alt="Imagem da pergunta" class="quiz-image">
        <p>${questionData.question}</p>
        ${questionData.answers.map((answer, index) => 
            `<button class="btn" onclick="checkAnswer(${index})">${answer}</button>`
        ).join('')}
        <p id="feedback"></p>
    `;
}

function checkAnswer(userAnswerIndex) {
    const questionData = quizQuestions[currentQuestionIndex];
    const feedbackElement = document.getElementById("feedback");

    // Desabilita os botões após a resposta
    const buttons = document.querySelectorAll("#quiz-container .btn");
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === questionData.correctAnswerIndex) {
            button.classList.add('correct'); // Aplica a classe de "correto" à resposta certa
        } else if (index === userAnswerIndex) {
            button.classList.add('incorrect'); // Aplica a classe de "incorreto" à resposta errada
        }
    });

    if (userAnswerIndex === questionData.correctAnswerIndex) {
        score++;
        feedbackElement.textContent = "Você acertou!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = "Você errou!";
        feedbackElement.style.color = "red";
    }

    // Deixa o feedback visível por um tempo antes de continuar
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1500); // Espera 2 segundos para mostrar o feedback antes de continuar
}



function endQuiz() {
    const quizContainer = document.getElementById("quiz-container");

    if (score > quizQuestions.length / 2) {
        quizContainer.innerHTML = `
            <h2>Quiz Completo!</h2>
            <p>Você acertou ${score} de ${quizQuestions.length} perguntas.</p>
            <p>Parabéns! Você concluiu todas as fases do jogo!</p>
        `;
            window.location.href = "obrigado.html";
    } else {
        quizContainer.innerHTML = `
            <h2>Quiz Completo!</h2>
            <p>Você acertou ${score} de ${quizQuestions.length} perguntas.</p>
            <p>Tente outra vez!</p>
            <button class="resetQuiz"  onclick="restartQuiz()">Reiniciar Quiz</button>
        `;
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    initQuiz();
}
