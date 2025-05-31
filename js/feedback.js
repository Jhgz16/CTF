function showFeedback(message, isSuccess) {
  const feedbackContent = document.getElementById('feedbackContent');
  const feedbackModal = document.getElementById('feedbackModal');
  if (!feedbackModal || !feedbackContent) {
    console.error('Feedback modal elements not found');
    return;
  }
  feedbackContent.textContent = message;
  feedbackContent.classList.toggle('text-green-400', isSuccess);
  feedbackContent.classList.toggle('text-red-500', !isSuccess);
  feedbackModal.classList.remove('hidden');
}

function showHint(hint) {
  const hintContent = document.getElementById('hintContent');
  const hintModal = document.getElementById('hintModal');
  if (!hintModal || !hintContent) {
    console.error('Hint modal elements not found');
    return;
  }
  hintContent.textContent = hint || 'No more hints available';
  hintModal.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const closeFeedbackModal = document.getElementById('closeFeedbackModal');
  if (closeFeedbackModal) {
    closeFeedbackModal.addEventListener('click', () => {
      document.getElementById('feedbackModal').classList.add('hidden');
    });
  } else {
    console.error('Close feedback modal button not found');
  }

  const closeHintModal = document.getElementById('closeHintModal');
  if (closeHintModal) {
    closeHintModal.addEventListener('click', () => {
      document.getElementById('hintModal').classList.add('hidden');
    });
  } else {
    console.error('Close hint modal button not found');
  }
});
