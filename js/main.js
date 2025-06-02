function renderChallenges(challengesToRender) {
  const container = document.getElementById('challenges');
  if (!container) {
    console.error('Challenges container not found.');
    return;
  }

  if (!challengesToRender || !Array.isArray(challengesToRender)) {
    console.error('Challenges array is not defined or invalid.');
    return;
  }

  container.innerHTML = ''; // Clear existing content

  challengesToRender.forEach(challenge => {
    const div = document.createElement('div');
    div.className = 'challenge-card';

    // Sanitize description to prevent XSS
    const description = challenge.description.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    div.innerHTML = `
      <h2>${challenge.title}</h2>
      <p><strong>Category:</strong> ${challenge.category}</p>
      <p><strong>Difficulty:</strong> ${challenge.difficulty}</p>
      <div class="description">${description}</div>
      ${challenge.attachment ? `<a href="${challenge.attachment}" class="btn btn-secondary attachment-link" download>Download Attachment</a>` : ''}
      <details class="hints">
        <summary>View Hints</summary>
        <ul>
          ${challenge.hints.map(hint => `<li>${hint}</li>`).join('')}
        </ul>
      </details>
      <button class="btn btn-primary submit-flag" data-id="${challenge.id}">Submit Flag</button>
    `;
    container.appendChild(div);
  });

  // Add event listeners for flag submission buttons
  document.querySelectorAll('.submit-flag').forEach(button => {
    button.addEventListener('click', openFlagModal);
  });
}

function filterChallenges() {
  const category = document.getElementById('category-filter').value;
  const difficulty = document.getElementById('difficulty-filter').value;

  let filtered = window.challenges;

  if (category !== 'all') {
    filtered = filtered.filter(c => c.category === category);
  }

  if (difficulty !== 'all') {
    filtered = filtered.filter(c => c.difficulty === difficulty);
  }

  renderChallenges(filtered);
}

function openFlagModal(event) {
  const modal = document.getElementById('flag-modal');
  const challengeId = event.target.getAttribute('data-id');
  document.getElementById('challenge-id').value = challengeId;
  document.getElementById('flag-input').value = '';
  document.getElementById('flag-result').textContent = '';
  modal.style.display = 'block';
}

function closeFlagModal() {
  document.getElementById('flag-modal').style.display = 'none';
}

function submitFlag(event) {
  event.preventDefault();
  const flagInput = document.getElementById('flag-input').value.trim();
  const challengeId = parseInt(document.getElementById('challenge-id').value);
  const result = document.getElementById('flag-result');

  const challenge = window.challenges.find(c => c.id === challengeId);
  if (!challenge) {
    result.textContent = 'Challenge not found.';
    result.style.color = '#ff3e3e';
    return;
  }

  if (flagInput === challenge.flag) {
    result.textContent = 'Correct flag! Challenge solved.';
    result.style.color = '#9fef00';
  } else {
    result.textContent = 'Incorrect flag. Try again.';
    result.style.color = '#ff3e3e';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initial render
    renderChallenges(window.challenges);

    // Filter event listeners
    document.getElementById('category-filter').addEventListener('change', filterChallenges);
    document.getElementById('difficulty-filter').addEventListener('change', filterChallenges);
    document.getElementById('reset-filters').addEventListener('click', () => {
      document.getElementById('category-filter').value = 'all';
      document.getElementById('difficulty-filter').value = 'all';
      renderChallenges(window.challenges);
    });

    // Modal event listeners
    document.querySelector('.close').addEventListener('click', closeFlagModal);
    window.addEventListener('click', (event) => {
      if (event.target === document.getElementById('flag-modal')) {
        closeFlagModal();
      }
    });
    document.getElementById('flag-form').addEventListener('submit', submitFlag);
  } catch (error) {
    console.error('Error initializing application:', error);
  }
});
