//INITIALIZE THE GAME BOARD ON PAGE LOAD
initCatRow()
createBoard()

document.querySelector('button').addEventListener('click',buildCategories)

//CREATE CATEGORY ROW

function initCatRow() {
    let catRow = document.getElementById('category-row')

    for (let i=0; i<6; i++) {
        let box = document.createElement('div')
        box.className = 'clue-box category-box'
        catRow.appendChild(box)
    }

}

//CREATE CLUE BOARD

function createBoard() {
    let board = document.getElementById('clue-board')

    //GENERATE 5 ROWS, THEN PLACE 6 BOXES IN EACH ROW

    for (let i = 0; i < 5; i++) {
        let row = document.createElement('div')
        let boxValue = '?';
        row.className = 'clue-row'

        for (let j=0; j<6; j++) {
            let box = document.createElement('div')
            box.className = 'clue-box'
            box.textContent = boxValue
            //box.appendChild( document.createTextNode(boxValue) ) //backwards compatible
            box.addEventListener('click',getClue, false)
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

//CALL API
const nums = [2,3,4,6,8,9,10,11,12,13,14,15,17,18];
function id() {
    return nums[Math.floor(Math.random() * nums.length)];
}

let catArray = []

function buildCategories () {


    if(!(document.getElementById('category-row').firstChild.innerText == '')) {
        resetBoard()
    }

    const fetchReq1 = fetch(
        `https://rithm-jeopardy.herokuapp.com/api/category?id=${nums[Math.floor(Math.random() * nums.length)]}`
    ).then((res) => res.json());

    const fetchReq2 = fetch(
        `https://rithm-jeopardy.herokuapp.com/api/category?id=${nums[Math.floor(Math.random() * nums.length)]}`
    ).then((res) => res.json());

    const fetchReq3 = fetch(
        `https://rithm-jeopardy.herokuapp.com/api/category?id=${nums[Math.floor(Math.random() * nums.length)]}`
    ).then((res) => res.json());

    const fetchReq4 = fetch(
        `https://rithm-jeopardy.herokuapp.com/api/category?id=${nums[Math.floor(Math.random() * nums.length)]}`
    ).then((res) => res.json());

    const fetchReq5 = fetch(
        `https://rithm-jeopardy.herokuapp.com/api/category?id=${nums[Math.floor(Math.random() * nums.length)]}`
    ).then((res) => res.json());

    const fetchReq6 = fetch(
        `https://rithm-jeopardy.herokuapp.com/api/category?id=${nums[Math.floor(Math.random() * nums.length)]}`
    ).then((res) => res.json());

    const allData = Promise.all([fetchReq1,fetchReq2,fetchReq3,fetchReq4,fetchReq5,fetchReq6])

    allData.then((res) => {
        console.log(res)
        catArray = res
        setCategories(catArray)
    })

}

//RESET BOARD AND $$ AMOUNT IF NEEDED

function resetBoard() {
    let clueParent = document.getElementById('clue-board')
    while (clueParent.firstChild) {
        clueParent.removeChild(clueParent.firstChild)
    }
    let catParent = document.getElementById('category-row')
    while (catParent.firstChild) {
        catParent.removeChild(catParent.firstChild)
    }
    document.getElementById('score').innerText = 0
    createBoard()
    initCatRow()
}

//LOAD CATEGORIES TO THE BOARD

function setCategories (catArray) {
    let element = document.getElementById('category-row')
        let children = element.children;
        for(let i=0; i<children.length; i++) {
            children[i].innerHTML = catArray[i].title
        }
}

//FIGURE OUT WHICH ITEM WAS CLICKED

function getClue (event) {
    let child = event.currentTarget
    child.classList.add('clicked-box')
    let boxValue = child.innerHTML.slice(1)
    let parent = child.parentNode
    let index = Array.prototype.findIndex.call(parent.children, (c) => c === child)
    let cluesList = catArray[index].clues
    let clue = cluesList.find(obj => {
        return obj.value == boxValue
    })
    console.log(clue)
    showQuestion(clue, child, boxValue)
}

//SHOW QUESTION TO USER AND GET THEIR ANSWER!

function showQuestion(clue, target) {
    let userAnswer = prompt(clue.question).toLowerCase()
    let correctAnswer = clue.answer.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "")
    target.innerHTML = clue.answer
    target.removeEventListener('click',getClue,false)
}

