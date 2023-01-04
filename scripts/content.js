const insert = (content) => {
  // Find the Calmly editor input section
  const elements = document.getElementsByClassName("droid");

  if (elements.length === 0) {
    return;
  }

  const element = elements[0];
  // Grab the first p tag so we can replace it with our injection
  const spanToRemove = element.childNodes[0];
  spanToRemove.remove();

  // Split content by \n
  const splitContent = content.split("\n");

  // Wrap in p tags
  const p = document.createElement("p");
  const span = document.createElement("span");
  const br = document.createElement("br");

  if (content === "") {
    p.appendChild(span);
    span.appendChild(br);
  } else {
    p.appendChild(span);
    span.textContent = content;
  }
  // Insert into HTML one at a time
  element.appendChild(p);

  //  On success return true
  return true;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "inject") {
    const { content } = request;

    const result = insert(content);

    if (!result) {
      sendResponse({ status: "failed" });
    }

    sendResponse({ status: "success" });
  }
});
