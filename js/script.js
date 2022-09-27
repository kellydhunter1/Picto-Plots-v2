// api key for both sites
const pixKey = "17228303-ec297062a3db99e52d960db51";
const omdbKey = "da7317ce";
let plotUrl= "";

// array of objects with information about movie
const moviesArr = [
    {title: "Mean Girls", plot: plotUrl, picWords: ["teen girl","group of barbies","besties","dating","mad"]},
    // {title: "", plot: plotUrl, picWords: []},
    // {title: "", plot: plotUrl, picWords: []},
    // {title: "", plot: plotUrl, picWords: []},
    // {title: "", plot: plotUrl, picWords: []},
    // {title: "", plot: plotUrl, picWords: []},
    // {title: "", plot: plotUrl, picWords: []},
    // {title: "", plot: plotUrl, picWords: []},
    // {title: "", plot: plotUrl, picWords: []},
    {title: "Alice in Wonderland", plot: plotUrl, picWords: ["rabbit hole", "magic","tea party", "slay dragon", "goodbye"]}
];

// Create buttons with each movie title in regular order
const createBtns = function() {
    moviesArr.forEach((movie) => {
        const btnEl = document.getElementById("btnEl");
        const movieBtn = document.createElement("button");
        movieBtn.className = "btn btn-secondary";
        movieBtn.setAttribute("type", "button");
        movieBtn.textContent = movie.title;
        btnEl.appendChild(movieBtn);
    })
}

// Randomize Movie Array
const chooseMovie = function() {
    moviesArr.sort(function(){
    return 0.5 - Math.random()
}) 
    console.log(moviesArr[0]);
};

// uses OMDb to get plot of movie, currently defaulted to mean girls
const findPlot = function() { 
    chooseMovie();
    let movie = moviesArr[0].title;
    console.log(movie);
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movie}&plot=short`)
    .then((response) => response.json())
    .then((data) => console.log(data.Plot))
    .then(getPix())
    .catch((error) => console.error(error.message));
};
// uses pix strings to search photos from pixabay
const getPix = function() {
    let pixArr = moviesArr[0].picWords;        
    let idCounter = 0;
    console.log(pixArr);
    for(let pic of pixArr) {
            // use API to get each picture described in array
            fetch(`https://pixabay.com/api/?key=${pixKey}&q=${pic}`)
            .then((response) => response.json())
            .then((data) => {
                // create containers for pictures
                const pixEl = document.getElementById("pixEl");
                const picImg = document.createElement("img");

                // set attributes for pictures
                picImg.setAttribute("class", "img-thumbnail col");
                picImg.setAttribute("src", data.hits[0].previewURL);
                picImg.setAttribute("alt", pic);
                picImg.setAttribute("title", pic);
                pixEl.appendChild(picImg);
                // short pause so pix can stay in order
                return new Promise(function(resolve){
                    setTimeout(function() {
                       console.log(`next pic will append after ${pic}`);
                       resolve();
                    }, 4000);
                  })
            })                
            .catch((error) => console.error(error.message));

            }
    



};




createBtns();
findPlot();


