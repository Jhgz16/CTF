const challenges = [
    {
        id: 1,
        title: "XSS Beginner",
        category: "Web",
        difficulty: "Beginner",
        points: 100,
        description: "Find a way to execute a simple alert() via XSS on this page.",
        hint: "Try injecting a basic script tag in the input field.",
        attachment: null
    },
    {
        id: 2,
        title: "SQL Injection Intro",
        category: "Web",
        difficulty: "Beginner",
        points: 100,
        description: "Bypass the login form using SQL injection.",
        hint: "Use a basic OR condition to bypass authentication.",
        attachment: null
    },
    {
        id: 3,
        title: "Caesar Cipher",
        category: "Cryptography",
        difficulty: "Beginner",
        points: 100,
        description: "Decode this: FJHLTKAF. Shift is between 1-25.",
        hint: "Try a brute-force approach with all possible shifts.",
        attachment: null
    },
    {
        id: 4,
        title: "Hidden in Plain Sight",
        category: "Steganography",
        difficulty: "Beginner",
        points: 100,
        description: "Find the flag hidden in this image.",
        hint: "Check the image metadata or use a stego tool.",
        attachment: "assets/challenges/challenge4.png"
    },
    {
        id: 5,
        title: "Cookie Monster",
        category: "Cookie Trail",
        difficulty: "Beginner",
        points: 100,
        description: "Manipulate the cookie to gain admin access.",
        hint: "Inspect the cookie and try changing its value.",
        attachment: null
    },
    {
        id: 6,
        title: "Source Code Secret",
        category: "Source Code",
        difficulty: "Beginner",
        points: 100,
        description: "The flag is hidden in the page source.",
        hint: "Use browser developer tools to inspect the HTML.",
        attachment: null
    },
    {
        id: 7,
        title: "Network Sniff",
        category: "Forensics",
        difficulty: "Beginner",
        points: 100,
        description: "Analyze this PCAP file to find the flag.",
        hint: "Look for HTTP traffic in Wireshark.",
        attachment: "assets/challenges/challenge7.pcap"
    },
    {
        id: 8,
        title: "Base64 Puzzle",
        category: "Cryptography",
        difficulty: "Beginner",
        points: 100,
        description: "Decode: Q1RGe2Jhc2U2NF9lYXN5fQ==",
        hint: "Use a base64 decoder tool or command.",
        attachment: null
    },
    {
        id: 9,
        title: "Directory Traversal",
        category: "Web",
        difficulty: "Intermediate",
        points: 200,
        description: "Access a hidden file using directory traversal.",
        hint: "Try navigating up the directory structure.",
        attachment: null
    },
    {
        id: 10,
        title: "Stego Image",
        category: "Steganography",
        difficulty: "Intermediate",
        points: 200,
        description: "Extract the flag from this image using steganography tools.",
        hint: "Use stegsolve or binwalk to analyze the image.",
        attachment: "assets/challenges/challenge10.png"
    },
    {
        id: 11,
        title: "RSA Crack",
        category: "Cryptography",
        difficulty: "Intermediate",
        points: 200,
        description: "Given n, e, and c, decrypt the message.",
        hint: "Check if n can be factored easily.",
        attachment: "assets/challenges/challenge11.txt"
    },
    {
        id: 12,
        title: "Session Hijack",
        category: "Cookie Trail",
        difficulty: "Intermediate",
        points: 200,
        description: "Steal a session cookie to access a restricted area.",
        hint: "Inspect cookies in developer tools.",
        attachment: null
    },
    {
        id: 13,
        title: "Memory Forensics",
        category: "Forensics",
        difficulty: "Intermediate",
        points: 200,
        description: "Analyze this memory dump to find the flag.",
        hint: "Use Volatility to inspect processes.",
        attachment: "assets/challenges/challenge13.mem"
    },
    {
        id: 14,
        title: "CSRF Trap",
        category: "Web",
        difficulty: "Intermediate",
        points: 200,
        description: "Craft a CSRF attack to change user settings.",
        hint: "Create a malicious HTML form.",
        attachment: null
    },
    {
        id: 15,
        title: "Packet Analysis",
        category: "Forensics",
        difficulty: "Intermediate",
        points: 200,
        description: "Find the flag in this PCAP file.",
        hint: "Filter for specific protocols in Wireshark.",
        attachment: "assets/challenges/challenge15.pcap"
    },
    {
        id: 16,
        title: "Audio Stego",
        category: "Steganography",
        difficulty: "Intermediate",
        points: 200,
        description: "Extract the flag from this audio file.",
        hint: "Check for hidden data in spectrograms.",
        attachment: "assets/challenges/challenge16.wav"
    },
    {
        id: 17,
        title: "Hash Cracker",
        category: "Cryptography",
        difficulty: "Intermediate",
        points: 200,
        description: "Crack this MD5 hash: 5f4dcc3b5aa765d61d8327deb882cf99",
        hint: "Use an online hash cracker or wordlist.",
        attachment: null
    },
    {
        id: 18,
        title: "Insecure Deserialization",
        category: "Web",
        difficulty: "Advanced",
        points: 300,
        description: "Exploit a deserialization vulnerability to get the flag.",
        hint: "Look into PHP or Python object injection.",
        attachment: null
    },
    {
        id: 19,
        title: "Binary Exploit",
        category: "Miscellaneous",
        difficulty: "Advanced",
        points: 300,
        description: "Exploit this binary to read the flag.",
        hint: "Check for buffer overflow vulnerabilities.",
        attachment: "assets/challenges/challenge19.bin"
    },
    {
        id: 20,
        title: "Advanced Stego",
        category: "Steganography",
        difficulty: "Advanced",
        points: 300,
        description: "Extract the flag from this complex image.",
        hint: "Combine multiple stego techniques.",
        attachment: "assets/challenges/challenge20.png"
    },
    {
        id: 21,
        title: "AES Decryption",
        category: "Cryptography",
        difficulty: "Advanced",
        points: 300,
        description: "Decrypt this AES-encrypted message.",
        hint: "You might need the key from another challenge.",
        attachment: "assets/challenges/challenge21.txt"
    },
    {
        id: 22,
        title: "Log Analysis",
        category: "Forensics",
        difficulty: "Advanced",
        points: 300,
        description: "Find the flag in these server logs.",
        hint: "Grep for unusual patterns.",
        attachment: "assets/challenges/challenge22.log"
    },
    {
        id: 23,
        title: "SSRF Exploit",
        category: "Web",
        difficulty: "Advanced",
        points: 300,
        description: "Use SSRF to access an internal service.",
        hint: "Try accessing localhost or internal IPs.",
        attachment: null
    },
    {
        id: 24,
        title: "Privilege Escalation",
        category: "Miscellaneous",
        difficulty: "Advanced",
        points: 300,
        description: "Escalate privileges to read the flag.",
        hint: "Check for misconfigured SUID binaries.",
        attachment: null
    },
    {
        id: 25,
        title: "Cookie Forge",
        category: "Cookie Trail",
        difficulty: "Advanced",
        points: 300,
        description: "Forge a cookie to gain admin access.",
        hint: "Reverse-engineer the cookie signing mechanism.",
        attachment: null
    },
    {
        id: 26,
        title: "Reverse Engineering",
        category: "Miscellaneous",
        difficulty: "Advanced",
        points: 300,
        description: "Reverse this binary to find the flag.",
        hint: "Use Ghidra or IDA to analyze the binary.",
        attachment: "assets/challenges/challenge26.bin"
    },
    {
        id: 27,
        title: "SQL Injection Pro",
        category: "Web",
        difficulty: "Expert",
        points: 400,
        description: "Exploit a blind SQL injection to extract the flag.",
        hint: "Use time-based or boolean-based techniques.",
        attachment: null
    },
    {
        id: 28,
        title: "Crypto Nightmare",
        category: "Cryptography",
        difficulty: "Expert",
        points: 400,
        description: "Break this custom encryption scheme.",
        hint: "Analyze the encryption algorithm carefully.",
        attachment: "assets/challenges/challenge28.txt"
    },
    {
        id: 29,
        title: "Stego Master",
        category: "Steganography",
        difficulty: "Expert",
        points: 400,
        description: "Extract the flag from this multi-layered stego challenge.",
        hint: "Combine LSB, metadata, and file carving.",
        attachment: "assets/challenges/challenge29.png"
    },
    {
        id: 30,
        title: "Memory Master",
        category: "Forensics",
        difficulty: "Expert",
        points: 400,
        description: "Find the flag in this complex memory dump.",
        hint: "Use advanced Volatility plugins.",
        attachment: "assets/challenges/challenge30.mem"
    }
];
