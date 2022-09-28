// api key for both sites
const pixKey = "17228303-ec297062a3db99e52d960db51";
const omdbKey = "da7317ce";
let plotUrl= "";


// array of objects with information about movie
const moviesArr = [
    {title: "Mean Girls", plot: plotUrl, picWords: ["teen girl","group of barbies","besties","dating","mad"]},
    {title: "Hamilton", plot: plotUrl, picWords: []},
    {title: "Sing", plot: plotUrl, picWords: []},
    {title: "Silver Linings Playbook", plot: plotUrl, picWords: []},
    {title: "Next Friday", plot: plotUrl, picWords: []},
    {title: "Pretty Woman", plot: plotUrl, picWords: []},
    {title: "Vegas Vacation", plot: plotUrl, picWords: []},
    {title: "LulaRich", plot: plotUrl, picWords: []},
    {title: "Baby Boom", plot: plotUrl, picWords: []},
    {title: "Alice in Wonderland", plot: plotUrl, picWords: ["rabbit hole", "magic","tea party", "slay dragon", "goodbye"]}
];
const btnEl = document.getElementById("btnEl");



// Randomize Movie Array
const chooseMovie = function() {
    moviesArr.sort(function(){
        return 0.5 - Math.random()
    }) 
    console.log(moviesArr[0].title)
    getPix();

};

// Create buttons with each movie title in regular order
const createButtons = function() {
    moviesArr.forEach((movie) => {
        // create buttons
        const movieBtn = document.createElement("button");
        movieBtn.className = "col-lg-2 col-md-3 col-sm-mx btn btn-secondary";
        movieBtn.setAttribute("type", "button");
        movieBtn.textContent = movie.title;
        // create container for buttons
        // const btnDiv = document.createElement("div");
        // btnDiv.className = "col col-lg-4"
        // put buttons in container and on the page
        // btnDiv.appendChild(movieBtn);
        // btnEl.appendChild(btnDiv);
        btnEl.appendChild(movieBtn);
    })
};

// uses OMDb to get plot of movie, currently defaulted to mean girls
const getDetails= function() { 
let movie= moviesArr[0].title;
const titleEl = document.getElementById("movie-title");
titleEl.innerText = movie;
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${omdbKey}&t=${movie}&plot=short`)
    .then((response) => response.json())
    .then((data) => {
        const plotEl = document.getElementById("movie-plot");
        plotEl.innerText = data.Plot;
        console.log(data.Plot);
        


        
        
    })
    .catch((error) => console.error(error.message));
};


// uses pix strings to search photos from pixabay
const getPix = function() {
    let pixArr = moviesArr[0].picWords;
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
                    }, 5000);
                  })
            })                
            .catch((error) => console.error(error.message));
            }

};

const checkAnswer = function(event) {
    let ansClick = event.target;
    console.log(ansClick);
    console.log(`${moviesArr[0].title} is in answer checker.`)
    ansClick.classList.remove("btn-secondary");
    if (ansClick.innerText == moviesArr[0].title) {
        ansClick.classList.add("btn-success");
        
        console.log("Right Answer!");
        getDetails();
    } else {
        ansClick.classList.add("btn-outline-danger");
        btnEl.classList.remove("btn-outline-danger");
        console.log("Thats Wrong!");
    }
}
createButtons();
chooseMovie();


btnEl.addEventListener("click", checkAnswer); 