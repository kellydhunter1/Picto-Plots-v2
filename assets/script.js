// api key for both sites
const pixKey = "17228303-ec297062a3db99e52d960db51";
const omdbKey = "da7317ce";
let plotUrl= "";
const btnEl = document.getElementById("btnEl");

// array of objects with information about movie
const moviesArr = [
    {title: "Mean Girls", plot: plotUrl, picWords: ["teen girl","group of barbies","besties","dating","mad"]},
    {title: "Harry Potter & Chamber of Secrets", plot: plotUrl, picWords: ["magic wand", "old diary", "petrified", "secret door", "black snake"]},
    {title: "Cast Away", plot: plotUrl, picWords: ["jetliner", "plane crash", "tropical island","man despair", "sea-rescue"]},
    {title: "Silver Linings Playbook", plot: plotUrl, picWords: ["punches", "medicine", "dinner date", "dance pair", "fall in love"]},
    {title: "Next Friday", plot: plotUrl, picWords: ["scary man", "run away", "suburbs", "scary men", "lots of cash"]},
    {title: "Pretty Woman", plot: plotUrl, picWords: ["Hollywood", " escort", "date nights", "love", "girlfriend"]},
    {title: "Vegas Vacation", plot: plotUrl, picWords: [ "family trip", "casinos", "empty pockets","expensive cars", "win money"]},
    {title: "Just Go With It", plot: plotUrl, picWords: ["male doctor", "cute girlfriend", "fake wedding ring", "Hawaiian vacation", "real husband and wife"]},
    {title: "Baby Boom", plot: plotUrl, picWords: ["business woman",  "crying baby", "confused", "country house", "applesauce"]},
    {title: "Alice in Wonderland", plot: plotUrl, picWords: ["rabbit hole", "magic","tea party", "slay dragon", "goodbye"]}
];

// Randomize Movie Array
function chooseMovie() {
    moviesArr.sort(function () {
        return 0.5 - Math.random();
    });
    console.log(moviesArr[0].title);
    getPix();
}

// Create buttons with each movie title in regular order
function createButtons() {
    moviesArr.forEach((movie) => {
        // create buttons
        const movieBtn = document.createElement("button");
        movieBtn.className = "col-lg-2 col-md-3 col-sm-5 btn text-white btn-primary shadow p-1 m-1 rounded";
        movieBtn.setAttribute("type", "button");
        movieBtn.textContent = movie.title;
        btnEl.appendChild(movieBtn);
    });
}

// uses OMDb to get plot of movie
function getDetails() {
    let movie = moviesArr[0].title;
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
}


// uses pix strings to search photos from pixabay
function getPix() {
    let pixArr = moviesArr[0].picWords;
    console.log(pixArr);
    for (let pic of pixArr) {
        // use API to get each picture described in array
        fetch(`https://pixabay.com/api/?key=${pixKey}&q=${pic}`)
            .then((response) => response.json())
            .then((data) => {
                // create containers for pictures
                const pixEl = document.getElementById("pixEl");
                const picImg = document.createElement("img");
                // set attributes for pictures
                // no idea why I can't use classname?
                picImg.setAttribute("class", "img-thumbnail shadow-none col");
                picImg.setAttribute("src", data.hits[0].previewURL);
                picImg.setAttribute("alt", pic);
                picImg.setAttribute("title", pic);
                pixEl.appendChild(picImg);
                // short pause so pix can stay in order
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        console.log(`next pic will append after ${pic}`);
                        resolve();
                    }, 5000);
                });
            })
            .catch((error) => console.error(error.message));
    }

}

// checks answer clicked
function checkAnswer(event) {
    let ansClick = event.target;
    console.log(ansClick);
    console.log(`${moviesArr[0].title} is in answer checker.`);
    ansClick.classList.remove("btn-primary");
    // if answer is correct turn button green
    if (ansClick.innerText == moviesArr[0].title) {
        ansClick.classList.add("btn-success");
        console.log("Right Answer!");
        getDetails();
    // if answer is wrong turn button red
    } else {
        ansClick.classList.add("btn-outline-danger");
        // blocks div from turning red
        btnEl.classList.remove("btn-outline-danger");
        console.log("Thats Wrong!");
    }
}
// called separately to keep movie buttons in same order every time
createButtons();
chooseMovie();

btnEl.addEventListener("click", checkAnswer); 