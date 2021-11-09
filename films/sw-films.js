import { films } from '../data/films.js'
import { getLastNumber } from "./utils/index.js";

let filmList = document.querySelector('#filmlist')

for (let i = 0; i < films.length; i++) {
    let figure = document.createElement('figure')
    let figImg = document.createElement('img')
    figImg.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
    let figCaption = document.createElement('figcaption')
    figCaption.textContent = films[i].title

    
    const foundFilm = films.find(film => {
        const convertedString = parseInt(getLastNumber(film.url), 10)
        return convertedString === (i + 1)
    })

    console.log(foundFilm)

    figCaption.textContent = foundFilm.title

    filmList.appendChild(myImg)
    figure.appendChild(figCaption)
    filmList.appendChild(figure)
}