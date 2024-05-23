const game = document.getElementById("game");
const nums = [2,3,4,6,8,9,10,11,12,13,14,15,17,18]
const categories = [];
const qArray = [];


function startGame(){
    const start = document.createElement('button');
    start.classList.add('start');
    start.innerText = "Start Game"
    game.append(start)

    start.addEventListener('click', fillBoard);
}

startGame();





async function getCategoryIds(id) {
    const url = `https://rithm-jeopardy.herokuapp.com/api/category?id=${id}`; 
    const res = await fetch(url);
    const data = await res.json();
    function getQuestions(){
       qArray.push(data.clues);
        
    let obj ={
        title : (data.title),
        clue: (data.clues),
        question: (qArray),
        showing: null
    }
    console.log(data.clues)
    categories.push(obj);


    

    }

    getQuestions();
    // const qArray = JSON.stringify(data.clues)

    

    
    function addCategory(categories){
        const column = document.createElement('div');
        column.classList.add('genre-column');

        const genreTitle = document.createElement('div');
        genreTitle.classList.add('genre-title');
        genreTitle.innerText = categories.title.toUpperCase();

        column.appendChild(genreTitle);
        game.append(column);
    
        data.clues.forEach(question =>{
            const card = document.createElement('div');
            card.classList.add('card');
            column.append(card);

           
            card.innerHTML = "?";
            console.log(data.clues[0]);

                if(data.clues === data.clues){
                    card.setAttribute('data-question', question.question);
                    card.setAttribute('data-answer', question.answer);
                }
                else{
                    return
                };
            
                card.addEventListener('click', flipCard)
            }) 
    }

    if( categories.length === 6 ){
    categories.forEach(category => addCategory(category))
    }


    
}

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




function fillBoard() {


    for (let i =0; i<=5; i++){
          cat = nums[Math.floor(Math.random()*nums.length)];
    
          getCategoryIds(cat);
     }    
    }
    

    function shuffle(array) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      }


      shuffle(nums);
      function getCats(){
        const slicedArray = nums.slice(0,6);
        cats.push(slicedArray);
      }

      getCats();
      console.log(cats);

    // fillTable();
    



   