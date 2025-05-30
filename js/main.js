let hintProgress = {};

function renderChallenges() {
  const challengesDiv = document.getElementById('challenges');
  if (!challengesDiv) {
    console.error('Challenges div not found');
    return;
  }
  const solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges') || '{}');
  challengesDiv.innerHTML = '';
  challenges.forEach(challenge => {
    const isSolved = solvedChallenges[challenge.id];
    const card = document.createElement('div');
    card.className = 'card bg-gray-800 p-4 rounded-lg shadow-lg';
    card.innerHTML = `
      <h2 class="text-xl font-bold mb-2 text-blue-400">${challenge.title}</h2>
      <p class="mb-2"><strong>Category:</strong> ${challenge.category}</p>
      <p class="mb-2"><strong>Difficulty:</strong> ${challenge.difficulty}</p>
      <p class="mb-4">${challenge.description}</p>
      ${challenge.attachment ? `<p><a href="${encodeURI(challenge.attachment)}" class="text-blue-600 hover:underline" download>Download attachment</a></p>` : ''}
      <div class="mt-4">
        <input type="text" id="flag-${challenge.id}" placeholder="Enter flag" class="flag-input w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" ${isSolved ? 'disabled' : ''}>
        <button onclick="submitFlag(${challenge.id})" class="submit-button mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200" ${isSolved ? 'disabled' : ''}>Submit</button>
        <button onclick="showNextHint(${challenge.id})" class="hint-button mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200">Show Hint</button>
      </div>
    `;
    challengesDiv.appendChild(card);
    if (!hintProgress[challenge.id]) {
      hintProgress[challenge.id] = 0;
    }
  });
}

function showNextHint(challengeId) {
  const challenge = challenges.find(c => c.id === challengeId);
  if (!challenge) {
    console.error(`No challenge found for id ${challengeId}`);
    return;
  }
  const currentHintIndex = hintProgress[challengeId] || 0;
  if (currentHintIndex < challenge.hints.length) {
    showHint(challenge.hints[currentHintIndex]);
    hintProgress[challengeId] = currentHintIndex + 1;
  } else {
    showHint('No more hints available.');
  }
}

function submitFlag(challengeId) {
  const inputElement = document.getElementById(`flag-${challengeId}`);
  if (!inputElement) {
    console.error(`No input element found for challenge ${challengeId}`);
    return;
  }
  const input = inputElement.value.trim().replace(/[<>"]/g, '');
  const challenge = challenges.find(c => c.id === challengeId);
  if (!challenge) {
    console.error(`No challenge found for id ${challengeId}`);
    return;
  }
  const solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges') || '{}');
  if (solvedChallenges[challenge.id]) {
    showFeedback('Challenge already solved!', false);
    return;
  }
  if (input === challenge.flag) {
    solvedChallenges[challenge.id] = true;
    localStorage.setItem('solvedChallenges', JSON.stringify(solvedChallenges));
    showFeedback('Correct flag! Challenge solved!', true);
    renderChallenges();
  } else {
    showFeedback('Incorrect flag. Try again.', false);
  }
}

async function fetchNetworkFlag() {
  try {
    const response = await fetch('/api/flag', { headers: { 'Accept': 'text/plain' } });
    const flag = 'FLAG{N3TW0rk}';
    console.log('X-Flag:', flag);
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderChallenges();
  fetchNetworkFlag();
});
