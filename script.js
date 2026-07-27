 let selectedMode = "car";

    const factors = {
      car: 0.21,
      bus: 0.05,
      bike: 0,
      plane: 0.255
    };

    const energyFactor = 0.05;

    const transportButtons = document.querySelectorAll(".transport-btn");

    transportButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        transportButtons.forEach(function(btn) {
          btn.classList.remove("active");
        });

        button.classList.add("active");
        selectedMode = button.dataset.mode;
      });
    });

    function calculateEmission() {
      const km = Number(document.getElementById("km").value) || 0;
      const kwh = Number(document.getElementById("kwh").value) || 0;

      const travelEmission = km * factors[selectedMode];
      const energyEmission = kwh * energyFactor;
      const total = travelEmission + energyEmission;

      const resultBox = document.getElementById("resultBox");
      const resultValue = document.getElementById("resultValue");
      const resultFeedback = document.getElementById("resultFeedback");

      resultValue.textContent = total.toFixed(2);

      if (total < 10) {
        resultFeedback.textContent = "Excelente! Sua pegada de carbono está baixa. 🌿";
      } else if (total < 50) {
        resultFeedback.textContent = "Bom resultado! Ainda é possível reduzir com pequenas mudanças. ♻️";
      } else if (total < 100) {
        resultFeedback.textContent = "Sua emissão está moderada. Tente usar mais transporte público ou economizar energia. 🚲";
      } else {
        resultFeedback.textContent = "Sua emissão está alta. Repensar transporte e consumo de energia pode ajudar muito. 🌍";
      }

      resultBox.style.display = "block";
    }

    function resetCalculator() {
      document.getElementById("km").value = "";
      document.getElementById("kwh").value = "";
      document.getElementById("resultBox").style.display = "none";

      selectedMode = "car";

      transportButtons.forEach(function(btn) {
        btn.classList.remove("active");
      });

      document.querySelector('[data-mode="car"]').classList.add("active");
    }

    const questions = [
      {
        question: "Qual dos materiais abaixo é biodegradável?",
        options: ["Plástico comum", "Papel", "Vidro temperado", "Alumínio"],
        correct: 1
      },
      {
        question: "Qual fonte de energia é considerada renovável?",
        options: ["Carvão mineral", "Petróleo", "Energia solar", "Gás natural"],
        correct: 2
      },
      {
        question: "O que é pegada de carbono?",
        options: [
          "A marca deixada por sapatos",
          "A quantidade de CO₂ liberada por uma pessoa ou atividade",
          "A quantidade de lixo reciclável",
          "A área de uma floresta"
        ],
        correct: 1
      },
      {
        question: "Qual atitude ajuda a economizar água?",
        options: [
          "Deixar a torneira aberta",
          "Tomar banhos muito longos",
          "Reutilizar água da chuva",
          "Lavar calçada com mangueira"
        ],
        correct: 2
      },
      {
        question: "Qual gás é um dos principais responsáveis pelo efeito estufa?",
        options: ["Oxigênio", "Hidrogênio", "Dióxido de carbono", "Nitrogênio"],
        correct: 2
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    const questionCounter = document.getElementById("questionCounter");
    const scoreText = document.getElementById("scoreText");
    const progressBar = document.getElementById("progressBar");
    const questionText = document.getElementById("questionText");
    const optionsBox = document.getElementById("optionsBox");
    const feedbackText = document.getElementById("feedbackText");
    const nextBtn = document.getElementById("nextBtn");
    const quizCard = document.getElementById("quizCard");

    function loadQuestion() {
      answered = false;

      const q = questions[currentQuestion];

      questionCounter.textContent = "Pergunta " + (currentQuestion + 1) + " de " + questions.length;
      scoreText.textContent = "Acertos: " + score;
      progressBar.style.width = ((currentQuestion + 1) / questions.length) * 100 + "%";
      questionText.textContent = q.question;
      optionsBox.innerHTML = "";
      feedbackText.textContent = "";
      nextBtn.style.display = "none";

      q.options.forEach(function(option, index) {
        const button = document.createElement("button");
        button.textContent = option;

        button.addEventListener("click", function() {
          checkAnswer(button, index);
        });

        optionsBox.appendChild(button);
      });
    }

    function checkAnswer(button, index) {
      if (answered) {
        return;
      }

      answered = true;

      const q = questions[currentQuestion];
      const allButtons = optionsBox.querySelectorAll("button");

      if (index === q.correct) {
        button.classList.add("correct");
        feedbackText.textContent = "Resposta correta! ✅";
        score++;
      } else {
        button.classList.add("wrong");
        allButtons[q.correct].classList.add("correct");
        feedbackText.textContent = "Resposta incorreta. A resposta certa está marcada em verde.";
      }

      scoreText.textContent = "Acertos: " + score;

      if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Ver resultado";
      } else {
        nextBtn.textContent = "Próxima pergunta";
      }

      nextBtn.style.display = "block";
    }

    function nextQuestion() {
      currentQuestion++;

      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showFinalResult();
      }
    }

    function showFinalResult() {
      let message = "";

      if (score === questions.length) {
        message = "Perfeito! Você sabe muito sobre sustentabilidade. 🏆";
      } else if (score >= 3) {
        message = "Muito bom! Continue praticando atitudes sustentáveis. 🌱";
      } else {
        message = "Continue aprendendo. Cada pequena ação faz diferença. 📚";
      }

      quizCard.innerHTML = `
        <div class="final-result">
          <h3>Resultado final</h3>
          <p>Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.</p>
          <p>${message}</p>
          <button class="btn btn-primary" onclick="restartQuiz()">Refazer quiz</button>
        </div>
      `;
    }

    function restartQuiz() {
      currentQuestion = 0;
      score = 0;
      answered = false;

      quizCard.innerHTML = `
        <div class="quiz-top">
          <span id="questionCounter">Pergunta 1 de 5</span>
          <span id="scoreText">Acertos: 0</span>
        </div>

        <div class="progress">
          <div class="progress-bar" id="progressBar"></div>
        </div>

        <h3 class="question" id="questionText"></h3>

        <div class="options" id="optionsBox"></div>

        <p class="feedback" id="feedbackText"></p>

        <button class="btn btn-primary" id="nextBtn" onclick="nextQuestion()">Próxima pergunta</button>
      `;

      location.reload();
    }

    loadQuestion()
