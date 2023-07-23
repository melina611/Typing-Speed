function timer() {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    wordsBox(ctx)
    ctx.strokeStyle = "black"
    ctx.strokeStyle = "orange"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(110, 80, 70, 0, Math.PI * 2, true)
    ctx.fillStyle = "black"
    ctx.font = "50px serif"
    ctx.fillText(time, 80, 80)
    ctx.font = "30px serif"
    ctx.textAlign = "left"
    ctx.fillText("seconds", 60, 100)
    ctx.stroke()
    ctx.strokeRect(300, 20, 100, 100)
    ctx.font = "25px serif"
    ctx.fillText("words/min", 300, 150)
    ctx.font = "50px serif"
    ctx.fillText(wordsMinute, 310, 90)
}

let arrayOfWords = ["airplane", "brother", "coffee", "diamond", "elephant", "family", "garden", "hamster", "island", "jungle", "kitten",
    "lemon", "monkey", "notebook", "ostrich", "pepper", "quality", "rabbit", "sunflower", "tulip", "unicorn", "violin", "watermelon",
    "xylophone", "yogurt", "zebra", "apartment", "balloon", "chocolate", "dolphin", "electricity", "firework", "grandmother", "hurricane",
    "important", "jacket", "knowledge", "laptop", "mountain", "neighborhood", "orange", "pizza", "quiet", "rainbow", "subway", "telephone",
    "umbrella", "vegetable", "waterfall", "love", "yacht", "zeppelin", "antelope", "butterfly", "caterpillar", "dandelion",
    "savarine", "flamingo", "gorilla", "hedgehog", "iguana", "jellyfish", "koala", "llama", "mosquito", "nightingale", "octopus",
    "penguin", "quail", "raccoon", "starfish", "turtle", "horse", "vulture", "walrus", "picture", "yak", "happiness", "astronaut",
    "bookshelf", "calendar", "dragonfly", "electrician", "firefighter", "geography", "haircut", "information", "jewelry", "kangaroo",
    "library", "mushroom", "nutrition", "ocean", "photography", "questionnaire", "recycling", "sunshine", "television", "university",
    "vegetarian", "window", "curtain", "youth", "zealot", "ambulance", "backpack", "camera", "dictionary", "donut",
    "flashlight", "guitar", "hospital", "internet", "jacket", "kitchen", "lightning", "microwave", "needle", "orchestra", "pillow",
    "quotation", "raincoat", "snowman", "toilet", "rubber", "vacation", "wheelchair", "dragon", "yoga", "zucchini", "alphabet",
    "birthday", "candle", "doctor", "eggplant", "fireplace", "giraffe", "hamburger", "invisible", "journal", "kangaroo", "leopard",
    "microphone", "notebook", "oceanography", "piano", "quarantine", "rainforest", "seashell", "telephone", "temperature",
    "valentine", "waterfall", "deer", "yesterday", "zealot", "astronomy", "backpack", "calendar", "dinosaur", "fly",
    "football", "gardenia", "hairbrush", "information", "jigsaw", "kiwi", "limousine", "motorcycle", "notebook", "ocean",
    "penguin", "quilting", "railroad", "spaghetti", "telephone", "sand", "volcano", "watermelon", "mouse", "yacht",
    "zookeeper", "consensus", "consequence", "conservative", "consider", "considerable", "consideration", "consist", "consistent", "constant",
    "constantly", "constitute", "constitutional", "construct", "construction", "consultant",
    , "labor", "laboratory", "lack", "lady", "lake", "land", "landscape", "language", "lap", "large", "largely", "last", "late", "later", "latin", "latter", "laugh"
    , "launch"]


function wordsBox(ctx) {
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(300, 225)
    ctx.lineTo(300, 290)
    ctx.stroke()
    ctx.lineWidth = 4
    ctx.strokeRect(0, 210, 800, 100)
    theRandomWords()
}

let mixTheWords = arrayOfWords.sort(() => Math.random() - 0.5)
let randomWord = ""

function jumbledWords() {
    for (let i = 0; i < mixTheWords.length; ++i) {
        randomWord += mixTheWords[i] + " "
    }
    timer()
}

