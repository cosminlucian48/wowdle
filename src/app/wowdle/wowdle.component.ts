import { Component, HostListener, OnInit } from '@angular/core';

//length of the word
const WORD_LENGTH = 5;

//number of tries
const NUM_TRIES = 6;

//list of letters
const LETTERS = (() => {
  //letter -> true
  const ret: { [key: string]: boolean } = {};
  for (let charCode = 97; charCode < 97 + 26; charCode++) {
    ret[String.fromCharCode(charCode)] = true;
  }
  console.log(ret);
  return ret;
})();

interface Try {
  letters: Letter[];
}

interface Letter {
  text: string;
  state: LetterState;
}

enum LetterState {
  WRONG,
  // letter in word but wrong position
  PARTIAL_MATCH,
  // letter and position are correct
  FULL_MATCH,
  // before the current try is submited
  PENDING,
}

@Component({
  selector: 'wowdle',
  templateUrl: './wowdle.component.html',
  styleUrls: ['./wowdle.component.scss']
})
export class WowdleComponent implements OnInit {
  //Stores all tries
  //One try is one row in the UI  
  readonly tries: Try[] = [];

  //letter index
  private currentLetterIndex = 0;

  //tracks the number of submited tries
  private numSubmittedTries = 0;

  constructor() {
    //Populate initial state of 'tries'
    for (let i = 0; i < NUM_TRIES; i++) {
      const letters: Letter[] = [];
      for (let j = 0; j < WORD_LENGTH; j++) {
        letters.push({ text: ' ', state: LetterState.PENDING });
      }
      this.tries.push({ letters });
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.handleClickKey(event.key);
  }

  private handleClickKey(key: string) {
    //check if key is a letter + update text
    if (LETTERS[key.toLowerCase()]) {
      if (this, this.currentLetterIndex < (this.numSubmittedTries + 1) * WORD_LENGTH) {
        this.setLetter(key);
        this.currentLetterIndex++;
      }
    }
  }

  private setLetter(letter: string) {
    const tryIndex = Math.floor(this.currentLetterIndex / WORD_LENGTH);
    const letterIndex = this.currentLetterIndex - tryIndex * WORD_LENGTH;
    this.tries[tryIndex].letters[letterIndex].text = letter;
  }

  ngOnInit(): void {
  }

}
