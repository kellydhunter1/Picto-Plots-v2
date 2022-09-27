// api key for both sites
const pixKey = "17228303-ec297062a3db99e52d960db51";
const omdbKey = "da7317ce";
let plotUrl= "";

// array of objects with information about movie
const moviesArr = [
    {title: "Mean Girls", plot: plotUrl, pix: ["teen girl","group of barbies","besties","dating","mad"]},
    // {title: "", plot: plotUrl, pix: []},
    // {title: "", plot: plotUrl, pix: []},
    // {title: "", plot: plotUrl, pix: []},
    // {title: "", plot: plotUrl, pix: []},
    // {title: "", plot: plotUrl, pix: []},
    // {title: "", plot: plotUrl, pix: []},
    // {title: "", plot: plotUrl, pix: []},
    // {title: "", plot: plotUrl, pix: []},
    {title: "Alice in Wonderland", plot: plotUrl, pix: ["rabbit hole", "tea party", "magic", "slay dragon", "goodbye"]}
];

// Changes order of movies in the array
const chooseMovie = function() {
    moviesArr.sort(function(){
    return 0.5 - Math.random()
})
};

// uses OMDb to get plot of movie, currently defaulted to mean girls
const findPlot = function() { 
    chooseMovie();
    let movie = moviesArr[0].title;
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movie}&plot=short`)
    .then((response) => response.json())
    .then((data) => console.log(data.Plot))
    .then(plotPix())
    .catch((error) => console.error(error.message));
};
// uses pix strings to search photos from pixabay
const plotPix = function() {
    let pics = moviesArr[0].pix;
    for (let i =0; i<pics.length; i++) {
        fetch(`https://pixabay.com/api/?key=${pixKey}&q=${pics[i]}`)
        .then((response) => response.json())
        .then((data) => console.log(data.hits[0].previewURL))
        .catch((error) => console.error(error.message));
    }
};




findPlot();


