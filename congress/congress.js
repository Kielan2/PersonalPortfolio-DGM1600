import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";

const members = [...senators, ...representatives]

const senatorDiv = document.querySelector('.senators')
const loyaltyHeading = document.querySelector('.mostLoyal')
const seniorityHeading = document.querySelector('.seniority')
const youngestHeading = document.querySelector('.youngest')


function SimplifiedMembers(chamberFilter) {
    const filteredArray = members.filter(member => chamberFilter ? member.short_title === chamberFilter : member)
     
    return filteredArray.map(senator => {
        let middle_name = senator.middle_name ? ` ${senator.middle_name} ` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middle_name}${senator.last_name}`,
            party: senator.party,
            gender: senator.gender,
            seniority: +senator.seniority,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
        }
    })
}

function populateSenatorDiv(simpleSenators) {
    simpleSenators.forEach(senator => {
        const senFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })
}

const filterSenators = (prop, value) => SimplifiedMembers().filter(senator => senator[prop] === value)

const mostSeniorMember = SimplifiedMembers().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)

seniorityHeading.textContent = `The most senior member of Congress is ${mostSeniorMember.name} who has been in congress for ${mostSeniorMember.seniority} years.`

const youngestMember = SimplifiedMembers().reduce((acc, senator) => acc.seniority < senator.seniority ? acc : senator)

youngestHeading.textContent = `The newest member of Congress is ${youngestMember.name} who has been in congress for ${youngestMember.seniority} years.`

const mostLoyal = SimplifiedMembers().reduce((acc, senator) => {
    if (senator.loyaltyPct === 100) {
        acc.push(senator)
    }
    return acc
}, [])

const cowardList = document.createElement('ol')

const spineless = mostLoyal.map(coward => {
    let listItem = document.createElement('li')
    listItem.textContent = `${coward.name} has always voted ${coward.party}`
    cowardList.appendChild(listItem)
})

loyaltyHeading.appendChild(cowardList)

populateSenatorDiv(SimplifiedMembers())