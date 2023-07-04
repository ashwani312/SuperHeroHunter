// this is for getting the superhero from localstorage
const getFaviorite = () =>{
    let favHeros;
    if(localStorage.getItem('favioriteHero') === null){
        favHeros = [];
    }else{
        favHeros = JSON.parse(localStorage.getItem("favioriteHero"));
    }
    return favHeros;
}


let favioriteHeros = getFaviorite(); //this is checking the superhero existing
let favioriteList = document.querySelector(".favList");  //Html tag selector
let favListHead = document.querySelector(".favListHead"); //Html tag selector


// this is for showing hte results in HTML
const showFavioriteHeroList = () =>{
          favioriteHeros.map((ele, i)=>{
            console.log(ele);
            showList(ele)
          })

        //  THis is for  fetching the data using superhero element
       async function showList(ele){
            const URL = `https://gateway.marvel.com:443/v1/public/characters/${ele}?ts=20230223&apikey=6975c12f0f2ae6702c6d26349ef557fc&hash=0fb6598929d1b35a0704e51b09eaacdc`;
            const characters = await fetch(URL);
            const result = await characters.json();
            const data = result.data.results[0];
            console.log(data);
            displayTheList(data);
          }

          //THis is for display the result in HTML
          function displayTheList (data) {
               let li = document.createElement('li');
               li.innerHTML = `
                   <img src = ${data.thumbnail.path +"."+ data.thumbnail.extension} />
                   <h3>${data.name}</h3>                 
               `;
               favioriteList.appendChild(li)

               const removeButton = document.createElement("button");
               removeButton.id = data.id;
               removeButton.addEventListener('click', removeFromTheFav);
               removeButton.innerText = 'Remove';
               li.appendChild(removeButton);

          }           
}

// THis tell us about empty list
if(favioriteHeros.length === 0){
    favListHead.innerHTML = 'Your List is Empty';
}else{
    showFavioriteHeroList();
}


// This function remove from the favourite list
function removeFromTheFav(e){
        let id = e.target.id;
       const faviorites = getFaviorite();
       const newFavs = faviorites.filter((ele)=>{
        return ele != id;
       })
       localStorage.setItem('favioriteHero', JSON.stringify(newFavs));
       location.reload()
}


