const QUESTIONS = [
  {
    q: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    q: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    answer: 2
  },
  {
    q: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
    answer: 1
  },
  {
    q: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Styling Syntax",
      "Colorful Style Sheets"
    ],
    answer: 0
  },
  {
    q: "Which gas do plants primarily absorb for photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: 2
  },
  {
  q: "Which programming language is primarily used for web page styling?",
  options: ["Java", "Python", "CSS", "C++"],
  answer: 2
},
{
  q: "What does HTML stand for?",
  options: [
    "Hyper Text Markup Language",
    "High Text Machine Language",
    "Hyperlink Text Management Language",
    "Home Tool Markup Language"
  ],
  answer: 0
},
{
  q: "Which data structure follows the Last In, First Out (LIFO) principle?",
  options: ["Queue", "Array", "Stack", "Linked List"],
  answer: 2
},
{
  q: "Which company developed the Java programming language?",
  options: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
  answer: 1
},
{
  q: "Which protocol is commonly used to securely transfer web pages over the Internet?",
  options: ["HTTP", "FTP", "HTTPS", "SMTP"],
  answer: 2
}

];

let current = 0;
let score = 0;
let answered = false;

const card = document.getElementById("card");
const tally = document.getElementById("tally");
const trackFill = document.getElementById("trackFill");

function renderQuestion() {
  answered = false;

  const item = QUESTIONS[current];

  tally.textContent = `Q${current + 1} / ${QUESTIONS.length}`;
  trackFill.style.width = `${(current / QUESTIONS.length) * 100}%`;

  card.innerHTML = `
    <div class="eyebrow">Question ${current + 1}</div>
    <h2 class="question">${item.q}</h2>
    <div class="options" id="options"></div>
    <button class="next-btn" id="nextBtn">
      ${current === QUESTIONS.length - 1 ? "See score" : "Next question"}
    </button>
  `;

  const optionsWrap = document.getElementById("options");

  item.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = option;

    btn.addEventListener("click", () => {
      selectAnswer(i);
    });

    optionsWrap.appendChild(btn);
  });

  document
    .getElementById("nextBtn")
    .addEventListener("click", nextQuestion);
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const item = QUESTIONS[current];
  const buttons = document.querySelectorAll(".option");

  buttons.forEach((btn, i) => {
    btn.disabled = true;

    if (i === item.answer) {
      btn.classList.add("correct");
    }

    if (i === selectedIndex && selectedIndex !== item.answer) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === item.answer) {
    score++;
  }

  document.getElementById("nextBtn").classList.add("show");
}

function nextQuestion() {
  current++;

  if (current < QUESTIONS.length) {
    renderQuestion();
  } else {
    renderResult();
  }
}

function renderResult() {
  trackFill.style.width = "100%";
  tally.textContent = "Complete";

  const percentage = Math.round((score / QUESTIONS.length) * 100);

  let verdict;

  if (percentage === 100) {
    verdict = "Perfect score. Flawless.";
  } else if (percentage >= 60) {
    verdict = "Solid round. Well played.";
  } else {
    verdict = "Tough round — give it another go.";
  }

  card.innerHTML = `
    <div class="result">
      <div class="eyebrow">Final score</div>
      <div class="score-big">${score}/${QUESTIONS.length}</div>
      <div class="score-label">${percentage}% correct</div>
      <div class="verdict">${verdict}</div>
      <button class="restart-btn" id="restartBtn">Play again</button>
    </div>
  `;

  document.getElementById("restartBtn").addEventListener("click", () => {
    current = 0;
    score = 0;
    renderQuestion();
  });
}

renderQuestion();