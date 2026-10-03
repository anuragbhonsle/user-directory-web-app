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
    html +=
      "<li>" +
      '<a href="posts.html?userId=' +
      u.id +
      '" class="card user-card">' +
      '<div class="user-top">' +
      '<div class="avatar">' +
      esc(getInitials(u.name)) +
      "</div>" +
      '<div style="min-width:0;flex:1">' +
      '<h2 class="user-name truncate">' +
      esc(u.name) +
      "</h2>" +
      '<p class="user-handle truncate">@' +
      esc(u.username) +
      "</p>" +
      "</div>" +
      "</div>" +
      '<div class="user-info">' +
      '<div><i data-lucide="mail" class="i4"></i><span class="truncate">' +
      esc(u.email.toLowerCase()) +
      "</span></div>" +
      '<div><i data-lucide="phone" class="i4"></i><span class="truncate">' +
      esc(u.phone.split(" ")[0]) +
      "</span></div>" +
      '<div><i data-lucide="globe" class="i4"></i><span class="truncate">' +
      esc(u.website) +
      "</span></div>" +
      '<div class="top"><i data-lucide="map-pin" class="i4" style="margin-top:2px"></i>' +
      '<span class="clamp2">' +
      esc(u.address.street + ", " + u.address.suite + ", " + u.address.city) +
      "</span></div>" +
      "</div>" +
      "</a>" +
      "</li>";
  });

  html += "</ul></div>";
  $("#app").html(html);
  icons();
}

$(loadUsers);
