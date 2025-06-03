document.addEventListener('DOMContentLoaded', () => {
    const challengeList = document.getElementById('challenge-list');
    const hintModal = document.getElementById('hint-modal');
    const hintContent = document.getElementById('hint-content');
    const closeModal = document.getElementById('close-modal');

    // Render challenges
    challenges.forEach(challenge => {
        const card = document.createElement('div');
        card.className = `challenge-card difficulty-${challenge.difficulty.toLowerCase()}`;
        card.innerHTML = `
            <h2 class="text-xl font-bold text-cyan-400">${challenge.title}</h2>
            <p class="text-gray-400">Category: ${challenge.category}</p>
            <p class="text-gray-400">Difficulty: ${challenge.difficulty}</p>
            <p class="text-gray-300 mt-2">${challenge.description}</p>
            <p class="text-gray-400">Points: ${challenge.points}</p>
            ${challenge.attachment ? `<a href="${challenge.attachment}" class="text-blue-400 underline" download>Download Attachment</a>` : ''}
            <p><a class="hint-link" data-hint="${challenge.hint}" href="#">View Hint</a></p>
            <input type="text" placeholder="Enter flag" class="w-full p-2 mt-2 bg-gray-700 text-white rounded">
            <button onclick="checkFlag(${challenge.id}, this.previousElementSibling.value)" class="mt-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        `;
        challengeList.appendChild(card);
    });

    // Hint modal functionality
    document.querySelectorAll('.hint-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            hintContent.textContent = e.target.dataset.hint;
            hintModal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        hintModal.classList.add('hidden');
    });

    // Flag checking (client-side for demo; use server-side in production)
    window.checkFlag = (id, submittedFlag) => {
        const challenge = challenges.find(c => c.id === id);
        if (submittedFlag === challenge.flag) {
            alert('Correct flag! Points awarded: ' + challenge.points);
        } else {
            alert('Incorrect flag. Try again!');
        }
    };
});
