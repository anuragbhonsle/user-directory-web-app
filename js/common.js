const API = "https://jsonplaceholder.typicode.com";

// Read ?userId=1 style parameters
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Escape text before inserting into HTML
function esc(str) {
  return $("<div>")
    .text(str == null ? "" : str)
    .html();
}

// "Leanne Graham" -> { first: "Leanne", last: "Graham" }
function splitName(fullName) {
  const parts = fullName.split(" ").filter(Boolean);

  if (parts.length > 1 && /^(mr|mrs|ms|miss|dr|prof)\.?$/i.test(parts[0])) {
    parts.shift();
  }

  return {
    first: parts[0] || "",
    last: parts.slice(1).join(" "),
  };
}

function showLoading() {
  $("#app").html('<div class="center"><div class="spinner"></div></div>');
}

function showError(message, retryFn, retryLabel) {
  $("#app").html(
    '<div class="center">' +
      '<div class="error-card">' +
      '<p class="error-title">Something went wrong</p>' +
      '<p class="error-text">' +
      esc(message) +
      "</p>" +
      '<button id="retry" class="btn-primary">' +
      esc(retryLabel || "Retry") +
      "</button>" +
      "</div>" +
      "</div>",
  );

  $("#retry").on("click", retryFn);
}
