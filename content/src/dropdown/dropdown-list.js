import createSynonymsList from './synonyms/synonym-list'

const createList = (field, partOfSpeech, definitions) => {
    let partOfSpeechList = document.createElement('div')
    partOfSpeechList.setAttribute('id', `${partOfSpeech}-list`)
    partOfSpeechList.setAttribute('class', `part-of-speech-list`)
    // partOfSpeechList.style.width = 100 + "px";
    // partOfSpeechList.style.width = 25 + "px";
    for (let i = 0; i < definitions.length; i++) {
        let currDef = definitions[i]
        let definitionLine = document.createElement('div')
        definitionLine.setAttribute('class', 'definition-line')
        definitionLine.innerHTML = i + 1 + '. ' + currDef.definition
        // definitionLine.addEventListener('mouseover', function () {
        //     let activeList = document.getElementsByClassName('synonyms-container active')[0]
        //     if (activeList) {
        //         activeList.classList.remove('active')
        //     }
        //     this.childNodes[0].classList.add('active')
        // })
        let synonymsList = createSynonymsList(field, currDef.synonyms)
        definitionLine.appendChild(synonymsList)

        partOfSpeechList.appendChild(definitionLine)
    }
    return partOfSpeechList
}

export default createList
