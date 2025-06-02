let hintProgress = {};

function getPointsForDifficulty(difficulty) {
  const pointsMap = {
    Novice: 50,
    Beginner: 100,
    Amateur: 200,
    Professional: 400,
    Insane: 500
  };
  return pointsMap[difficulty] || 0;
}

function calculateScore() {
  const solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges') || '{}');
  return Object.keys(solvedChallenges).reduce((sum, challengeId) => {
    const challenge = challenges.find(c => c.id === parseInt(challengeId));
    return challenge ? sum + getPointsForDifficulty(challenge.difficulty) : sum;
  }, 0);
}

function updateScoreDisplay() {
  const scoreElement = document.getElementById('scoreDisplay');
  if (scoreElement) {
    scoreElement.textContent = `Score: ${calculateScore()}`;
  }
}

function renderChallenges() {
  const categoriesDiv = document.getElementById('challenge-categories');
  if (!categoriesDiv) {
    console.error('Challenge categories div not found');
    return;
  }
  const solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges') || '{}');
  const challengesByDifficulty = challenges.reduce((acc, challenge) => {
    acc[challenge.difficulty] = acc[challenge.difficulty] || [];
    acc[challenge.difficulty].push(challenge);
    return acc;
  }, {});
  const difficultyOrder = ['Novice', 'Beginner', 'Amateur', 'Professional', 'Insane'];

  categoriesDiv.innerHTML = '';
  difficultyOrder.forEach(difficulty => {
    if (challengesByDifficulty[difficulty]) {
      const section = document.createElement('section');
      section.className = 'mb-12';
      section.innerHTML = `<h3 class="text-2xl font-semibold mb-6 text-rose-400">${difficulty} Level</h3>`;
      const grid = document.createElement('div');
      grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      challengesByDifficulty[difficulty].sort((a, b) => a.id - b.id).forEach(challenge => {
        const isSolved = solvedChallenges[challenge.id];
        const challengeCard = document.createElement('div');
        challengeCard.className = 'card bg-gray-800 p-6 rounded-lg shadow-lg';
        challengeCard.innerHTML = `
          <h4 class="text-lg font-bold mb-3 text-gray-100">${challenge.title}</h4>
          <p class="mb-2"><strong>Category:</strong> ${challenge.category}</p>
          <p class="mb-2"><strong>Points:</strong> ${getPointsForDifficulty(challenge.difficulty)}</p>
          <p class="mb-4 text-gray-400">${challenge.description}</p>
          ${challenge.attachment ? `<p><a href="${encodeURI(challenge.attachment)}" class="text-blue-500 hover:underline" target="_blank" download>Download artifact</a></p>` : ''}
          <div class="flex flex-col space-y-4 mt-4">
            <input type="text" id="flag-${challenge.id}" placeholder="Enter flag" class="flag-input w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500" ${isSolved ? 'disabled' : ''}>
            <div class="flex space-x-3">
              <button onclick="submitFlag(${challenge.id})" class="submit-button bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300" ${isSolved ? 'disabled' : ''}>Submit</button>
              <button onclick="showNextHint(${challenge.id})" class="hint-button bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition duration-300">View Hint</button>
            </div>
          </div>
        `;
        grid.appendChild(challengeCard);
        if (!hintProgress[challenge.id]) {
          hintProgress[challenge.id] = 0;
        }
      });
      section.appendChild(grid);
      categoriesDiv.appendChild(section);
    }
  });

  updateScoreDisplay();
}

function showNextHint(challengeId) {
  const challenge = challenges.find(c => c.id === challengeId);
  if (!challenge) {
    console.error(`Error: Challenge not found for id ${challengeId}`);
    return;
  }
  const currentProgress = hintProgress[challengeId] || 0;
  if (currentProgress < 5) {
    hintProgress[challengeId] = currentProgress + 1;
  }
  const hintsToShow = challenge.hints.slice(0, hintProgress[challengeId]);
  let hintContent = '<ul class="list-disc pl-5">';
  hintsToShow.forEach(hint => {
    hintContent += `<li>${hint}</li>`;
  });
  hintContent += '</ul>';
  if (hintProgress[challengeId] >= 5) {
    hintContent += '<p class="mt-3 text-gray-400">No additional hints available.</p>';
  }
  showHint(hintContent);
}

function submitFlag(challengeId) {
  const inputElement = document.getElementById(`flag-${challengeId}`);
  if (!inputElement) {
    console.error(`Error: No input element found for challenge ${challengeId}`);
    return;
  }
  const input = inputElement.value.trim().replace(/[<>"]/g, '');
  const challenge = challenges.find(c => c.id === challengeId);
  if (!challenge) {
    console.error(`Error: No challenge found for id ${challengeId}`);
    return;
  }
  const solvedChallenges = JSON.parse(localStorage.getItem('solvedChallenges') || '{}');
  if (solvedChallenges[challenge.id]) {
    showFeedback('This challenge is already solved.', false);
    return;
  }
  if (input === challenge.flag) {
    solvedChallenges[challenge.id] = true;
    localStorage.setItem('solvedChallenges', JSON.stringify(solvedChallenges));
    showFeedback('Correct flag! Challenge solved.', true);
    renderChallenges();
  } else {
    showFeedback('Incorrect flag. Please try again.', false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderChallenges();
});
