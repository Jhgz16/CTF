function renderChallenges() {
  const challengesDiv = document.getElementById('challenges');
  if (!challengesDiv) return;
  const solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges') || '{}');
  challengesDiv.innerHTML = '';
  challenges.forEach(challenge => {
    const isSolved = solvedChallenges[challenge.id];
    const card = document.createElement('div');
    card.className = 'card bg-gray-800 p-4 rounded-lg shadow-lg';
    card.innerHTML = `
      <h2 class="text-2xl font-bold mb-2 text-blue-400">${challenge.title}</h2>
      <p class="mb-2"><strong>Category:</strong> ${challenge.category}</p>
      <p class="mb-2"><strong>Difficulty:</strong> ${challenge.difficulty}</p>
      <p class="mb-4">${challenge.description}</p>
      ${challenge.attachment ? `<p><a href="${challenge.attachment}" class="text-blue-600 hover:underline" download>Download attachment</a></p>` : ''}
      <div class="mt-4">
        <input type="text" id="flag-${challenge.id}" placeholder="Enter flag" class="flag-input w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" ${isSolved ? 'disabled' : ''}>
        <button onclick="submitFlag(${challenge.id})" class="submit-button mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200" ${isSolved ? 'disabled' : ''}>Submit</button>
        <button onclick="showHint(${challenge.id})" class="hint-button mt-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200">Show Hint</button>
      </div>
    `;
    challengesDiv.appendChild(card);
  });
}

function showHint(challengeId) {
  const challenge = challenges.find(ch => ch.id === challengeId);
  if (challenge) {
    showHint(challenge.hint);
  }
}

function submitFlag(challengeId) {
  const inputElement = document.getElementById(`flag-${challengeId}`);
  if (!inputElement) return;
  const input = inputElement.value.trim().replace(/[<>"]/g, '');
  const challenge = challenges.find(c => c.id === challengeId);
  if (!challenge) return;
  const solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges') || '{}');
  if (solvedChallenges[challengeId]) {
    showFeedback('Challenge already solved!', false);
    return;
  }
  if (input === challenge.flag) {
    solvedChallenges[challengeId] = true;
    localStorage.setItem('solvedChallenges', JSON.stringify(solvedChallenges));
    showFeedback('Correct flag! Challenge solved!', true);
    renderChallenges();
  } else {
    showFeedback('Incorrect flag. Try again.', false);
  }
}

async function fetchNetworkFlag() {
  try {
    const response = await fetch('/api/flag', { headers: { 'Accept': 'application/json' } });
    const flag = 'FLAG{N3TW0rk}';
    console.log('X-Flag:', flag);
  } catch (e) {
    console.error('Network error:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderChallenges();
  fetchNetworkFlag();
});