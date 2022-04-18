console.log('Jquery Loaded')

const MOVIES = [];

let movieRating = $('.movieRating');
let ratingDisplay = $('.ratingDisplay');
ratingDisplay.append(movieRating.get(0).value / 10) 

const nameList = $('.nameList');
const ratingList = $('.ratingList');

let sortType = $('#type');

movieRating.change(function(){
  ratingDisplay.empty();
  ratingDisplay.append(movieRating.get(0).value / 10)  
})


$('body').on('submit', function(e){
  e.preventDefault();
  let title = $('.movieName').get(0).value;
  if (title.length < 2) {
    throw new Error('not enough characters')
  }  
  let rating = $('.movieRating').get(0).value / 10;
  const movie = {};
  movie['title'] = title;
  movie['rating'] = rating;
  MOVIES.push(movie);
  sort();
})


$('body').on('click', function(e){
if (e.target.tagName === 'LI') {
  removeMovie(e);
  removeMovieHTML(e);
}
if (e.target.className === 'sort') {
  sort(); 
}
}) 

function removeMovie(e) {
  for (let i=0;i<MOVIES.length; i++) {
    if (MOVIES[i]['title'] === e.target.innerText) {
      MOVIES.splice(i,1);
      nameList.children()[i].remove();
      ratingList.children()[i].remove();
    }
  }
}

function removeMovieHTML(e) {
  for (let i=0;i<MOVIES.length; i++) {
    if (MOVIES[i]['title'] === e.target.innerText) {
      nameList.children()[i].remove();
      ratingList.children()[i].remove();
    }
  }
}

function sort() {

  if (sortType.val() === 'a-z') {
    MOVIES.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1);
    clear()
  }

  else if (sortType.val() === 'z-a') {
    MOVIES.sort((a,b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : -1);
    clear()
  }

  else if (sortType.val() === 'lowestRated') {
    MOVIES.sort((a,b) => (a.rating > b.rating) ? 1 : -1);
    clear();
  }

  else if (sortType.val() === 'highestRated') {
    MOVIES.sort((a,b) => (a.rating < b.rating) ? 1 : -1);
    nameList.empty();
    ratingList.empty();
  }
  
    for (let movie of MOVIES) {
      nameList.append(`<li>${movie['title']}</li>`);
      ratingList.append(`<li>${movie['rating']}</li>`);
    }
}

function clear() {
  nameList.empty();
  ratingList.empty();
}