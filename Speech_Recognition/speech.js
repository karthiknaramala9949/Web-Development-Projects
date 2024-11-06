let notesContainer = document.getElementById('notes');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-GB";
recognition.continuous = true; // Keep listening until manually stopped
recognition.interimResults = true; // Show real-time results

let currentParagraph = null; // Store the current paragraph element

// Start recording and create a new paragraph for each session
document.getElementById('start').onclick = () => {
    recognition.start();
    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;

    // Create a new paragraph element each time recording starts
    currentParagraph = document.createElement("p");
    notesContainer.appendChild(currentParagraph);
};

document.getElementById('stop').onclick = () => {
    recognition.stop();
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
};

// Display recognized speech in real-time within the current paragraph
recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    // Process each result as it comes in
    for (const result of event.results) {
        if (result.isFinal) {
            finalTranscript += result[0].transcript + ' ';
        } else {
            interimTranscript += result[0].transcript + ' ';
        }
    }

    // Display both interim and final transcripts in the current paragraph
    currentParagraph.innerHTML = `${finalTranscript+'.'} <em>${interimTranscript}</em>`;
};

// Handle any errors
recognition.onerror = (event) => {
    console.error("Speech recognition error detected: " + event.error);
};
