window.addEventListener("mousedown", transcribe);

async function transcribe(event) {
  const currentTarget = event.target;
  const sourceUrl = currentTarget?.src;

  if (!sourceUrl) {
    return;
  }

  try {
    const response = await chrome.runtime.sendMessage({
      type: "TRANSCRIBE_SOURCE",
      text: sourceUrl
    });

    console.log("Service worker response:", response);
  } catch (error) {
    console.error("Failed to send message to service worker:", error);
  }
}
