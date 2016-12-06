import React from 'react';
import $ from 'jquery';
import './jquery.hotkeys.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.synClick = this.synClick.bind(this);
    this.sel = '';
    this.clickWord = '';
  }

  componentDidMount() {
    this.hotkey();
    this.clickHandler();
    this.closeDropdown();
  }
  componentWillUnmount() {
    this.props.clearSynonyms();
  }
  hotkey() {
    $('body').bind('keydown', 'ctrl+a', ()=>{
      let dropdown = $('.upword-dropdown');
      dropdown.css('display','block');
    });
  }

  closeDropdown() {
    $('body').on('click', e => {
       var container = $(".upword-dropdown");
       if (!container.is(e.target) && container.has(e.target).length === 0) {
         $('.upword-dropdown').css('display', 'none');
         this.props.hideList();
         this.props.clearSynonyms();
       }
    });
  }

  clickHandler() {
     let that = this;
     $('body').dblclick(function(e) {
       that.selection = window.getSelection() || document.getSelection() || document.selection.createRange();
       if (that.selection.anchorNode !== null) {
         that.coords = that.selection.getRangeAt(0).getBoundingClientRect();
         that.word = $.trim(that.selection.toString());
       }
       console.log(that.selection);
       this.sel = that.selection.focusNode;
       if(that.word !== '') {
         // right now the word is highlighted
         // we use execCommand to "paste" an empty string to "remove it"
         this.clickWord = that.word.toLowerCase();
         chrome.storage.sync.get(this.clickWord, (synonyms) => {
           if (Object.keys(synonyms).length === 0) {
             that.props.fetchSynonyms(this.clickWord);
           } else {
             that.props.gotFromCache(synonyms[this.clickWord]);
           }
         });
       }
     }.bind(this));
   }


  synClick(e) {
    e.preventDefault();
    let text = e.target.innerText;
    // on click on the li it loses "focus" on the text input
    // this setTimeout function allows us to focus back into the element
    // inside the function we are inserting the text that was selected
    // setTimeout(function() {
    //   // this.sel.parentElement.focus();
    // }.bind(this), 0);
    console.log(this.sel.parentElement, "this is the parent element s");
    console.log("hi  ");
    // this.sel.parentElement.focus();
    // document.execCommand('delete');
    // document.execCommand('insertText', false , text);
    $('.upword-dropdown').css('display', 'none');
  }

  showSynonyms() {
    if (this.props.synonyms[0] == "No Results Found"){
      return <li>No Results Found</li>;
    } else {
      return(
        this.props.synonyms.slice(0,5).map((word, idx) => (
          <li key={idx} onClick={this.synClick}>{word}</li>
        ))
      );
    }
  }

  showList() {
    if (this.props.showList) {
      let dropdown = $('.upword-dropdown');
      let top = this.coords.top;
      let left = this.coords.left;
      dropdown.css('display','block');
      dropdown.css('top', `${top + window.pageYOffset + this.coords.height}px`);
      dropdown.css('left', `${left - 10}px`);
    }
  }

  render() {
    this.showList();
    return(
      <div className="upword-dropdown">
        {this.showSynonyms()}
        <a className="thesaurus-link" target="_blank"
           href={'http://www.thesaurus.com/browse/' + this.clickWord}>
           Other synonyms...
        </a>
      </div>
    );
  }
}

export default App;