function theRandomWords() {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    ctx.fillStyle = "black"
    for (let i = 0; i < randomWord.length; ++i) {
        ctx.fillStyle = "black"
        if (keyWord[i] == 1) {
            ctx.fillStyle = "green"
        } else if (keyWord[i] == 2) {
            ctx.fillStyle = "red"
        }
        ctx.font = "40px courier"
        ctx.textAlign = "left"
        if (randomWord[i] == " " && keyWord[i] == 2) {
            ctx.fillText("*", (300 + i * 20) - repositionText, 260)
        } else {
            ctx.fillText(randomWord[i], (300 + i * 20) - repositionText, 270)
        }
    }
}

let time = 60
let wordsMinute = 0

function decreaseTime() {
    --time
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    timer()
    if (time == 0) {
        clearInterval(stopWatch)
        endGameMenu()
        document.removeEventListener("keydown", keyDownHandler, false)
    }
}

let theGreenLetters = true

function numberOfWordsPerMinute() {
    wordsMinute = 0
    for (let i = 0; i < positionOfTheCharacters; ++i) {
        if (keyWord[i] == 2) {
            theGreenLetters = false
        }
        if (randomWord[i] == " " && theGreenLetters == true) {
            ++wordsMinute
        } else if (randomWord[i] == " " && theGreenLetters == false) {
            theGreenLetters = true
        }
    }
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    ctx.clearRect(300, 20, 90, 90)
    ctx.strokeRect(300, 20, 90, 90)
    ctx.font = "45px serif"
    ctx.fillText(wordsMinute, 310, 80)
}

document.addEventListener("keydown", keyDownHandler, false)

let repositionText = 0, positionOfTheCharacters = 0
let startTime = true
let stopWatch
let keyWord = new Array(50)

function keyDownHandler(event) {
    let ctx = document.getElementById("canvas").getContext("2d")
    if (event.key === randomWord[positionOfTheCharacters]) {
        keyWord[positionOfTheCharacters] = 1
        ++positionOfTheCharacters
        repositionText += 20
    } else if (event.keyCode === 8 && positionOfTheCharacters != 0) {
        --positionOfTheCharacters
        theGreenLetters = true
        numberOfWordsPerMinute()
        keyWord[positionOfTheCharacters] = 0
        repositionText -= 20
    } else if (event.keyCode !== 8) {
        theGreenLetters = false
        keyWord[positionOfTheCharacters] = 2
        ++positionOfTheCharacters
        repositionText += 20
    }
    if (randomWord[positionOfTheCharacters - 1] == " ") {
        numberOfWordsPerMinute()
    }
    if (startTime) {
        stopWatch = setInterval(decreaseTime, 1000)
        startTime = false
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    timer()
}

let menuBoxX = 250
let menuBoxY = 50
let menuBoxWidth = 400
let menuBoxHeight = 300

let restartBoxX = 330
let restartBoxY = 240
let restartBoxWidth = 250
let restartBoxHeight = 80

let restartX = 380
let restartY = 300

function endGameMenu() {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    ctx.fillStyle = "orange"
    ctx.fillRect(menuBoxX, menuBoxY, menuBoxWidth, menuBoxHeight)
    ctx.fillStyle = "white"
    ctx.font = "40px serif"
    ctx.fillText("Words per minute:" + wordsMinute, 270, 120)
    ctx.fillStyle = "white"
    ctx.fillRect(restartBoxX, restartBoxY, restartBoxWidth, restartBoxHeight)
    ctx.fillStyle = "black"
    ctx.font = "50px serif"
    ctx.fillText("Restart", restartX, restartY)
    canvas.addEventListener("click", restartTheGame, true)
}

function restartTheGame(event) {
    let ctx = document.getElementById("canvas").getContext("2d")
    let elemLeft = canvas.offsetLeft,
        elemTop = canvas.offsetTop
    let x = event.pageX - elemLeft,
        y = event.pageY - elemTop
    if (x >= restartBoxX && x <= restartBoxX + restartBoxWidth && y >= restartBoxY && y <= restartBoxY + restartBoxHeight) {
        wordsMinute = 0
        time = 60
        clearInterval(stopWatch)
        stopWatch = null
        repositionText = 0 
        positionOfTheCharacters = 0
        theGreenLetters = true
        startTime = true
        keyWord = new Array(50)
        document.addEventListener("keydown", keyDownHandler, false)
        mixTheWords = arrayOfWords.sort(() => Math.random() - 0.5)
        randomWord = ""
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        jumbledWords()
        canvas.removeEventListener("click", restartTheGame, true)
    }
}


window.onload = jumbledWords