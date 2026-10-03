const userId = getParam("userId");

function loadPosts() {
  showLoading();
  $.when(
    $.get(API + "/posts?userId=" + userId),
    $.get(API + "/users/" + userId)
  )
    .done(function (postsRes, userRes) {
      renderPosts(postsRes[0], userRes[0]);
    })
    .fail(function () {
      showError("We couldn't load the posts. Please try again.", loadPosts, "Retry");
    });
}

function renderPosts(posts, user) {
  let html =
    '<div class="container narrow">' +
      '<a href="index.html" class="back-link"><i data-lucide="arrow-left" class="i4"></i> Back to Directory</a>' +
      '<div class="info-header">' +
        '<div class="info-left">' +
          '<div class="info-icon"><i data-lucide="user" class="i6"></i></div>' +
          "<div>" +
            '<h1 class="info-title">' + esc(user.name) + "</h1>" +
            '<p class="info-sub">@' + esc(user.username) + " • " + posts.length + " Posts</p>" +
          "</div>" +
        "</div>" +
        '<a href="albums.html?userId=' + userId + '" class="info-action" title="View User Albums"><i data-lucide="album" class="i7"></i></a>' +
      "</div>" +
      '<div class="posts">';

  posts.forEach(function (p) {
    html +=
      '<article class="card post">' +
        '<div class="post-id"><i data-lucide="file-text" class="i4"></i> Post #' + p.id + "</div>" +
        "<h2>" + esc(p.title) + "</h2>" +
        "<p>" + esc(p.body) + "</p>" +
      "</article>";
  });

  html += "</div></div>";
  $("#app").html(html);
  icons();
}

$(loadPosts);
