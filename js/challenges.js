const challenges = [
  {
    id: 1,
    title: "Source Code Secret",
    category: "Web",
    difficulty: "Beginner",
    description: "The flag is hidden somewhere in the source code of this page. Can you find it?",
    flag: "CTF{S0urc3_C0d3_1s_Fun}",
    attachment: null,
    hint: "Right-click the page and select 'View Source' to inspect the HTML."
  },
  {
    id: 2,
    title: "Cookie Crumbs",
    category: "Web",
    difficulty: "Easy",
    description: "A flag is hidden in a cookie set by this page. Check the browser's developer tools to find it.",
    flag: "CTF{C00k13s_4r3_Yummy}",
    attachment: null,
    hint: "Use the browser's developer tools (F[Q1RGe0wwZzVfUjN2MzRsXzUzY3IzNX0=]12) and check the 'Application' tab for cookies."
  },
  {
    id: 3,
    title: "Caesar’s Secret",
    category: "Cryptography",
    difficulty: "Medium",
    description: "Decrypt the following cipher to find the flag: FJHLTKHPUHLTKHPU. The flag is also hidden in the page's source code as a data attribute.",
    flag: "CTF{CRYPTOISFUN}",
    attachment: "assets/crypto.txt",
    hint: "A Caesar cipher shifts each letter by a fixed number. Try shifting each letter back by 3."
  },
  {
    id: 4,
    title: "Hidden in Plain Sight",
    category: "Steganography",
    difficulty: "Hard",
    description: "The flag is hidden within this image and also in a hidden div in the page source. Can you extract it?",
    flag: "CTF{St3g0_1s_H1dd3n}",
    attachment: "assets/stego.png",
    hint: "Steganography often hides data in the least significant bits of an image. Try using a stego tool like Steghide, or check the page source."
  },
  {
    id: 5,
    title: "Log Analyzer",
    category: "Forensics",
    difficulty: "Expert",
    description: "Analyze the provided log file to find the flag. The flag is also encoded in a comment in the page source (base64).",
    flag: "CTF{L0g5_R3v34l_53cr3t5}",
    attachment: "assets/forensics.txt",
    hint: "Check for unusual patterns or encoded data in the log entries and page source."
  }
  // Add 15 more challenges here following the same structure
];