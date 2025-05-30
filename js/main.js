document.addEventListener("DOMContentLoaded", () => {
  const challengesDiv = document.getElementById("challenges");
  const hintModal = document.getElementById("hintModal");
  const hintContent = document.getElementById("hintContent");
  const closeModal = document.getElementById("closeModal");

  // Render challenges
  challenges.forEach(challenge => {
    const card = document.createElement("div");
    card.className = "card bg-gray-800 p-6 rounded-lg shadow-lg";
    card.innerHTML = `
      <h2 class="text-xl font-bold text-blue-400">${challenge.title}</h2>
      <p class="text-gray-400 mb-2">Category: ${challenge.category} | Difficulty: ${challenge.difficulty}</p>
      <p class="mb-4">${challenge.description}</p>
      ${challenge.attachment ? `<a href="${challenge.attachment}" class="text-blue-500 hover:underline" download>Download Attachment</a>` : ""}
      <p><a href="#" class="text-blue-500 hover:underline hint-link" data-hint="${challenge.hint}">View Hint</a></p>
      <input type="text" placeholder="Enter flag" class="w-full p-2 mb-2 bg-gray-700 text-white rounded" id="flag-${challenge.id}">
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded submit-flag" data-id="${challenge.id}">Submit</button>
      <p class="mt-2 text-green-400 hidden feedback" id="feedback-${challenge.id}"></p>
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

  // Close modal
  closeModal.addEventListener("click", () => {
    hintModal.classList.add("hidden");
  });

  // Handle flag submission
  document.querySelectorAll(".submit-flag").forEach(button => {
    button.addEventListener("click", (e) => {
      const challengeId = parseInt(e.target.dataset.id);
      const flagInput = document.getElementById(`flag-${challengeId}`).value;
      const feedback = checkFlag(challengeId, flagInput);
      const feedbackDiv = document.getElementById(`feedback-${challengeId}`);
      feedbackDiv.textContent = feedback.message;
      feedbackDiv.classList.remove("hidden");
      feedbackDiv.classList.toggle("text-green-400", feedback.success);
      feedbackDiv.classList.toggle("text-red-400", !feedback.success);
    });
  });
});