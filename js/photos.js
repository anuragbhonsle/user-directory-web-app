const albumId = getParam("albumId");
let photos = [];

function photoUrl(id, size) {
  return "https://picsum.photos/seed/" + id + "/" + size;
}

function loadPhotos() {
  showLoading();

  // 1. album first (we need its userId), 2. photos + user together
  $.get(API + "/albums/" + albumId)
    .then(function (album) {
      return $.when(
        $.get(API + "/photos?albumId=" + albumId),
        $.get(API + "/users/" + album.userId)
      ).then(function (photosRes, userRes) {
        return { album: album, photos: photosRes[0], user: userRes[0] };
      });
    })
    .done(function (r) {
      photos = r.photos;
      renderPhotos(r.album, r.user);
    })
    .fail(function () {
      showError("We couldn't load the photos. Please try again.", loadPhotos, "Retry");
    });
}

function renderPhotos(album, user) {
  let html =
    '<div class="container">' +
      '<a href="albums.html?userId=' + album.userId + '" class="back-link"><i data-lucide="arrow-left" class="i4"></i> Back to Albums</a>' +
      '<div class="info-header">' +
        '<div class="info-left">' +
          '<div class="info-icon"><i data-lucide="image" class="i6"></i></div>' +
          "<div>" +
            '<h1 class="info-title capitalize">' + esc(album.title) + "</h1>" +
            '<p class="info-sub">Album #' + album.id + " • " + photos.length + " Photos</p>" +
          "</div>" +
        "</div>" +
        '<a href="albums.html?userId=' + user.id + '" class="badge">' +
          '<div class="info-icon"><i data-lucide="user" class="i4"></i></div>' +
          "<div>" +
            '<p class="badge-name">' + esc(user.name) + "</p>" +
            '<p class="badge-user">@' + esc(user.username) + "</p>" +
          "</div>" +
        "</a>" +
      "</div>" +
      '<div class="grid-photos">';

  photos.forEach(function (p) {
    html +=
      '<div class="card photo" data-id="' + p.id + '">' +
        '<img src="' + photoUrl(p.id, 300) + '" alt="' + esc(p.title) + '" loading="lazy" />' +
        '<p class="truncate">' + esc(p.title) + "</p>" +
      "</div>";
  });

  html += '</div></div><div id="lightbox"></div>';
  $("#app").html(html);
  icons();
}

function openLightbox(photo) {
  $("#lightbox").html(
    '<div class="overlay">' +
      '<div class="modal">' +
        '<img src="' + photoUrl(photo.id, 600) + '" alt="' + esc(photo.title) + '" />' +
        "<h3>" + esc(photo.title) + "</h3>" +
        '<p class="pid">Photo ID: ' + photo.id + "</p>" +
        '<div class="modal-actions">' +
          '<a href="' + photoUrl(photo.id, 600) + '" target="_blank" rel="noreferrer">Open full resolution <i data-lucide="external-link" class="i4"></i></a>' +
          '<button class="btn-close">Close</button>' +
        "</div>" +
      "</div>" +
    "</div>"
  );
  icons();
}

function closeLightbox() { $("#lightbox").empty(); }

// delegated events (elements are created dynamically)
$(document)
  .on("click", ".photo", function () {
    const id = Number($(this).data("id"));
    openLightbox(photos.find(function (p) { return p.id === id; }));
  })
  .on("click", ".overlay", closeLightbox)
  .on("click", ".modal", function (e) { e.stopPropagation(); })
  .on("click", ".btn-close", closeLightbox)
  .on("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });

$(loadPhotos);
