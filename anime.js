var base_url = 'https://api.jikan.moe/v3';


searchAnime = (event) => {

  event.preventDefault();

  const form = new FormData(document.getElementById('search_form'));

  const query = form.get('search');

  fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res => res.json())
    .then(updateDom)
    .catch(err => console.warn(err.message));
}


updateDom = (data) => {

  const searchResults = document.getElementById('search-results');


  const animeByCategories = data.results
    .reduce((acc, cur) => {
      const { type } = cur;
      if (acc[type] === undefined) acc[type] = [];
      acc[type].push(cur);
      return acc;
    }, {});

  searchResults.innerHTML = Object.keys(animeByCategories)
    .map(key => {
      const animesHTML = animeByCategories[key]
        .sort((a, b) => a.episodes - b.episodes)
        .map(anime => {
          return `
              <div class="card">
                <div class="card-image">
                  <img src="${anime.image_url}">
                  </div>
                <div class="card-content">
                  <span class="card-title">${anime.title}</span>
                  <p>${anime.synopsis}</p>
                </div>
                <div class="card-action">
                  <a href="${anime.url}">Find out more</a>
                </div>
              </div>
            `;
        }).join("");
      return `
        <section>
          <h3>${key.toUpperCase()}</h3>
          <div class="row style-row">${animesHTML}</div>
        
        </section>
      `;
    }).join("");
}

pageLoaded = () => {
  const form = document.getElementById('search_form');
  form.addEventListener('submit', searchAnime);
}







window.addEventListener("load", pageLoaded);