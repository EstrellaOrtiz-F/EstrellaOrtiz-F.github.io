localStorage.clear();
document.querySelector("#quizBtn").addEventListener("click", gradeQuiz);

displayQ3Options();

function displayQ3Options() {
  let q3Options = ["Saw", "Friday the 13th", "Scream", "Nightmare on Elm Street"];
  q3Options = _.shuffle(q3Options);

  const container = document.querySelector("#q3Options");
  container.innerHTML = "";

  for (let i of q3Options) 
    {
    let inputElement = document.createElement("input");
    inputElement.type = "radio";
    inputElement.name = "q3";
    inputElement.value = i;

    let labelElement = document.createElement("label");
    labelElement.textContent = i;
    labelElement.prepend(inputElement);

    container.append(labelElement, document.createElement("br"));
  }
}

function gradeQuiz() {
  let score = 0;

  let userAnswer1 = document.querySelector("input[name=q1]:checked")?.value;
  let feedback1 = document.querySelector("#feedback1");
  if (userAnswer1 === "Twilight") 
    {
    feedback1.textContent = "Correct!";
    feedback1.style.color = "green";
    score += 20;
  } else 
    {
    feedback1.textContent = "Incorrect!";
    feedback1.style.color = "red";
  }

  let q2a = document.querySelector("#q2a").checked;
  let q2b = document.querySelector("#q2b").checked;
  let q2c = document.querySelector("#q2c").checked;
  let feedback2 = document.querySelector("#feedback2");
  if (!q2a && q2b && q2c) 
    {
    feedback2.textContent = "Correct!";
    feedback2.style.color = "green";
    score += 20;
  } else 
    {
    feedback2.textContent = "Incorrect!";
    feedback2.style.color = "red";
  }

  let userAnswer3 = document.querySelector("input[name=q3]:checked")?.value;
  let feedback3 = document.querySelector("#feedback3");
  if (userAnswer3 === "Friday the 13th") {
    feedback3.textContent = "Correct!";
    feedback3.style.color = "green";
    score += 20;
  } 
  else 
    {
    feedback3.textContent = "Incorrect!";
    feedback3.style.color = "red";
  }

  let userAnswer4 = document.querySelector("#q4").value;
  let feedback4 = document.querySelector("#feedback4");
  if (userAnswer4 === "4") {
    feedback4.textContent = "Correct!";
    feedback4.style.color = "green";
    score += 20;
  }
   else 
    {
    feedback4.textContent = "Incorrect!";
    feedback4.style.color = "red";
  }

  let userAnswer5 = document.querySelector("#q5").value.trim().toLowerCase();
  let feedback5 = document.querySelector("#feedback5");
  if (userAnswer5 === "kevin") {
    feedback5.textContent = "Correct!";
    feedback5.style.color = "green";
    score += 20;
  } 
  else 
    {
    feedback5.textContent = "Incorrect!";
    feedback5.style.color = "red";
  }

  document.querySelector("#scoreDisplay").textContent = "Your score: " + score + "/100";
  let attempts = localStorage.getItem("quizAttempts") || 0;
  attempts++;
  localStorage.setItem("quizAttempts", attempts);
  document.querySelector("#attemptsDisplay").textContent = "Quiz taken " + attempts + " times";

  if (score > 80) {
    document.querySelector("#scoreDisplay").textContent += "  Congratulations!";
  }
}
