//  Get the superHero and fetch them using api
const heroDetails = async (id) => {
   const searchChar = window.location.search;
   const urlParams = new URLSearchParams(searchChar);
   const hero = urlParams.get('character')
   id = hero;
   const URL = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`;
   const response = await fetch(URL);
   const data = await response.json();
   const result = data.data.results;
   console.log(result);
   displayTheHeroDetails(result)
}

// display the superhero on Html or Webpage
const displayTheHeroDetails = (result) => {
   const allData = result[0];
   let heroName = document.getElementById("heroName");
   heroName.innerHTML = allData.name;
   let heroImage = document.getElementById("heroImage");
   heroImage.src = `${allData.thumbnail.path + "." + allData.thumbnail.extension}`;


   //description
   const description = document.getElementById("desc");
   description.innerHTML = allData.description;


   //series
   const series = document.getElementById("series");
   const seriesDataArray = allData.series.items;
   seriesDataArray.map((ele, i) => {
      const p = document.createElement('p');
      p.innerHTML = ele.name;
      series.appendChild(p);
   })

   //comics
   const comics = document.querySelector(".comics");
   const comicsDataArray = allData.comics.items;
   comicsDataArray.map((ele, i) => {
      const p = document.createElement('p');
      p.innerHTML = ele.name;
      comics.appendChild(p);
   })

   //stories
   const stories = document.querySelector(".stories");
   const storiesDataArray = allData.stories.items;
   storiesDataArray.map((ele, i) => {
      const p = document.createElement('p');
      p.innerHTML = ele.name;
      stories.appendChild(p);
   })


}

heroDetails();