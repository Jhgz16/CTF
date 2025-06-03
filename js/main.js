function renderChallenges() {
  const container = document.getElementById('challenges');
  if (!container) {
    console.error('Challenges container not found.');
    return;
  }
  if (!window.challenges || !Array.isArray(window.challenges)) {
    console.error('Challenges array is not defined or invalid.');
    return;
  }

  container.innerHTML = ''; // Clear existing content
  window.challenges.forEach(challenge => {
    const div = document.createElement('div');
    div.className = 'bg-gray-800 p-6 rounded-lg shadow-lg';
    
    // Sanitize HTML in description to prevent XSS
    const parser = new DOMParser();
    const doc = parser.parseFromString(challenge.description, 'text/html');
    const sanitizedDescription = doc.body.innerHTML;

    div.innerHTML = `
      <h2 class="text-2xl font-semibold text-indigo-400">${challenge.title}</h2>
      <p class="text-gray-400 mt-2">Category: ${challenge.category}</p>
      <p class="text-gray-400">Difficulty: ${challenge.difficulty}</p>
      <div class="text-gray-300 mt-2">${sanitizedDescription}</div>
      ${challenge.attachment ? `<a href="${challenge.attachment}" class="text-indigo-400 hover:underline mt-2 inline-block">Download Attachment</a>` : ''}
      <div class="mt-2">
        <p class="text-gray-400">Hints:</p>
        <ul class="list-disc list-inside text-gray-300">
          ${challenge.hints.map(hint => `<li>${hint}</li>`).join('')}
        </ul>
      </div>
    `;
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    renderChallenges();
  } catch (error) {
    console.error('Error rendering challenges:', error);
  }
});
