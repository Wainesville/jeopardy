const game = document.getElementById("game");
const body = document.getElementById("body");
const nums = [2,3,4,6,8,9,10,11,12,13,14,15,17,18]
let categories = [];


// setting startbutton and link to reset button to the DOM
function startGame(){
    const start = document.createElement('button');
    start.classList.add('start');
    start.innerText = "Start Game"
    body.appendChild(start)
    start.addEventListener('click', loadingPage);
    start.addEventListener('click', test);

    function test() {
        start.parentNode.removeChild(start);
        const test = document.createElement('button');
        test.classList.add('start');
        test.innerText="Play Again";
        body.append(test);
        test.addEventListener('click',restartGame);
    };

};

startGame();

function restartGame(){
    game.innerHTML = '';
    categories = [];
    loadingPage();
    getCats()
}


// build and fire off spinner and div 'loading' screen
function loadingPage(){

  const loading = document.createElement('div');
  loading.classList.add('loading');
  body.append(loading)

  setTimeout(function()
    {
        loading.style.opacity = 0;
        setTimeout(function()
    {loading.style.display="none"},1000);
    },1000
  );
  
  getCats();

}

// function to shuffle an array randomly

function shuffle(array) {
    let currentIndex = array.length;
 
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }


//   selecting random numbers from array of catagories
function getCats(){
    game.innerHTML='';
   shuffle(nums);
   const cats = nums.slice(0,6);
 for (let i =0; i<cats.length; i++){
   const cat = cats[i];
    getCategoryIds(cat);
}   


} 


// using random number from array to pull data from API, then uses that data
async function getCategoryIds(id) {
   
    const url = `https://rithm-jeopardy.herokuapp.com/api/category?id=${id}`; 
    const res = await fetch(url);
    const data = await res.json();
    function getQuestions(){
        
    let obj ={
        title : (data.title),
        clue: (data.clues),
    }

    console.log();
    categories.push(obj);
   }

    getQuestions();
    
//    using data to create the game board and fill attributes with game data
    function addCategory(categories){
        
        const column = document.createElement('div');
        column.classList.add('genre-column');

        const genreTitle = document.createElement('div');
        genreTitle.classList.add('genre-title');
        genreTitle.innerText = categories.title.toUpperCase();

        column.appendChild(genreTitle);
        game.append(column);

        categories.clue.forEach(nums =>{
            const card = document.createElement('div');
            card.classList.add('card');
            column.append(card);
            card.innerHTML = "?";
                    
            card.setAttribute('data-question', nums.question);

            card.setAttribute('data-answer', nums.answer);

            card.addEventListener('click', flipCard)
        });
   
}
    if( categories.length === 6 ){
    categories.forEach(category => addCategory(category))
    }

    
    
}


// action for showing hidding question
function flipCard(){
           this.innerHTML = '';
           this.style.fontSize = "15px";
           this.style.lineHeight = "15px";


           const textDisplay = document.createElement('div');
           this.classList.add('question-card')
           textDisplay.classList.add('card-text');
           textDisplay.innerHTML = this.getAttribute('data-question');
           this.append(textDisplay);
           this.addEventListener('click', answerCard)
}
// action for showing hidden answer
function answerCard(){
    this.innerHTML = '';
    this.style.fontSize = '15px';
    this.style.lineHeight = '15px';
    this.style.backgroundColor = "green";
    const textDisplay = document.createElement('div');
    textDisplay.classList.add('card-text');
    textDisplay.innerHTML = this.getAttribute('data-answer');
    this.append(textDisplay);
  
}






    

  


      

   

    


    



   