const userId = getParam("userId");

function loadUser() {
  showLoading();

  $.when(
    $.get(API + "/users/" + userId),
    $.get(API + "/posts?userId=" + userId),
    $.get(API + "/albums?userId=" + userId),
  )
    .done(function (userRes, postsRes, albumsRes) {
      renderUser(userRes[0], postsRes[0], albumsRes[0]);
    })
    .fail(function () {
      showError(
        "We couldn't load the posts and albums. Please try again.",
        loadUser,
        "Retry",
      );
    });
}

function renderUser(user, posts, albums) {
  const n = splitName(user.name);

  let html =
    '<div class="container">' +
    '<a href="index.html" class="back-link">← Back to Directory</a>' +
    '<div class="info-header">' +
    '<div class="info-left">' +
    "<div>" +
    '<h1 class="info-title">' +
    esc(n.first) +
    " " +
    esc(n.last) +
    "</h1>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="split">' +
    "<section>" +
    '<h2 class="section-title">Posts</h2>' +
    '<div class="posts">';

  posts.forEach(function (p) {
    html +=
      '<article class="card post">' +
      "<h3>" +
      esc(p.title) +
      "</h3>" +
      "<p>" +
      esc(p.body) +
      "</p>" +
      "</article>";
  });

  html +=
    "</div>" +
    "</section>" +
    "<section>" +
    '<h2 class="section-title">Albums</h2>' +
    '<ul class="albums">';

  albums.forEach(function (a) {
    html +=
      '<li class="album">' +
      '<span class="album-title">' +
      esc(a.title) +
      "</span>" +
      "</li>";
  });

  html += "</ul>" + "</section>" + "</div>" + "</div>";

  $("#app").html(html);
}

$(loadUser);
