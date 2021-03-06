// *** All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const check = document.getElementById('filter')
const winOrLose = document.getElementById('winOrLose')
const congrats = document.getElementById('congrats')
const playAgain = document.getElementById('playAgain')

// Array with all the characters, as objects
const CHARACTERS = [{
    name: 'Jabala',
    img: 'images/jabala.svg',
    hairColor: 'hidden',
    eyeColor: 'hidden',
    glasses: true,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hairColor: 'hidden',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hairColor: 'grey',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoker: true,
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hairColor: 'yellow',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hairColor: 'black',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hairColor: 'yellow',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hairColor: 'purple',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoker: true,
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hairColor: 'brown',
    eyeColor: 'blue',
    glasses: true,
    hat: true,
    smoker: true,
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: true,
    smoker: true,
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hairColor: 'white',
    eyeColor: 'hidden',
    glasses: false,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hairColor: 'hidden',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoker: false,
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hairColor: 'black',
    eyeColor: 'blue',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hairColor: 'yellow',
    eyeColor: 'hidden',
    glasses: true,
    hat: true,
    smoker: false,
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hairColor: 'grey',
    eyeColor: 'brown',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hairColor: 'yellow',
    eyeColor: 'green',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hairColor: 'black',
    eyeColor: 'green',
    glasses: false,
    hat: false,
    smoker: false,
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: true,
    hat: true,
    smoker: false,
  },
]

// Global variables
let secret, currentQuestion, charactersInPlay, secretValue, countClicks

// Draws the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button" class="small" id='guess-who' onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}

// Sets the secret person
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
}

// Starts the game, sets characters in play, sets secret person
// generates the board and sets the click counter to 0
const start = () => {
  charactersInPlay = CHARACTERS
  setSecret()
  generateBoard()
  countClicks = 0;
}

// Compares your question with the secret person
// and stores the value in currentQuestion
const selectQuestion = (selected) => {
  const category = questions.options[questions.selectedIndex].parentNode.label
  if (category === 'other') {
    currentQuestion = {
      attribute: 'smoker',
      value: true,
      category: category,
    }
  } else if (category === 'hair color') {
    currentQuestion = {
      attribute: 'hairColor',
      value: selected,
      category: category,
    }
  } else if (category === 'eye color') {
    currentQuestion = {
      attribute: 'eyeColor',
      value: selected,
      category: category,
    }
  } else if (category === 'accessories') {
    if (selected === 'hat') {
      currentQuestion = {
        attribute: 'hat',
        value: true,
        category: category,
      }
    } else if (selected === 'glasses') {
      currentQuestion = {
        attribute: 'glasses',
        value: true,
        category: category,
      }
    }
  }
}

// Checks if your guess matches the secret person
const checkQuestion = () => {
  const secretValue = secret[currentQuestion.attribute]
  if (secretValue === currentQuestion.value) {
    filterCharacters(true)
  } else {
    filterCharacters(false)
  }
}

// Filters charachters depending on your guess and redraws the board
const filterCharacters = (keep) => {
  const value = currentQuestion.value;
  const attribute = currentQuestion.attribute;

  if (attribute === 'glasses') {
    if (keep) {
      alert(
        `Yes, the person wears ${attribute}! Keep all that wears ${attribute}.`)
    } else {
      alert(
        `No, the person doesn't wear ${attribute}! Remove all that wears ${attribute}.`)
    }
  } else if (attribute === 'hat') {
    if (keep) {
      alert(
        `Yes, the person wears a ${attribute}! Keep all that wears a ${attribute}.`)
    } else {
      alert(
        `No, the person doesn't wear a ${attribute}! Remove all that wears a ${attribute}.`)
    }
  } else if (attribute === 'smoker') {
    if (keep) {
      alert(
        `Yes, the person is a ${attribute}! Keep all that are ${attribute}s.`)
    } else {
      alert(
        `No, the person isn't a ${attribute}! Remove all that are ${attribute}s.`)
    }
  } else if (attribute === 'hairColor') {
    if (keep) {
      alert(
        `Yes, the person has ${value} hair! Keep all that have ${value} hair.`)
    } else {
      alert(
        `No, the person doesn't have ${value} hair! Remove all that have ${value} hair.`)
    }
  } else if (attribute === 'eyeColor') {
    if (keep) {
      alert(
        `Yes, the person has ${value} eyes! Keep all that have ${value} eyes.`)
    } else {
      alert(
        `No, the person doesn't have ${value} eyes! Remove all that have ${value} eyes.`)
    }
  }

  if (keep) {
    charactersInPlay = charactersInPlay.filter((person) => person[attribute] === value);
  } else {
    charactersInPlay = charactersInPlay.filter((person) => person[attribute] !== value);
  }
  generateBoard()
}

// Lets you guess on who you think the secret person is
const guess = (suspect) => {
  let confirm = window.confirm(
    `Do you want to guess that ${suspect} is the secret person?`)
  if (confirm) {
    checkMyGuess(suspect);
  } else {
    alert(
      `Then keep on playing!`)
  }
}

// Displays a message if you have won or lost
const checkMyGuess = (suspect) => {
  if (suspect === secret.name) {
    alert(`Yes, ${suspect} is the secret person!`);
    board.innerHTML = 'display: none;'
    winOrLose.style = 'display: block;'
    congrats.innerHTML += `
    <h1>Congratulations!</h1>
    <p>You managed to Guess Who! It was ${secret.name} and it took you ${countClicks} moves <span style>&#9996;</span></p>
    <img src="${secret.img}" alt="${secret.name}">
        <p>Wanna play again?</p>
    ` 
  } else {
    alert(`No, ${suspect} is not the secret person!`);
    board.innerHTML = 'display: none;'
    winOrLose.style = 'display: block;'
    congrats.innerHTML += `
        <p>Too bad, wanna play again?</p>
    ` 
  }
}

// Invokes the start function when website is loaded
start()

// *** All the event listeners

// Changes the scroll list value BEFORE pushing the Find Out button
questions.addEventListener('change', () => {
  selectQuestion(questions.value)
})

// Find Out button that invokes the checkQuestion function + counter thar adds nr of clicks you did to guess
check.addEventListener('click', () => {
  checkQuestion(currentQuestion)
  countClicks += 1;
})

// Restart button
restartButton.addEventListener('click', start)

// Play again button
playAgain.addEventListener('click', () => {
  congrats.innerHTML = '';
  winOrLose.style = 'display: none;'
  start()
})