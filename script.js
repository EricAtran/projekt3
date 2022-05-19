//search
let searchText = document.getElementById("txtSearch");

searchText.onkeydown = async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    //söker grejerna
    let searchTerm = searchText.value;
    console.log("Kommer söka efter", searchTerm);

    //väntar
    let results = await search(searchTerm);

    //resultat
    renderResults(results);

    searchTerm = "";
  }
};

async function search(searchString) {
  let apiKey = "1a08c634ec1bc9d64558c15c3e88cdbf";
  var url = `https://api.themoviedb.org/3/search/movie?query=${searchString}&api_key=${apiKey}`;
  console.log("Den URL vi kommer anropa: ", url);

  let response = await fetch(url);

  let json = await response.json();
  return json;
}

function renderResults(res) {
  let resultDiv = document.getElementById("searchresults"); //Hämtar ut diven med id="searchresults" för att lägga in resultatet där

  console.log(resultDiv.innerHTML);
  resultDiv.innerHTML = "";

  console.log(res);

  let allObjects = res.results;

  allObjects.forEach(function (movie) {
    console.log(movie);
    let html = `<div class="item" >
      <h3 class="movietitle">${movie.title} </br>${movie.vote_average}/10</h3>
      <img id="poster" src="https://image.tmdb.org/t/p/w154${movie.poster_path}">
    </div>`;

    resultDiv.insertAdjacentHTML("beforeend", html);
  });
}
