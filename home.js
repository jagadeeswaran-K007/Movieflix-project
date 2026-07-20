// Fetch Movies Function

function fetchMovies(url, id) {

    fetch(url)

        .then(response => response.json())

        .then(data => {

            const container = document.getElementById(id);

            container.innerHTML = "";

            data.results.forEach(movie => {

                // Skip movies without posters
                if (!movie.poster_path) return;


                container.innerHTML += `

                <a href="moviedescription.html?id=${movie.id}" class="movie-link">

                    <div class="movie-card">

                        <img
                        src="${IMAGE_URL}${movie.poster_path}"
                        alt="${movie.title}">

                        <h3>${movie.title}</h3>

                    </div>

                </a>

                `;

            });

        })

        .catch(error => {

            console.log("Error :", error);

        });

}



// ====================================
// FETCH ALL MOVIE SECTIONS
// ====================================

fetchMovies(TRENDING_MOVIES, "trending");

fetchMovies(POPULAR_MOVIES, "popular");

fetchMovies(TOP_RATED_MOVIES, "toprated");

fetchMovies(ACTION_MOVIES, "action");



// ====================================
// DEBUGGING PURPOSE
// ====================================

console.log("Trending API URL:");

console.log(TRENDING_MOVIES);


fetch(TRENDING_MOVIES)

.then(response => response.json())

.then(data => {

    console.log("Trending Movies Data:");

    console.log(data);

})

.catch(error => {

    console.log(error);

});

const hero = document.querySelector(".hero");

const banners = [

    "images/bannner1.jpg",
    "images/banner2.jpg",
    "images/banner3.jpg",
    "images/banner4.jpg",
    "images/banner5.jpg"

];

let index = 0;

function changeBanner(){

    hero.style.backgroundImage =
    `url(${banners[index]})`;

    index++;

    if(index === banners.length){
        index = 0;
    }

}

changeBanner();

setInterval(changeBanner,2000);


const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-btn");


// Open Menu

hamburger.addEventListener("click", () => {

    mobileMenu.classList.add("active");

});


// Close Menu

closeBtn.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

});

