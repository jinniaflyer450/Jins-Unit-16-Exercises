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
  //Got Font Awesome icons from here: https://fontawesome.com/icons/star?style=solid, https://fontawesome.com/icons/star?style=regular
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
    </li>`)
  }
  else if(currentUser.favorites.indexOf(story) !== -1){
    return $(`
    <li id="${story.storyId}">
    <span class = "icon-container clicked">
      <i class="far fa-star favorite-button favorite-button-inactive"></i>
      <i class="fas fa-star favorite-button favorite-button-active"></i>
    </span>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);}
  else{
    return $(`
      <li id="${story.storyId}">
        <span class = "icon-container unclicked">
          <i class="far fa-star favorite-button favorite-button-inactive"></i>
          <i class="fas fa-star favorite-button favorite-button-active"></i>
        </span>
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
  $favStoriesList.empty();
  for(let story of currentUser.favorites){
    const $story = generateStoryMarkup(story);
    $favStoriesList.append($story);
  }
  $favStoriesList.show()
}

async function submitStoryForm(e){
  e.preventDefault();
  const $storyTitle = $("#story-title").val();
  const $storyAuthor = $("#story-author").val();
  const $storyURL = $("#story-url").val();
  const $newStory = {"title": $storyTitle, "author": $storyAuthor, "url": $storyURL};
  let story = await storyList.addStory(currentUser, $newStory);
  console.debug("submitNewStory")
  return story;
}

$storyForm.on("submit", submitStoryForm)


//Got help on the parent selector from here: https://api.jquery.com/parent/#parent-selector
//Got help on toggling classes here: https://api.jquery.com/toggleclass/
function updateFavorites(e){
  $(e.target).parent().toggleClass('clicked');
  $(e.target).parent().toggleClass('unclicked');
  const favoriteStoryId = $(e.target).parent().parent().attr('id')
  for(let story of storyList.stories){
    if(story.storyId === favoriteStoryId){
      currentUser.toggleFavoriteStory(story);
    }
  }
  if($(e.target).parent().parent().parent().attr('id') === 'favorite-stories-list'){
    putFavoritesOnPage()
  }
}

$('ol').on('click', '.favorite-button', updateFavorites)