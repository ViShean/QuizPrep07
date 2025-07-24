// ✅ This file WILL trigger unsanitized warnings

// Simulate getting input from the URL.
// The plugin recognizes this as an untrusted source.
const userInput = window.location.search;

// ⚠️ This will now trigger "unsanitized/property"
document.body.innerHTML = userInput;

// ⚠️ This will now trigger "unsanitized/method"
const el = document.createElement("div");
el.insertAdjacentHTML("beforeend", userInput);
