const solvedChallenges = new Set();

function checkFlag(challengeId, submittedFlag) {
  const challenge = challenges.find(c => c.id === challengeId);
  if (!challenge) return { success: false, message: "Challenge not found!" };
  if (solvedChallenges.has(challengeId)) return { success: false, message: "This challenge is already solved!" };
  if (submittedFlag === challenge.flag) {
    solvedChallenges.add(challengeId);
    return { success: true, message: "Correct flag! Challenge solved!" };
  }
  return { success: false, message: "Incorrect flag. Try again!" };
}