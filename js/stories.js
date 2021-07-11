"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
let favStoryIds = [];

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */


function getFavoritesIds(favStoryIds){
  if(currentUser){
    for(let favStory of currentUser.favorites){
      favStoryIds.push(favStory.storyId);
    }
  }
}

function generateStoryMarkup(story) {
  //console.debug("generateStoryMarkup", story);
  const hostName = story.getHostName();
  const favStoryIds = [];
  getFavoritesIds(favStoryIds);
  if(currentUser && favStoryIds.includes(story.storyId)){
    return $(`
    <li id="${story.storyId}">
      <i class="fas fa-star"></i>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);
  }
  else if(currentUser){
    return $(`
    <li id="${story.storyId}">
      <i class="far fa-star"></i>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);
  }
  else{
    return $(`
    <li id="${story.storyId}">
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);
  }
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();
  $favStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putFavoritesOnPage(){
  console.debug("putFavoritesOnPage");

  $allStoriesList.empty();
  $favStoriesList.empty();

  for(let story of currentUser.favorites){
    const $story = generateStoryMarkup(story);
    $favStoriesList.append($story);
  }

  $favStoriesList.show();
}

async function submitNewStory(evt){
  console.debug("submitStory");

  evt.preventDefault();

  const title = $("#submit-story-title").val();
  const author = $("#submit-story-author").val();
  const url = $("#submit-story-url").val();
  const storyInfo = {title, author, url};

  await storyList.addStory(storyInfo);
  storyList = await StoryList.getStories();
  putStoriesOnPage();
}

$submitStoryForm.on("submit", submitNewStory)

$('.stories-list').on("click", "li i", async function(evt){
  evt.preventDefault();
  const id = $(evt.target).parent().attr("id");
  const favStoryIds = [];
  getFavoritesIds(favStoryIds);
  if(favStoryIds.includes(id)){
    $(evt.target).attr("class", "far fa-star");
    await currentUser.deleteFavorite(id);
  }
  else{
    $(evt.target).attr("class", "fas fa-star");
    await currentUser.addFavorite(id);
  }
  storyList = await StoryList.getStories();
  if($favStoriesList[0].childElementCount !== 0){
    putFavoritesOnPage();
  }
  else{
    putStoriesOnPage();
  }

  //This is a hack, but I'm not sure how to get the app to change the color of the favorite stars entirely without a forced refresh.
  location.reload();
})
