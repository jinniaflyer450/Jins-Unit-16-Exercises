"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

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

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  if(!currentUser){
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
  else if(currentUser.favorites.includes(story)){
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
  else{
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
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putFavoritesOnPage(){
  console.debug("putFavoritesOnPage");

  $favoriteStoriesList.empty();

  for(let story of currentUser.favorites){
    const $story = generateStoryMarkup(story);
    $favoriteStoriesList.append($story);
  }

  $favoriteStoriesList.show();
}


function refreshStoryLists(){
  if($favoriteStoriesList.attr('style') !== 'display: none;'){
    putFavoritesOnPage();
  }
  else if($allStoriesList.attr('style') !== 'display: none;'){
    putStoriesOnPage();
  }
}
function toggleFavoriteOnPage(id){
  console.debug("toggleFavoriteOnPage");
  currentUser.toggleFavorite(currentUser, id);
  refreshStoryLists();
}

async function submitStory(){
  console.debug("submitStory");
  const title = $("#story-submit-title").val();
  const author = $("#story-submit-author").val();
  const url = $("#story-submit-url").val();
  const newStory = {title, author, url};
  await storyList.addStory(currentUser, newStory);
  storyList = await StoryList.getStories();
  putStoriesOnPage();
}

$("#story-submission-form").on("submit", function(e){
  e.preventDefault();
  submitStory();
});

$('.stories-list').on("click", 'li i', function(){
  console.log('Clicked!');
})

$('navbar a').on("click", function(e){
  e.preventDefault();
  refreshStoryLists();
})
