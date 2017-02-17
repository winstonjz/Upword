import createList from './dropdown-list';

const createDropdownTabsAndInfo = (dropdownContainer, wordInfo) => {
    let dropdownButtons = document.createElement('div');
    dropdownButtons.setAttribute('class', 'pos-buttons');
    let first = 0;
    for (let partOfSpeech in wordInfo) {
        if (partOfSpeech !== 'word') {
            let partOfSpeechButton = document.createElement('div');
            partOfSpeechButton.innerHTML = partOfSpeech;
            partOfSpeechButton.setAttribute('id', `${partOfSpeech}-button`);
            partOfSpeechButton.setAttribute('class', 'pos-button');
            if (first === 0) {
                partOfSpeechButton.classList.add('active');
                first++;
            }
            dropdownButtons.appendChild(partOfSpeechButton);
            partOfSpeechButton.addEventListener('click', function() {
                let activeButton = document.getElementsByClassName('pos-button active')[0];
                if (activeButton) {
                    activeButton.classList.remove('active');
                }
                this.classList.add('active');
            });
            let list = createList(partOfSpeech, wordInfo[partOfSpeech]);
            // upwordDropdown.appendChild(list);
        }
    }
    return dropdownButtons;
}

export default createDropdownTabsAndInfo;