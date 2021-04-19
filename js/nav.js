"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $("#nav-story-submit").show();
}

function navSubmitStoryClick(){
  console.debug("navSubmitStoryClick");
  hidePageComponents();
  $storyForm.show();
}

$("#nav-story-submit").on("click", navSubmitStoryClick);

function navViewFavoritesClick(){
  console.debug("navViewFavorites");
  hidePageComponents();
  $favStoriesList.show()
}

$("#nav-favorites").on("click", )
