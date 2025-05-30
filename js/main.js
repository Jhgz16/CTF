document.addEventListener("DOMContentLoaded", () => {
  const challengesDiv = document.getElementById("challenges");
  const hintModal = document.getElementById("hintModal");
  const hintContent = document.getElementById("hintContent");
  const closeHintModal = document.getElementById("closeHintModal");
  const feedbackModal = document.getElementById("feedbackModal");
  const feedbackContent = document.getElementById("feedbackContent");
  const closeFeedbackModal = document.getElementById("closeFeedbackModal");

  // Render challenges
  challenges.forEach(challenge => {
    const card = document.createElement("div");
    card.className = "card bg-gray-800 p-6 rounded-lg shadow-lg";
    card.id = `challenge-${challenge.id}`;
    card.innerHTML = `
      <h2 class="text-xl font-bold text-blue-400">${challenge.title}</h2>
      <p class="text-gray-400 mb-2">Category: ${challenge.category} | Difficulty: ${challenge.difficulty}</p>
      <p class="mb-4">${challenge.description}</p>
      ${challenge.attachment ? `<a href="${challenge.attachment}" class="text-blue-500 hover:underline" download>Download Attachment</a>` : ""}
      <p><a href="#" class="text-blue-500 hover:underline hint-link" data-hint="${challenge.hint}">View Hint</a></p>
      <input type="text" placeholder="Enter flag" class="w-full p-2 mb-2 bg-gray-700 text-white rounded flag-input" id="flag-${challenge.id}">
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded submit-flag" data-id="${challenge.id}">Submit</button>
    `;
    challengesDiv.appendChild(card);
  });

  // Handle hint clicks
  document.querySelectorAll(".hint-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      hintContent.textContent = e.target.dataset.hint;
      hintModal.classList.remove("hidden");
    });
  });

  // Close hint modal
  closeHintModal.addEventListener("click", () => {
    hintModal.classList.add("hidden");
  });

  // Handle flag submission
  document.querySelectorAll(".submit-flag").forEach(button => {
    button.addEventListener("click", (e) => {
      const challengeId = parseInt(e.target.dataset.id);
      const flagInput = document.getElementById(`flag-${challengeId}`).value;
      const feedback = checkFlag(challengeId, flagInput);
      feedbackContent.textContent = feedback.message;
      feedbackContent.classList.toggle("text-green-400", feedback.success);
      feedbackContent.classList.toggle("text-red-400", !feedback.success);
      feedbackModal.classList.remove("hidden");

      if (feedback.success) {
        const card = document.getElementById(`challenge-${challengeId}`);
        card.classList.add("solved");
        card.querySelector(".flag-input").disabled = true;
        card.querySelector(".submit-flag").disabled = true;
      }
    });
  });

  // Close feedback modal
  closeFeedbackModal.addEventListener("click", () => {
    feedbackModal.classList.add("hidden");
  });
});