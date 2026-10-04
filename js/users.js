function loadUsers() {
  showLoading();

  $.get(API + "/users")
    .done(function (users) {
      renderUsers(users);
    })
    .fail(function () {
      showError(
        "We couldn't load the users directory. Please try again.",
        loadUsers,
        "Retry Connection",
      );
    });
}

function renderUsers(users) {
  let html =
    '<div class="container">' +
    '<div class="page-head">' +
    '<h1 class="title">Users</h1>' +
    '<p class="subtitle">All fetched Users</p>' +
    "</div>" +
    '<ul class="grid-users">';

  users.forEach(function (u) {
    const n = splitName(u.name);

    html +=
      "<li>" +
      '<a href="user.html?userId=' +
      u.id +
      '" class="card user-card">' +
      '<h2 class="user-name truncate">' +
      esc(n.first) +
      " " +
      esc(n.last) +
      "</h2>" +
      "</a>" +
      "</li>";
  });

  html += "</ul></div>";

  $("#app").html(html);
}

$(loadUsers);
