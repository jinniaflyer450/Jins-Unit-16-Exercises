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

function navSubmitStoryClick(evt){
  console.debug("navSubmitStoryClick", evt);
  hidePageComponents();
  $submitStoryForm.show();
}

$navSubmitStory.on("click", navSubmitStoryClick);

function navFavoritesClick(evt){
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoritesOnPage();
}

$navFavorites.on("click", navFavoritesClick);

function navUserProfileClick(evt){
  console.debug("navUserProfileClick", evt);
  hidePageComponents();
  putOwnStoriesOnPage();
}

$navUserProfile.on("click", navUserProfileClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navFavorites.show();
  $navSubmitStory.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
