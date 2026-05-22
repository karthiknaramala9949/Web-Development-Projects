const notesContainer = document.getElementById("notes");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const clearBtn = document.getElementById("clear");

const statusText = document.getElementById("status-text");
const statusDot = document.querySelector(".status-dot");

/*
==============================================
SPEECH RECOGNITION SETUP
==============================================
*/

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (!SpeechRecognition) {

  alert(
    "Speech Recognition is not supported in this browser."
  );

  throw new Error(
    "Speech Recognition not supported."
  );
}

const recognition = new SpeechRecognition();

recognition.continuous = true;

recognition.interimResults = true;

recognition.maxAlternatives = 3;

/*
==============================================
DEFAULT LANGUAGE
==============================================
*/

recognition.lang = "en-US";

/*
==============================================
SUPPORTED LANGUAGES
==============================================
*/

const languages = {

  english: "en-US",
  hindi: "hi-IN",
  kannada: "kn-IN",
  tamil: "ta-IN",
  telugu: "te-IN",
  malayalam: "ml-IN",
  bengali: "bn-IN",
  marathi: "mr-IN",
  gujarati: "gu-IN",
  punjabi: "pa-IN",
  urdu: "ur-PK"
};

/*
==============================================
APP STATE
==============================================
*/

let currentNote = null;

let finalTranscript = "";

let isRecording = false;

/*
==============================================
CHANGE LANGUAGE
==============================================
*/

function setLanguage(languageKey) {

  if (languages[languageKey]) {

    recognition.lang =
      languages[languageKey];

    console.log(
      "Language changed to:",
      recognition.lang
    );
  }
}

document
  .getElementById("language")
  .addEventListener("change", (e) => {

    setLanguage(e.target.value);

  });

/*
==============================================
START RECORDING
==============================================
*/

startBtn.onclick = () => {

  if (isRecording) return;

  isRecording = true;

  /*
  REMOVE EMPTY STATE
  */

  const emptyState =
    document.querySelector(".empty-state");

  if (emptyState) {

    emptyState.remove();
  }

  /*
  BUTTON STATES
  */

  startBtn.disabled = true;

  stopBtn.disabled = false;

  /*
  STATUS
  */

  statusText.innerText = "Listening...";

  statusDot.style.background =
    "#00e676";

  /*
  RESET TRANSCRIPT
  */

  finalTranscript = "";

  /*
  CREATE NEW NOTE
  */

  currentNote =
    document.createElement("div");

  currentNote.className = "note";

  currentNote.innerHTML = `

    <div class="note-header">

      <div class="note-badge">
        LIVE
      </div>

      <div class="note-time">
        ${new Date().toLocaleTimeString()}
      </div>

    </div>

    <div class="note-text">
      Listening...
    </div>

  `;

  /*
  ADD NOTE TO TOP
  */

  notesContainer.prepend(currentNote);

  /*
  START RECOGNITION
  */

  recognition.start();
};

/*
==============================================
STOP RECORDING
==============================================
*/

stopBtn.onclick = () => {

  isRecording = false;

  recognition.stop();

  startBtn.disabled = false;

  stopBtn.disabled = true;

  statusText.innerText = "Stopped";

  statusDot.style.background =
    "#64748b";

  /*
  REMOVE LIVE BADGE
  */

  if (currentNote) {

    const badge =
      currentNote.querySelector(
        ".note-badge"
      );

    if (badge) {

      badge.innerText = "SAVED";

      badge.style.background =
        "#334155";
    }
  }
};

/*
==============================================
CLEAR NOTES
==============================================
*/

clearBtn.onclick = () => {

  notesContainer.innerHTML = `

    <div class="empty-state">

      <div class="empty-icon">
        🎤
      </div>

      <h3>
        No transcription yet
      </h3>

      <p>
        Start speaking to generate live text transcription.
      </p>

    </div>

  `;
};

/*
==============================================
SPEECH RESULT
==============================================
*/

recognition.onresult = (event) => {

  let interimTranscript = "";

  /*
  PROCESS ONLY NEW RESULTS
  */

  for (
    let i = event.resultIndex;
    i < event.results.length;
    i++
  ) {

    const result =
      event.results[i];

    const transcript =
      result[0].transcript;

    if (result.isFinal) {

      finalTranscript +=
        transcript + " ";

    } else {

      interimTranscript +=
        transcript;
    }
  }

  /*
  CLEAN TEXT
  */

  const cleanedText =
    finalTranscript
      .replace(/\s+/g, " ")
      .trim();

  /*
  UPDATE NOTE
  */

  if (currentNote) {

    const noteText =
      currentNote.querySelector(
        ".note-text"
      );

    noteText.innerHTML = `

      <span>
        ${cleanedText}
      </span>

      <em>
        ${interimTranscript}
      </em>

    `;
  }
};

/*
==============================================
AUTO RESTART
==============================================
*/

recognition.onend = () => {

  console.log(
    "Recognition ended"
  );

  /*
  CHROME RANDOMLY STOPS
  */

  if (isRecording) {

    setTimeout(() => {

      recognition.start();

    }, 300);
  }
};

/*
==============================================
ON START
==============================================
*/

recognition.onstart = () => {

  console.log(
    "Recognition started"
  );

  statusText.innerText =
    "Listening...";

  statusDot.style.background =
    "#00e676";
};

/*
==============================================
ERROR HANDLING
==============================================
*/

recognition.onerror = (event) => {

  console.error(
    "Speech recognition error:",
    event.error
  );

  switch (event.error) {

    case "not-allowed":

      alert(
        "Microphone permission denied."
      );

      statusText.innerText =
        "Permission Denied";

      break;

    case "network":

      alert(
        "Network error."
      );

      statusText.innerText =
        "Network Error";

      break;

    case "audio-capture":

      alert(
        "No microphone detected."
      );

      statusText.innerText =
        "No Microphone";

      break;

    case "no-speech":

      console.log(
        "No speech detected."
      );

      break;

    default:

      console.log(
        "Error:",
        event.error
      );
  }
};