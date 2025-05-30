function checkFlag(challengeId, submittedFlag) {
  const challenge = challenges.find(c => c.id === challengeId);
  if (!challenge) return { success: false, message: "Challenge not found!" };
  if (submittedFlag === challenge.flag) {
    return { success: true, message: "Correct flag! Challenge solved!" };
  }
  return { success: false, message: "Incorrect flag. Try again!" };
}