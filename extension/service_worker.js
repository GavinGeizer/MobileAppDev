chrome.runtime.onMessage.addListener(handleMessage);

function handleMessage(message, sender, sendResponse) {
  if (message?.type !== "TRANSCRIBE_SOURCE" || !message.text) {
    sendResponse({
      ok: false,
      error: "Invalid message payload."
    });
    return;
  }

  console.log("Message received in service worker:", message.text);
  //prepare to send the source URL to OPENAI
  var resp = transcribeSource(message.text);

  sendResponse({
    ok: true,
    source: message.text,
    response: resp
  });
}

async function transcribeSource(sourceUrl) {
  try {
    $.post('http://localhost:3000/api/endpoint', { url: sourceUrl });
  } catch (error) {
    console.error("Failed to transcribe source:", error);
  }
}