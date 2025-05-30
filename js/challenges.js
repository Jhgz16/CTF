const challenges = [
  { id: 1, title: "Source Code Secret", category: "Web", difficulty: "Novice", description: "Find the flag hidden in the page source. Authorized testing only.", flag: "FLAG{S0urc3_C0d3_1s_F5}", attachment: null, hints: [
    "Inspect the HTML source code.",
    "Look for comments or hidden elements.",
    "Check for unusual tags or attributes.",
    "Focus on the `<body>` section.",
    "Review the entire page for embedded clues."
  ]},
  { id: 2, title: "Cookie Crumbs", category: "Web", difficulty: "Easy", description: "A flag is stored in a cookie. Use developer tools. Authorized testing only.", flag: "FLAG{C00k13_Yummy}", attachment: null, hints: [
    "Examine browser cookies in developer tools.",
    "Open the Application tab in DevTools.",
    "Look for cookies set for the current domain.",
    "Check cookie names and values carefully.",
    "Ensure you’re viewing the correct path."
  ]},
  { id: 3, title: "Broken Authentication", category: "Web", difficulty: "Medium", description: "Analyze the server config for weak credentials. Ethical analysis only.", flag: "FLAG{Br0k3n_4uth}", attachment: "assets/auth_broken.conf", hints: [
    "Check for weak or default credentials in the configuration.",
    "Look for common username-password pairs.",
    "Analyze the config for hardcoded values.",
    "Consider default admin credentials.",
    "Verify if the password is in plain text."
  ]},
  { id: 4, title: "SQL Injection", category: "Web", difficulty: "Medium", description: "Exploit the SQL dump to extract the flag. Authorized SQLi testing.", flag: "FLAG{SQL_1nj3ct}", attachment: "assets/sql_injection.sql", hints: [
    "Explore SQL injection techniques on the database dump.",
    "Examine the table structure in the SQL file.",
    "Look for columns that might store sensitive data.",
    "Try querying specific fields in the users table.",
    "Check for direct flag storage in the data."
  ]},
  { id: 5, title: "XSS Payload", category: "Web", difficulty: "Hard", description: "Craft an XSS payload from the SQL dump. Ethical XSS testing only.", flag: "FLAG{XSS_H1}", attachment: "assets/xss_payload.sql", hints: [
    "Look for unsanitized data in the SQL dump.",
    "Check for script tags in stored data.",
    "Analyze table contents for executable code.",
    "Focus on fields that might render in a browser.",
    "Consider how payloads could be triggered."
  ]},
  { id: 6, title: "Directory Traversal", category: "Web", difficulty: "Easy", description: "Simulate a traversal attack using the config file. Authorized testing only.", flag: "FLAG{D1R_TR4V3RS4L}", attachment: "assets/dir_traversal.conf", hints: [
    "Analyze the config for path-related vulnerabilities.",
    "Look for file path settings in the config.",
    "Check for absolute or relative paths.",
    "Consider how paths could be manipulated.",
    "Verify if sensitive paths are exposed."
  ]},
  { id: 7, title: "JWT Hijack", category: "Web", difficulty: "Hard", description: "Decode the JWT token in the config file. Ethical JWT analysis.", flag: "FLAG{JWT_H1G4CK}", attachment: "assets/session_hijack.conf", hints: [
    "Examine the token for encoded data.",
    "Identify the format of the token string.",
    "Consider decoding methods for tokens.",
    "Check if the token contains structured data.",
    "Look for specific fields after decoding."
  ]},
  { id: 8, title: "CSRF Token Crack", category: "Web", difficulty: "Insane", description: "Exploit a CSRF flaw with SameSite bypass. Ethical testing only.", flag: "FLAG{C5RF_L34K}", attachment: "assets/csrf_leak.conf", hints: [
    "Check cookie security settings in the configuration.",
    "Look for SameSite attribute values.",
    "Analyze how cookies are handled.",
    "Consider cross-site request implications.",
    "Verify if protections can be bypassed."
  ]},
  { id: 9, title: "Log Analyzer", category: "Forensics", difficulty: "Medium", description: "Analyze the server log for a base64 flag. Ethical log analysis.", flag: "FLAG{L0_G5}", attachment: "assets/log.log", hints: [
    "Search for encoded data in the log entries.",
    "Look for base64-like strings in requests.",
    "Check HTTP methods and parameters.",
    "Focus on admin-related log entries.",
    "Consider decoding suspicious tokens."
  ]},
  { id: 10, title: "Packet Sniffer", category: "Forensics", difficulty: "Hard", description: "Inspect the PCAP for malicious traffic. Authorized testing.", flag: "FLAG{P4CK3T_5N1FF3R}", attachment: "assets/packets.pcap", hints: [
    "Analyze network traffic with a packet analysis tool.",
    "Filter for HTTP traffic in the PCAP.",
    "Look for custom headers in requests.",
    "Check for sensitive data in packet payloads.",
    "Focus on GET requests to specific hosts."
  ]},
  { id: 11, title: "Memory Dump", category: "Forensics", difficulty: "Medium", description: "Analyze the memory log for a hex-encoded flag. Ethical forensics.", flag: "FLAG{M3M0RY_D}", attachment: "assets/memory_log.txt", hints: [
    "Look for hexadecimal data in the memory log.",
    "Identify sequences that resemble text.",
    "Consider converting hex to ASCII.",
    "Check for patterns in the hex dump.",
    "Focus on data fields in the log."
  ]},
  { id: 12, title: "Hidden File", category: "Forensics", difficulty: "Easy", description: "Extract the flag from the zip archive. Ethical analysis.", flag: "FLAG_H1D3_FL4G", attachment: "assets/flag.zip", hints: [
    "Try common passwords to unlock the archive.",
    "Look for simple or default passwords.",
    "Check if the zip contains a single file.",
    "Consider password hints in the challenge.",
    "Verify the contents after extraction."
  ]},
  { id: 13, title: "File Metadata", category: "Forensics", difficulty: "Medium", description: "Check metadata in the config file.", flag: "FLAG{M3t4d4t4}", attachment: "assets/image_metadata.conf", hints: [
    "Inspect metadata fields in the configuration.",
    "Look for comment or note fields.",
    "Check for embedded text in the config.",
    "Consider metadata extraction tools.",
    "Focus on non-standard config entries."
  ]},
  { id: 14, title: "Network Trace", category: "Forensics", difficulty: "Hard", description: "Analyze the PCAP for unauthorized access. Authorized forensics.", flag: "FLAG{N3T_W0CK}", attachment: "assets/network_pcap.pcap", hints: [
    "Examine network traffic for anomalies.",
    "Filter for specific protocols like HTTP.",
    "Look for unusual headers or payloads.",
    "Check for sensitive data in responses.",
    "Focus on traffic to specific IPs."
  ]},
  { id: 15, title: "Regex Filter", category: "Regex", difficulty: "Novice", description: "Match a regex pattern to find the flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>pattern=R3G3X</pre>", flag: "FLAG{R3G3X}", attachment: null, hints: [
    "Apply a simple regex pattern to parse the data.",
    "Look for the pattern in the provided text.",
    "Consider basic regex syntax for matching.",
    "Check if the pattern is case-sensitive.",
    "Ensure the match fits the flag format."
  ]},
  { id: 16, title: "Log Parser", category: "Regex", difficulty: "Easy", description: "Parse the data for the flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>entry=P4RS3</pre>", flag: "FLAG{P4RS3}", attachment: null, hints: [
    "Use regex to extract data.",
    "Identify key-value pairs in the text.",
    "Focus on the entry field.",
    "Consider simple regex for extraction.",
    "Verify the extracted text format."
  ]},
  { id: 17, title: "Data Extractor", category: "Regex", difficulty: "Medium", description: "Apply regex to extract a base64 flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>token=RkxBR3tENHRhX1IzZzN4fQ==</pre>", flag: "FLAG{R3G3X_D4T4}", attachment: null, hints: [
    "Extract encoded data using regex patterns.",
    "Look for base64-encoded strings.",
    "Consider decoding the matched token.",
    "Check if the decoded text is structured.",
    "Ensure the output matches flag format."
  ]},
  { id: 18, title: "Obfuscated Script", category: "Web", difficulty: "Hard", description: "Use regex on the script to find the base64 flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>var x = \"RkxBR3t0QjN5QzM0dDJ2fQ==\";eval(atob(x));</pre>", flag: "FLAG{0_BFUS_C4T3D}", attachment: null, hints: [
    "Analyze the JavaScript for encoded patterns.",
    "Look for base64 strings in variables.",
    "Consider decoding the identified string.",
    "Check the decoded content for structure.",
    "Focus on the variable assignments."
  ]},
  { id: 19, title: "Hidden in Plain Sight", category: "Steganography", difficulty: "Easy", description: "Extract the flag from the PNG.", flag: "FLAG{H1DD3N}", attachment: "assets/stego_image.png", hints: [
    "Use steganography tools with a common password.",
    "Try default passwords like 'secret'.",
    "Check for embedded text in the image.",
    "Consider popular stego tools.",
    "Verify the extracted data format."
  ]},
  { id: 20, title: "Stego Wave", category: "Stego", difficulty: "Hard", description: "Extract flag from WAV file.", flag: "FLAG{W4V3}", attachment: "assets/stego_wav.wav", hints: [
    "Analyze the audio file with stego tools or audio editors.",
    "Look for embedded data in the WAV.",
    "Try common stego passwords.",
    "Check for text hidden in the audio.",
    "Consider audio analysis tools."
  ]},
  { id: 21, title: "Image Layers", category: "Steganography", difficulty: "Medium", description: "Decode hidden layers in PNG.", flag: "FLAG{L4Y3R}", attachment: "assets/stego_image_layers.png", hints: [
    "Explore hidden image layers with stego tools.",
    "Check for LSB encoding in the image.",
    "Consider tools like zsteg for analysis.",
    "Look for text in specific channels.",
    "Verify the extracted data structure."
  ]},
  { id: 22, title: "Stego Sound Puzzle", category: "Steganography", difficulty: "Hard", description: "Extract base64 flag from WAV.", flag: "FLAG{5T3G0}", attachment: "assets/stego.wav", hints: [
    "Extract data with stego tools and decode it.",
    "Look for base64 data in the WAV.",
    "Try common passwords for extraction.",
    "Check the decoded text for flag format.",
    "Consider audio stego techniques."
  ]},
  { id: 23, title: "Hex Decoder", category: "Forensics", difficulty: "Medium", description: "Decode hex flag in server log.", flag: "FLAG{H3X}", attachment: "assets/hex_log.txt", hints: [
    "Convert hexadecimal data to readable format.",
    "Look for hex strings in the log.",
    "Consider ASCII conversion of hex.",
    "Check for structured hex patterns.",
    "Verify the decoded text format."
  ]},
  { id: 24, title: "Caesar’s Secret", category: "Cryptography", difficulty: "Easy", description: "Decrypt the Caesar cipher to find the flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>ciphertext=UXYZTKAF</pre>", flag: "FLAG{C4S3R}", attachment: null, hints: [
    "Apply a Caesar cipher decryption with a shift.",
    "Try small shift values like 1-5.",
    "Look for meaningful text after shifting.",
    "Consider common shift values like 3.",
    "Check if the result fits flag format."
  ]},
  { id: 25, title: "Vigenère Cipher", category: "Cryptography", difficulty: "Medium", description: "Decrypt the Vigenère cipher to find the flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>ciphertext=ZTKAFWPK\nkey=cipher</pre>", flag: "FLAG{V1G3N3R3}", attachment: null, hints: [
    "Use the provided key for Vigenère decryption.",
    "Apply the key to the ciphertext.",
    "Check for repeating key patterns.",
    "Consider Vigenère decryption tools.",
    "Verify the decrypted text structure."
  ]},
  { id: 26, title: "Base64 Riddle", category: "Web", difficulty: "Easy", description: "Decode base64 to find the flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>data=RkxBR3tFNH0=</pre>", flag: "FLAG{E4}", attachment: null, hints: [
    "Look for base64 strings in the configuration.",
    "Identify encoded data in the text.",
    "Consider decoding tools for base64.",
    "Check if the decoded text is structured.",
    "Ensure the output matches flag format."
  ]},
  { id: 27, title: "Script Deobfuscation", category: "Web", difficulty: "Hard", description: "Deobfuscate JavaScript for base64 flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>var data = \"RkxBR3tEM18wYmZ1c2M0dDN9\";function decodeFlag() { return atob(data); }</pre>", flag: "FLAG{D3_0bfuscate}", attachment: null, hints: [
    "Simplify the JavaScript code and decode encoded data.",
    "Look for encoded strings in variables.",
    "Consider decoding base64 data.",
    "Check the function’s return value.",
    "Verify the decoded text format."
  ]},
  { id: 28, title: "Console Log Leak", category: "Web", difficulty: "Medium", description: "Script leaks flag in console.", flag: "FLAG{C0NS0L3}", attachment: null, hints: [
    "Check console logs in developer tools.",
    "Open the Console tab in DevTools.",
    "Look for error or log messages.",
    "Check for specific error outputs.",
    "Focus on script-related logs."
  ]},
  { id: 29, title: "Network Leak", category: "Web", difficulty: "Hard", description: "API request reveals flag in headers.", flag: "FLAG{N3TW0rk}", attachment: null, hints: [
    "Inspect network headers in developer tools.",
    "Open the Network tab in DevTools.",
    "Look for API or flag-related requests.",
    "Check for custom headers in responses.",
    "Focus on specific request types."
  ]},
  { id: 30, title: "Morse Code", category: "Cryptography", difficulty: "Easy", description: "Decode Morse code to find the flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>CODE: ..-. .-.. .- --. / -- --- .-..- ... -</pre>", flag: "FLAG{Morse}", attachment: null, hints: [
    "Use a Morse code decoder tool.",
    "Identify Morse code patterns in the text.",
    "Check for standard Morse characters.",
    "Consider spaces or slashes as separators.",
    "Verify the decoded text format."
  ]},
  { id: 31, title: "Code Signal", category: "Cryptography", difficulty: "Easy", description: "Extract Morse code flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>CODE: ... .-.. .-.. / -- -- --- .-.. --- --- -</pre>", flag: "FLAG{S1GN4L}", attachment: null, hints: [
    "Decode the Morse code in the log.",
    "Look for Morse sequences in the text.",
    "Use a Morse code chart or tool.",
    "Check for correct character mapping.",
    "Ensure the result fits flag format."
  ]},
  { id: 32, title: "Social Media", category: "OSINT", difficulty: "Medium", description: "Analyze social media profile for flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>bio=S0C14L</pre>", flag: "FLAG{S0C14L}", attachment: null, hints: [
    "Examine profile details for hidden data.",
    "Look for text in the bio field.",
    "Check for encoded or direct text.",
    "Consider social media profile formats.",
    "Verify the bio content structure."
  ]},
  { id: 33, title: "Geo Trace", category: "OSINT", difficulty: "Hard", description: "Extract flag from geo data in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>lat=40.7128,lon=-74.0060,flag=G0L0C4T0R</pre>", flag: "FLAG{G0L0C4T0R}", attachment: null, hints: [
    "Analyze geolocation coordinates.",
    "Look for additional data in the text.",
    "Check for flag-related fields.",
    "Consider coordinate-based clues.",
    "Verify the flag field content."
  ]},
  { id: 34, title: "OSINT Metadata", category: "OSINT", difficulty: "Medium", description: "Analyze document metadata for flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>metadata=M0</pre>", flag: "FLAG{M0}", attachment: null, hints: [
    "Extract metadata from the document.",
    "Look for metadata fields in the text.",
    "Check for hidden or encoded data.",
    "Consider metadata extraction methods.",
    "Verify the metadata content format."
  ]},
  { id: 35, title: "APK Hidden", category: "Mobile", difficulty: "Medium", description: "Extract hardcoded flag from APK.", flag: "FLAG{S4PK3}", attachment: "assets/app.apk", hints: [
    "Decompile the APK to analyze resources.",
    "Look for strings in the APK files.",
    "Check resource or XML files.",
    "Consider decompilation tools like JADX.",
    "Focus on hardcoded values."
  ]},
  { id: 36, title: "Insecure Storage", category: "Mobile", difficulty: "Hard", description: "Extract data from insecure storage.", flag: "FLAG{ST0R4G3}", attachment: "assets/stg.apk", hints: [
    "Check storage mechanisms in the app.",
    "Look for shared preferences or files.",
    "Analyze decompiled APK for storage.",
    "Consider insecure data storage methods.",
    "Focus on preference XML files."
  ]},
  { id: 37, title: "Mobile Config", category: "Mobile", difficulty: "Medium", description: "Analyze mobile config.", flag: "FLAG{M0B1L3}", attachment: "assets/config.conf", hints: [
    "Inspect configuration file for sensitive data.",
    "Look for key-value pairs in the config.",
    "Check for API or flag-related keys.",
    "Consider config file parsing.",
    "Verify the key content structure."
  ]},
  { id: 38, title: "Supply Chain", category: "Forensics", difficulty: "Hard", description: "Analyze log for supply chain attack flag.", flag: "FLAG{SH_CYCH}", attachment: "assets/chain.log", hints: [
    "Search for encoded data in the log.",
    "Look for hex or base64 strings.",
    "Check for supply chain-related entries.",
    "Consider decoding suspicious data.",
    "Focus on log entry patterns."
  ]},
  { id: 39, title: "AES-256", category: "Cryptography", difficulty: "Hard", description: "Decrypt AES-encrypted flag.", flag: "FLAG{A3S}", attachment: "assets/AES_enc.txt", hints: [
    "Use the provided encryption key for AES decryption.",
    "Look for ciphertext in the file.",
    "Check for AES mode and IV settings.",
    "Consider AES decryption tools.",
    "Verify the decrypted text format."
  ]},
  { id: 40, title: "MD5 Hash", category: "Cryptography", difficulty: "Medium", description: "Crack the MD5 hash.", flag: "FLAG{MD5}", attachment: "assets/md5.txt", hints: [
    "Use a hash cracking tool for MD5.",
    "Look for the hash in the file.",
    "Consider online hash databases.",
    "Check for common MD5 patterns.",
    "Verify the cracked text format."
  ]},
  { id: 41, title: "Text Stego", category: "Steganography", difficulty: "Medium", description: "Extract hidden flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>Normal text...  </pre>", flag: "FLAG{Stego}", attachment: null, hints: [
    "Look for hidden patterns in the text.",
    "Check for unusual spacing or characters.",
    "Consider whitespace steganography.",
    "Analyze text for hidden encoding.",
    "Verify the extracted data format."
  ]},
  { id: 42, title: "Image Layer", category: "Steganography", difficulty: "Medium", description: "Analyze hidden layers in PNG.", flag: "FLAG{L4Y3R}", attachment: "assets/stego_image_layers.png", hints: [
    "Use stego tools to explore image layers.",
    "Check for LSB or channel encoding.",
    "Consider zsteg or similar tools.",
    "Look for text in image data.",
    "Verify the extracted content."
  ]},
  { id: 43, title: "Binary Data", category: "Forensics", difficulty: "Medium", description: "Convert binary string to ASCII.", flag: "FLAG{B_F}", attachment: "assets/bin.txt", hints: [
    "Convert binary data to text.",
    "Look for binary strings in the file.",
    "Consider ASCII conversion of binary.",
    "Check for 8-bit binary patterns.",
    "Verify the converted text format."
  ]},
  { id: 44, title: "ROT13", category: "Cryptography", difficulty: "Easy", description: "Apply ROT13 decryption to find the flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>ciphertext=E0G13_F3PERG</pre>", flag: "FLAG{R13}", attachment: null, hints: [
    "Apply ROT13 cipher decryption.",
    "Look for ROT13-encoded text.",
    "Consider online ROT13 decoders.",
    "Check if the text is case-sensitive.",
    "Verify the decrypted text format."
  ]},
  { id: 45, title: "Baconian Cipher", category: "Cryptography", difficulty: "Hard", description: "Decode the Baconian cipher to find the flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>AAAAABABABBAABBAABABABAB</pre>", flag: "FLAG{B4C0N}", attachment: null, hints: [
    "Use a Baconian table for decoding.",
    "Look for A/B patterns in the text.",
    "Consider 5-bit Baconian encoding.",
    "Check for letter mappings in the cipher.",
    "Verify the decoded text structure."
  ]},
  { id: 46, title: "RSA key", category: "Cryptography", difficulty: "Hard", description: "Factorize RSA key.", flag: "FLAG{R4}", attachment: "assets/RSA.txt", hints: [
    "Factorize the RSA modulus.",
    "Look for n and e values in the file.",
    "Consider small modulus values.",
    "Use factorization tools or scripts.",
    "Check the decrypted text format."
  ]},
  { id: 47, title: "Log Cleaner", category: "Forensics", difficulty: "Medium", description: "Analyze cleaned log.", flag: "FLAG{CL34N}", attachment: "assets/clean.log", hints: [
    "Search for hidden data in the log.",
    "Look for unusual log entries.",
    "Check for encoded or direct text.",
    "Consider log parsing techniques.",
    "Verify the hidden data format."
  ]},
  { id: 48, title: "Archive Zip", category: "Steganography", difficulty: "Easy", description: "Extract flag from ZIP metadata.", flag: "FLAG{Z_S}", attachment: "assets/flag.zip", hints: [
    "Examine ZIP archive metadata.",
    "Look for comments in the ZIP file.",
    "Check for hidden text in metadata.",
    "Consider ZIP metadata tools.",
    "Verify the extracted text format."
  ]},
  { id: 49, title: "Network Flag", category: "Forensics", difficulty: "Hard", description: "Analyze network traffic.", flag: "FLAG{N_F}", attachment: "assets/flagged.pcap", hints: [
    "Inspect network packets for data.",
    "Filter for HTTP or specific protocols.",
    "Look for custom headers or payloads.",
    "Check for sensitive data in packets.",
    "Focus on specific request types."
  ]},
  { id: 50, title: "Regex Pattern", category: "Regex", difficulty: "Hard", description: "Extract regex pattern for flag in FLAG{...} format.<br><pre class='bg-gray-700 p-2 rounded'>data=P</pre>", flag: "FLAG{P}", attachment: null, hints: [
    "Craft a complex regex to extract data.",
    "Look for patterns in the provided text.",
    "Consider advanced regex techniques.",
    "Check for specific data structures.",
    "Verify the extracted text format."
  ]}
];
