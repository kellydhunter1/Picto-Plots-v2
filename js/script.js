// api key for both sites
const pixKey = "17228303-ec297062a3db99e52d960db51";
const omdbKey = "da7317ce"; 

// uses OMDb to get plot of movie, currently defaulted to mean girls
const findPlot = function() {
    let movieUrl = "https://www.omdbapi.com/?i=tt3896198&apikey=" + omdbKey +"&t=mean+girls&plot=short"; 
    fetch(movieUrl)
    .then((response) => response.json())
    .then((data) => console.log(data.Plot))
    .catch((error) => console.error(error.message));
};
// uses Pixabay to get photos of words in the plot
const plotPix = function() {
    let pixUrl = "https://pixabay.com/api/?key=" + pixKey + "&q=girl";
    fetch(pixUrl)
    .then((response) => response.json())
    .then((data) => console.log(data.hits[0].previewURL))
    .catch((error) => console.error(error.message));
};


findPlot();
plotPix();


