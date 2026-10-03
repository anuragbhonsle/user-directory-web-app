const userId = getParam("userId");

function loadAlbums() {
  showLoading();
  $.when(
    $.get(API + "/albums?userId=" + userId),
    $.get(API + "/users/" + userId)
  )
    .done(function (albumsRes, userRes) {
      renderAlbums(albumsRes[0], userRes[0]);
    })
    .fail(function () {
      showError("We couldn't load the albums. Please try again.", loadAlbums, "Retry");
    });
}

function renderAlbums(albums, user) {
  let html =
    '<div class="container narrow">' +
      '<a href="index.html" class="back-link"><i data-lucide="arrow-left" class="i4"></i> Back to Directory</a>' +
      '<div class="info-header">' +
        '<div class="info-left">' +
          '<div class="info-icon"><i data-lucide="user" class="i6"></i></div>' +
          "<div>" +
            '<h1 class="info-title">' + esc(user.name) + "</h1>" +
            '<p class="info-sub">@' + esc(user.username) + " • " + albums.length + " Albums</p>" +
          "</div>" +
        "</div>" +
        '<a href="posts.html?userId=' + userId + '" class="info-action" title="View User Posts"><i data-lucide="file-text" class="i7"></i></a>' +
      "</div>" +
      '<div class="grid-albums">';

  albums.forEach(function (a) {
    html +=
      '<a href="photos.html?albumId=' + a.id + '" class="card album">' +
        '<div class="album-left">' +
          '<div class="folder"><i data-lucide="folder" class="i5"></i></div>' +
          '<span class="album-title truncate">' + esc(a.title) + "</span>" +
        "</div>" +
        '<i data-lucide="chevron-right" class="i5 chev"></i>' +
      "</a>";
  });

  html += "</div></div>";
  $("#app").html(html);
  icons();
}

$(loadAlbums);
