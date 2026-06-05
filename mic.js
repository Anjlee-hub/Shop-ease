function startMic() {

  // Support for Chrome
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Browser does NOT support speech recognition. Use Chrome.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onstart = function () {
    document.getElementById("text").innerText =
      "🎤 Listening... speak now";
  };

  recognition.onresult = function (event) {

    const speech = event.results[0][0].transcript;

    document.getElementById("text").innerText =
      "You said: " + speech;

    // Reply back in voice
    const msg = new SpeechSynthesisUtterance(
      "You said " + speech
    );

    window.speechSynthesis.speak(msg);
  };

  recognition.onerror = function (e) {
    document.getElementById("text").innerText =
      "Error: " + e.error;
  };

  recognition.start();
}
