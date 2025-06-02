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
    card.className = 'card bg-gray-800 p-6 rounded-lg shadow-lg';
    card.innerHTML = `
      <h2 class="text-xl font-bold mb-4 text-gray-100">${challenge.title}</h2>
      <p class="mb-2"><strong>Category:</strong> ${challenge.category}</p>
      <p class="mb-2"><strong>Difficulty:</strong> ${challenge.difficulty}</p>
      <p class="mb-4 text-gray-300">${challenge.description}</p>
      ${challenge.attachment ? `<p><a href="${encodeURI(challenge.attachment)}" class="text-blue-600 hover:underline" target="_blank" download>Download attachment</a></p>` : ''}
      <div class="mt-4 space-y-2">
        <input type="text" id="flag-${challenge.id}" placeholder="Enter flag" class="flag-input w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500" ${isSolved ? 'disabled' : ''}>
        <div class="flex space-x-2">
          <button onclick="submitFlag(${challenge.id})" class="submit-button bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200" ${isSolved ? 'disabled' : ''}>Submit</button>
          <button onclick="showNextHint(${challenge.id})" class="hint-button bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition duration-200">Show Hint</button>
        </div>
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
  const currentProgress = hintProgress[challengeId] || 0;
  if (currentProgress < 5) {
    hintProgress[challengeId] = currentProgress + 1;
  }
  const hintsToShow = challenge.hints.slice(0, hintProgress[challengeId]);
  let hintContent = '<ul class="list-disc pl-4">';
  hintsToShow.forEach(hint => {
    hintContent += `<li>${hint}</li>`;
  });
  hintContent += '</ul>';
  if (hintProgress[challengeId] >= 5) {
    hintContent += '<p class="mt-2 text-gray-400">No more hints available.</p>';
  }
  showHint(hintContent);
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
