function renderChallenges(challengesToRender) {
  const container = document.getElementById('challenges');
  if (!container) {
    console.error('Error: Challenges container (#challenges) not found in DOM.');
    return;
  }

  if (!challengesToRender || !Array.isArray(challengesToRender)) {
    console.error('Error: Challenges array is not defined or invalid.');
    return;
  }

  container.innerHTML = ''; // Clear existing content

  challengesToRender.forEach(challenge => {
    const div = document.createElement('div');
    div.className = 'challenge-card';

    // Sanitize description to prevent XSS
    const description = challenge.description ? challenge.description.replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'No description available';

    div.innerHTML = `
      <h2>${challenge.title || 'Untitled Challenge'}</h2>
      <p><strong>Category:</strong> ${challenge.category || 'Unknown'}</p>
      <p><strong>Difficulty:</strong> ${challenge.difficulty || 'Unknown'}</p>
      <div class="description">${description}</div>
      ${challenge.attachment ? `<a href="${challenge.attachment}" class="btn btn-secondary attachment-link" download>Download Attachment</a>` : ''}
      <details class="hints">
        <summary>View Hints</summary>
        <ul>
          ${(challenge.hints || []).map(hint => `<li>${hint}</li>`).join('')}
        </ul>
      </details>
      <button class="btn btn-primary submit-flag" data-id="${challenge.id || 0}">Submit Flag</button>
    `;
    container.appendChild(div);
  });

  // Add event listeners for flag submission buttons
  const submitButtons = document.querySelectorAll('.submit-flag');
  submitButtons.forEach(button => {
    button.addEventListener('click', openFlagModal);
  });
}

function filterChallenges() {
  const categoryFilter = document.getElementById('category-filter');
  const difficultyFilter = document.getElementById('difficulty-filter');
  if (!categoryFilter || !difficultyFilter) {
    console.error('Error: Filter elements (#category-filter or #difficulty-filter) not found.');
    return;
  }

  const category = categoryFilter.value;
  const difficulty = difficultyFilter.value;

  let filtered = window.challenges || [];

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
  if (!modal) {
    console.error('Error: Flag modal (#flag-modal) not found.');
    return;
  }

  const challengeId = event.target.getAttribute('data-id');
  const challengeIdInput = document.getElementById('challenge-id');
  const flagInput = document.getElementById('flag-input');
  const flagResult = document.getElementById('flag-result');

  if (!challengeIdInput || !flagInput || !flagResult) {
    console.error('Error: Flag modal inputs (#challenge-id, #flag-input, or #flag-result) not found.');
    return;
  }

  challengeIdInput.value = challengeId;
  flagInput.value = '';
  flagResult.textContent = '';
  modal.style.display = 'block';
}

function closeFlagModal() {
  const modal = document.getElementById('flag-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function submitFlag(event) {
  event.preventDefault();
  const flagInput = document.getElementById('flag-input');
  const challengeIdInput = document.getElementById('challenge-id');
  const result = document.getElementById('flag-result');

  if (!flagInput || !challengeIdInput || !result) {
    console.error('Error: Flag form elements not found.');
    return;
  }

  const flagValue = flagInput.value.trim();
  const challengeId = parseInt(challengeIdInput.value);

  const challenge = window.challenges ? window.challenges.find(c => c.id === challengeId) : null;
  if (!challenge) {
    result.textContent = 'Challenge not found.';
    result.style.color = '#ff3e3e';
    return;
  }

  if (flagValue === challenge.flag) {
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
    if (window.challenges) {
      renderChallenges(window.challenges);
    } else {
      console.error('Error: window.challenges is not defined. Ensure challenges.js is loaded.');
    }

    // Filter event listeners
    const categoryFilter = document.getElementById('category-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const resetFilters = document.getElementById('reset-filters');

    if (categoryFilter) {
      categoryFilter.addEventListener('change', filterChallenges);
    } else {
      console.error('Error: Category filter (#category-filter) not found.');
    }

    if (difficultyFilter) {
      difficultyFilter.addEventListener('change', filterChallenges);
    } else {
      console.error('Error: Difficulty filter (#difficulty-filter) not found.');
    }

    if (resetFilters) {
      resetFilters.addEventListener('click', () => {
        if (categoryFilter && difficultyFilter) {
          categoryFilter.value = 'all';
          difficultyFilter.value = 'all';
          renderChallenges(window.challenges || []);
        }
      });
    } else {
      console.error('Error: Reset filters button (#reset-filters) not found.');
    }

    // Modal event listeners
    const closeButton = document.querySelector('.close');
    const flagForm = document.getElementById('flag-form');

    if (closeButton) {
      closeButton.addEventListener('click', closeFlagModal);
    } else {
      console.error('Error: Modal close button (.close) not found.');
    }

    if (flagForm) {
      flagForm.addEventListener('submit', submitFlag);
    } else {
      console.error('Error: Flag form (#flag-form) not found.');
    }

    window.addEventListener('click', (event) => {
      const modal = document.getElementById('flag-modal');
      if (modal && event.target === modal) {
        closeFlagModal();
      }
    });
  } catch (error) {
    console.error('Error initializing application:', error);
  }
});
