chrome.runtime.onMessage.addListener(handleMessage);

async function handleMessage(message, sender, sendResponse) {
  if (message?.type !== "TRANSCRIBE_SOURCE" || !message.text) {
    sendResponse({
      ok: false,
      error: "Invalid message payload."
    });
    return;
  }

  console.log("Message received in service worker:", message.text);
  //prepare to send the source URL to OPENAI
  var resp = await transcribeSource(message.text);

  sendResponse({
    ok: true,
    source: message.text,
    response: resp
  });
}

async function transcribeSource(sourceUrl) {
  try {
    const params = new URLSearchParams();
    params.append("url", sourceUrl);

    const response = await fetch(`http://mapd.cs-smu.ca:3067/transcribe?${params.toString()}`);
    const data = await response.text();
    console.log("Transcription response:", data);

    return data;
  } catch (error) {
    console.error("Failed to transcribe source:", error);
  }
}