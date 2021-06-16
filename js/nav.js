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
  $navStorySubmit.show();
  $navFavorites.show();
  $loginForm.hide();
  $signupForm.hide();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navSubmitClick(){
  console.debug("navSubmitClick");
  hidePageComponents();
  $storySubmitForm.show();
}

$navStorySubmit.on("click", navSubmitClick);

function navFavoritesClick(){
  console.debug("navFavoritesClick");
  hidePageComponents();
  putFavoritesOnPage();
  $favoriteStoriesList.show();
}

$navFavorites.on("click", navFavoritesClick);
