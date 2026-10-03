const API = "https://jsonplaceholder.typicode.com";

// read ?userId=1 style params (replaces useParams)
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// escape text before inserting into HTML
function esc(str) {
  return $("<div>").text(str == null ? "" : str).html();
}

function getInitials(name) {
  return name.split(" ").map(function (n) { return n[0]; }).slice(0, 2).join("").toUpperCase();
}

// draw <i data-lucide="..."> placeholders as SVG icons
function icons() {
  if (window.lucide) lucide.createIcons();
}

function showLoading() {
  $("#app").html('<div class="center"><div class="spinner"></div></div>');
}

function showError(message, retryFn, retryLabel) {
  $("#app").html(
    '<div class="center"><div class="error-card">' +
      '<div class="error-icon"><i data-lucide="alert-triangle" class="i6"></i></div>' +
      '<p class="error-title">Something went wrong</p>' +
      '<p class="error-text">' + esc(message) + "</p>" +
      '<button id="retry" class="btn-primary"><i data-lucide="rotate-cw" class="i4"></i> ' +
      esc(retryLabel || "Retry") + "</button>" +
    "</div></div>"
  );
  icons();
  $("#retry").on("click", retryFn);
}
