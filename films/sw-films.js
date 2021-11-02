import { films } from '../data/films.js'

let filmList = document.querySelector('#filmlist')

for (let i = 0; i < films.length; i++) {
    let figure = document.createElement('figure')
    let myImg = document.createElement('img')
    myImg.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
    let figCaption = document.createElement('figcaption')
    figCaption.textContent = films[i].title

    filmList.appendChild(myImg)
    figure.appendChild(figCaption)
    filmList.appendChild(figure)
}