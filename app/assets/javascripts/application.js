// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require_tree .

$(function() {
  $("#login").click(function() {
    $.ajax({
      type: "POST",
      url: "/users/sign_in",
      data: JSON.stringify({ user : { email: $("#email").val(), password: $("#password").val() } }),
      dataType: "json",
      contentType: "application/json"
    }).done(function(data) {
      $("#response").html(JSON.stringify(data));
      window.userEmail = $("#email").val();
      window.userToken = data.authentication_token;
    }).fail(function(jqXHR) {
      $("#response").html(jqXHR.responseText);
    });
  });

  $("#logout").click(function() {
    $.ajax({
      type: "DELETE",
      url: "/users/sign_out",
      headers: {
        "X-USER-EMAIL": window.userEmail,
        "X-USER-TOKEN": window.userToken
      }
    }).done(function(data) {
      $("#response").html(JSON.stringify(data));
      window.userEmail = null;
      window.userToken = null;
    });
  });

  $("#get-posts").click(function() {
    $.ajax({
      type: "GET",
      url: "/posts",
      headers: {
        "X-USER-EMAIL": window.userEmail,
        "X-USER-TOKEN": window.userToken
      }
    }).done(function(data) {
      $("#response").html(JSON.stringify(data));
    }).fail(function(jqXHR) {
      $("#response").html(jqXHR.responseText);
    });
  });
});
