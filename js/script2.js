const questions = [
    {
        question: "Which brand is known for its GLK model?",
        answers: {
            A: "Mercedes-Benz",
            B: "BMW",
            C: "AUDI",
            D: "Ford"
        },
        correct: 'A'
    },
    {
        question: "Who is the manufacturer of the Model S?",
        answers: {
            A: "BMW",
            B: "Tesla",
            C: "Mercedes",
            D: "Ford"
        },
        correct: 'B'
    },
    {
        question: "Which car is the fastest?",
        answers: {
            A: "Bugatti Chiron",
            B: "Mercedes C63",
            C: "Ferrari F12",
            D: "Porsche 911"
        },
        correct: 'A'
    },
    {
        question: "What type is the CDI engine?",
        answers: {
            A: "Gasoline",
            B: "Diesel",
            C: "Electricity",
            D: "Hydrogen"
        },
        correct: 'B' 
    },
    {
        question: "Which manufacturer is known for its SUVs like the Touareg?",
        answers: {
            A: "Volkswagen",
            B: "Audi",
            C: "BMW",
            D: "Toyota"
        },
        correct: 'A'
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');

    questionElement.innerText = questions[currentQuestionIndex].question;
    answersElement.innerHTML = '';

    for (const key in questions[currentQuestionIndex].answers) {
        const button = document.createElement('div');
        button.classList.add('answer');
        button.innerText = `${key}: ${questions[currentQuestionIndex].answers[key]}`;
        button.addEventListener('click', () => selectAnswer(key));
        answersElement.appendChild(button);
    }

    document.getElementById('questionCounter').innerText = `Question ${currentQuestionIndex + 1} sur ${questions.length}`;
}

function selectAnswer(answer) {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(btn => {
        btn.classList.remove('correct', 'wrong');
    });

    // Mark the clicked button and the correct answer
    userAnswers[currentQuestionIndex] = answer; // Store the user's answer

    answers.forEach(btn => {
        const btnLetter = btn.innerText.charAt(0); // Get the answer letter (A, B, C, D)

        if (btnLetter === answer) {
            if (answer === questions[currentQuestionIndex].correct) {
                btn.classList.add('correct'); // Correct answer
            } else {
                btn.classList.add('wrong'); // Wrong answer

                // Show the correct button
                answers.forEach(correctBtn => {
                    if (correctBtn.innerText.charAt(0) === questions[currentQuestionIndex].correct) {
                        correctBtn.classList.add('correct'); // Show correct answer
                    }
                });
            }
        }
    });

    document.getElementById('validateBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'inline-block';
}

document.getElementById('validateBtn').addEventListener('click', () => {
    const selectedAnswers = document.querySelectorAll('.answer');
    selectedAnswers.forEach(btn => {
        btn.setAttribute('disabled', true);
    });
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById('validateBtn').style.display = 'inline-block';
        document.getElementById('nextBtn').style.display = 'none';
    } else {
        // Quiz finished
        displayResults();
    }
});

function displayResults() {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = "<h2 class='white-text'> Quiz Results :</h2>";

    let correctCount = 0;

    questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === q.correct;

        const questionText = `<strong class='white-text'>${q.question}</strong><br>`;
        let answerText = "";

        for (const key in q.answers) {
            if (key === userAnswer) {
                answerText += `<span class="${isCorrect ? 'correct' : 'wrong'} white-text">${key}: ${q.answers[key]} (${isCorrect ? 'Correct' : 'Faux'})</span><br>`;
            } else {
                answerText += `<span class='white-text'>${key}: ${q.answers[key]} ${key === q.correct ? `(<span class="correct white-text">Correct</span>)` : ''}</span><br>`;
            }
        }

        resultsElement.innerHTML += questionText + answerText + "<br>";
        if (isCorrect) correctCount++;
    });

    // Display score
    const scoreMessage = `Your score is : ${correctCount} / ${questions.length}😊`;
    resultsElement.innerHTML += `${scoreMessage}`; // Add score to the page
    alert(scoreMessage); // Show in alert

    // Congratulations message
    if (correctCount === questions.length) {
        resultsElement.innerHTML += "<p class='white-text'>Congratulations,💥 you are champion 🥳 !</p>";
    } else if (correctCount >= 3) {
        resultsElement.innerHTML += "<p class='white-text'>Congratulations, you have more than 3 correct answers😜!</p>";
    } else if (correctCount === 0) {
        resultsElement.innerHTML += "<p class='white-text'>Too bad you didn't get any good answers😔.</p>";
    } else {
        resultsElement.innerHTML += "<p class='white-text'>You have some good answers, keep improving 😜!</p>";
    }

    resultsElement.innerHTML += `<button id="restartBtn"> Restart Quiz 🎮 </button>`;
    resultsElement.style.display = 'block';

    // Hide quiz section
    document.getElementById('question').style.display = 'none';
    document.getElementById('answers').style.display = 'none';
    document.getElementById('validateBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';

    // Restart quiz event handling
    document.getElementById('restartBtn').addEventListener('click', restartQuiz);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];

    document.getElementById('results').style.display = 'none';
    document.getElementById('question').style.display = 'block';
    document.getElementById('answers').style.display = 'block';
    loadQuestion(); // Reload the first question

    document.getElementById('validateBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').style.display = 'none';
}

// Load the first question
loadQuestion();
