import { mutationObserver } from './mutation-observer'
import {getWord} from './listener';

console.log('JavaScript successfully injected')
mutationObserver()

const anchor = document.createElement('div')
anchor.id = 'upword-anchor'
document.body.insertBefore(anchor, document.body.childNodes[0])

const link = document.createElement('link')
link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Catamaran')
link.setAttribute('rel', 'stylesheet')
document.head.appendChild(link)
