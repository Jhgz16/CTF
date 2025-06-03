const feedbackModal = document.getElementById('feedback-modal');
const feedbackContent = document.getElementById('feedback-content');
const closeFeedbackModal = document.getElementById('close-feedback-modal');

function showFeedback(message, isSuccess) {
    feedbackContent.textContent = message;
    feedbackContent.className = `text-${isSuccess ? 'green' : 'red'}-400`;
    feedbackModal.classList.remove('hidden');
}

closeFeedbackModal.addEventListener('click', () => {
    feedbackModal.classList.add('hidden');
});

// Flag submission function
window.submitFlag = (id, submittedFlag) => {
    const encryptedFlag = encryptedFlags.find(f => f.id === id).flag;
    const key = 'ctf-secret-key-2025'; // Hardcoded for demo; use secure key management in production
    const flag = CryptoJS.AES.decrypt(encryptedFlag, key).toString(CryptoJS.enc.Utf8);
    
    if (submittedFlag === flag) {
        showFeedback(`Correct flag! Points awarded: ${challenges.find(c => c.id === id).points}`, true);
    } else {
        showFeedback('Incorrect flag. Try again!', false);
    }
};
