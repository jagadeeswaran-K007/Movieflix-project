// ==========================
// GET MOVIE ID FROM URL
// ==========================

const params = new URLSearchParams(window.location.search);
const movieID = params.get("id");


// ==========================
// FETCH MOVIE DETAILS
// ==========================

fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`)

    .then(response => response.json())

    .then(data => {

        // Movie Title
        document.getElementById("movie-title").innerText =
            data.title;


        // Movie Poster
        document.getElementById("movie-poster").src =
            `https://image.tmdb.org/t/p/w500${data.poster_path}`;


        // Match Percentage
        const matchPercentage =
            Math.round(data.vote_average * 10);

        document.getElementById("movie-match").innerText =
            `${matchPercentage}% Match`;


        // IMDb Rating + Stars
        document.getElementById("movie-rating").innerHTML =
            `IMDb Rating : ${data.vote_average.toFixed(1)}
             &nbsp; ${getStars(data.vote_average)}`;


        // Release Date
        document.getElementById("movie-release").innerText =
            `Release Date : ${data.release_date}`;


        // Runtime
        document.getElementById("movie-runtime").innerText =
            `Runtime : ${convertRuntime(data.runtime)}`;


        // Language
        document.getElementById("movie-language").innerText =
            `Language : ${data.original_language.toUpperCase()}`;


        // Genres
        const genres = data.genres
            .map(genre => genre.name)
            .join(" • ");

        document.getElementById("movie-genres").innerText =
            `Genres : ${genres}`;


        // Adult / Family Friendly
        document.getElementById("movie-adult").innerText =
            data.adult ? "18+ Adult" : "Family Friendly";


        // Overview
        document.getElementById("movie-overview").innerText =
            data.overview;

    })

    .catch(error => {

        console.log("Error fetching movie details:", error);

    });




// ==========================
// STAR RATING FUNCTION
// ==========================

function getStars(rating) {

    const starCount = Math.round(rating / 2);

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= starCount) {

            stars += "★";

        }

        else {

            stars += "☆";

        }

    }

    return stars;

}



// ==========================
// CONVERT RUNTIME
// ==========================

function convertRuntime(minutes) {

    const hours = Math.floor(minutes / 60);

    const mins = minutes % 60;

    return `${hours}h ${mins}m`;

}


document.getElementById("trailer-btn")

.addEventListener("click", () => {

    fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}`
    )

    .then(response => response.json())

    .then(data => {

        // Look for an official YouTube trailer first
        let trailer = data.results.find(video =>

            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true

        );

        // If no official trailer is found,
        // use any available YouTube trailer.
        if (!trailer) {

            trailer = data.results.find(video =>

                video.site === "YouTube" &&
                video.type === "Trailer"

            );

        }


        if (trailer) {

            window.location.href =
                `https://www.youtube.com/watch?v=${trailer.key}`;

        }

        else {

            alert("Trailer not available.");

        }

    });

});

// ==========================
// CLOSE TRAILER MODAL
// ==========================

document.querySelector(".close-trailer")

    .addEventListener("click", () => {

        document.querySelector(".trailer-modal").style.display =
            "none";


        document.getElementById("trailer-frame").src = "";

    });




// ==========================
// MY LIST BUTTON
// ==========================

document.getElementById("my-list-btn")

    .addEventListener("click", () => {

        let myList = JSON.parse(
            localStorage.getItem("MyList")
        ) || [];


        if (!myList.includes(movieID)) {

            myList.push(movieID);

            localStorage.setItem(
                "MyList",
                JSON.stringify(myList)
            );

            alert("Movie added to My List!");

        }

        else {

            alert("Movie already exists in My List!");

        }

    });




// ==========================
// SHARE BUTTON
// ==========================

// Open Share Modal

document.getElementById("share-btn")

.addEventListener("click",()=>{

    document.querySelector(".share-modal")

    .style.display = "flex";

});

document.querySelector(".close-share")

.addEventListener("click",()=>{

    document.querySelector(".share-modal")

    .style.display = "none";

});

document.getElementById("whatsapp-btn")

.addEventListener("click",()=>{

    window.open(

        `https://wa.me/?text=${window.location.href}`,

        "_blank"

    );

});

document.getElementById("telegram-btn")

.addEventListener("click",()=>{

    window.open(

        `https://t.me/share/url?url=${window.location.href}`,

        "_blank"

    );

});

document.getElementById("gmail-btn")

.addEventListener("click",()=>{

    window.open(

        `mailto:?subject=Netflix Movie&body=${window.location.href}`

    );

});

document.getElementById("facebook-btn")

.addEventListener("click",()=>{

    window.open(

        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,

        "_blank"

    );

});

document.getElementById("copy-btn")

.addEventListener("click",()=>{

    navigator.clipboard.writeText(

        window.location.href

    );

    alert("Movie link copied successfully!");

});
