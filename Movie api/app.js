const form = document.querySelector(".src-cont");
const input = document.querySelector(".movie-inp");
const display = document.querySelector(".display");
const SearchElement = document.querySelector(".search-element");

const apiKey = "fb1807ff";
let slide = 0;

const slider = () => {
  slide++;
  if (slide > 5) {
    slide = 0;
  }
  SearchElement.style.backgroundImage = `url('./images/image${slide}.jpeg')`;
};

setInterval(() => {
  slider();
}, 3000);
slider();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  display.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`
    );
    const data = await res.json();

    if (data.Response === "True") {
      display.innerHTML = data.Search.map(
        (movie) => `
        <div class="movie-card">
          <img src="${
            movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"
          }" alt="${movie.Title}" />
          <div class="movie-title">${movie.Title}</div>
        </div>
      `
      ).join("");
    } else {
      display.innerHTML = `<p>No results found for "${query}"</p>`;
    }
  } catch (err) {
    display.innerHTML = `<p>No internet connection</p>`;
    console.error(err);
  }
});
