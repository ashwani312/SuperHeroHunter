let inputBox = document.querySelector('.inputBox'); //this is a main input box
let favBtn = document.querySelector('.favbtn'); //this is a favbutton
let cards = document.querySelector(".cards"); //this is a api result parent element
let homeCards = document.querySelector(".samplecards"); //this is a static home page tag


//in this function i am fetching the data throw Marvel API
async function main(name) {
    const URL = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=20230630&apikey=2d172186a131ed1e520f951cbb3e89dd&hash=130fc5064abc1cbf9ee5062247834d1d`
    let response = await fetch(URL);
    let dataOfUrl = await response.json()
    showData(dataOfUrl.data.results);
}

// in this function i am showing my data in HTML tag
const showData = (result) => {
    cards.innerHTML = "";
    result.map((ele, i) => {
        // console.log(ele);
        let div = document.createElement('div');
        div.classList = "card"
        div.dataset.id = result[i].id;
        div.innerHTML = `
                        <div class="content">
                   <img src = "${ele.thumbnail.path + '.' + ele.thumbnail.extension}" alt='image' >
                   <h4>${ele.name}</h4> 
                   </div>
                   <div class="buttons">
                   <button class="favorite" onclick="addToFaviorite(${result[i].id})">AddFav</button>

                   <a href = ${"details/heroDetails.html?character=" + result[i].id}><button class='know'>KnowMore</button></a>
                   
                   </div>
                    `;
        cards.appendChild(div);
    })
}

//This function only executes when the inputbox changing
const showHeros = () => {
    let searchItem = (inputBox.value).trim();
    if (searchItem.length > 0) {
        main(searchItem)
        cards.classList.remove('hide');
    } else {
        cards.classList.add('hide');
    }
}

//this is for bluring the backround
inputBox.addEventListener("click", (e) => {
    homeCards.classList.add("blur")
    if (inputBox.value.length > 0) {
        main(inputBox.value)
    }
})

//this is for removing the SuperHeroresults
window.addEventListener("click", (e) => {
    if (e.target.className === 'header' || e.target.tagName === 'BODY') {
        homeCards.classList.remove("blur");
        cards.innerHTML = '';
    }
})


//THis is for adding the superhero in localStorage
const addToFaviorite = async (ele) => {
    const URL = `https://gateway.marvel.com:443/v1/public/characters/${ele}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`;
    const characters = await fetch(URL);
    const result = await characters.json();
    const data = result.data.results[0];
    let id = data.id;
    let faviorite = getFaviorite();
    if (!faviorite.includes(id)) {
        faviorite.push(id);
    }
    localStorage.setItem("favioriteHero", JSON.stringify(faviorite))
}


//this is for getting the superhero from localstorage
const getFaviorite = () => {
    let faviorite;
    if (localStorage.getItem('favioriteHero') === null) {
        faviorite = [];
    } else {
        faviorite = JSON.parse(localStorage.getItem('favioriteHero'));
    }
    return faviorite;
}



//-----------Homepage superheros---------------static page--------


let source = [
    {
        src: "https://cdn.pixabay.com/photo/2015/11/14/21/31/ironman-1043700_1280.jpg",
        name: "Ironman"
    },
    {
        src: "https://c4.wallpaperflare.com/wallpaper/168/856/47/captain-america-chris-evans-captain-america-the-first-avenger-wallpaper-preview.jpg",
        name: "Captain America"
    },
    {
        src: "https://c4.wallpaperflare.com/wallpaper/731/574/513/movie-thor-ragnarok-thor-wallpaper-preview.jpg",
        name: "Thor"
    },
    {
        src: "https://c4.wallpaperflare.com/wallpaper/997/794/382/miles-morales-spiderman-miles-morales-spider-man-peter-parker-spider-gwen-hd-wallpaper-preview.jpg",
        name: "SpiderMan"
    },
    {
        src: "https://c4.wallpaperflare.com/wallpaper/287/620/954/hulk-avengers-age-of-ultron-the-avengers-wallpaper-preview.jpg",
        name: "Hulk"
    },
    {
        src: "https://c4.wallpaperflare.com/wallpaper/300/375/733/movie-justice-league-henry-cavill-superman-hd-wallpaper-preview.jpg",
        name: "SuperHero"
    },
    {
        src: "https://c4.wallpaperflare.com/wallpaper/507/505/234/black-widow-scarlett-johansson-avengers-age-of-ultron-wallpaper-preview.jpg",
        name: "Black Widow"
    },
    {
        src: "https://c4.wallpaperflare.com/wallpaper/456/908/43/the-dark-knight-rises-batman-movies-wallpaper-preview.jpg",
        name: "BatMan"
    }
]

window.addEventListener('load', () => {
    source.map((ele, i) => {
        let sampleCard = document.createElement("div");
        sampleCard.classList.add("samplecard")
        sampleCard.innerHTML = `
              <img src=${ele.src} alt='image'>
              <h3>${ele.name}</h3>
        `;
        homeCards.appendChild(sampleCard);
    })
})

