// Variables
let computerBlock = document.getElementById('computerBlock');
let userBlock = document.getElementById('userBlock');
let btnSelect = document.getElementsByClassName('btn-select');

let userScores = document.getElementById('userScores')
let computerScores = document.getElementById('computerScores')
let reset = document.getElementById('reset');

let uScores = Number(localStorage.getItem('uScores'));
let cScores = Number(localStorage.getItem('cScores'));

let gameStart = false;

let win = document.createElement('img');
win.setAttribute('src', 'images/win.webp');
win.setAttribute('id', 'win');

let loose = document.createElement('img');
loose.setAttribute('src', 'images/loose.webp');
loose.setAttribute('id', 'loose');

let draw = document.createElement('img');
draw.setAttribute('src', 'images/draw.webp');
draw.setAttribute('id', 'draw');


//Functions
function btnDisable(tf) {
    for(let i = 0; i < btnSelect.length; i++) {
        btnSelect[i].disabled = tf;
    }
}
function set() {
    userScores.innerHTML = localStorage.getItem('uScores');
    computerScores.innerHTML = localStorage.getItem('cScores');
}    

function refresh() {
    setTimeout(() => {
        set();
    }, 100);    
}    

function cycle(index) {
    setTimeout(function () {

        if (gameStart == false) {
            computerBlock.innerHTML = `<img src="images/${index}.webp" width="300px" alt="ComputerBlock">`;
            userBlock.innerHTML = `<img src="images/${index}.webp" width="300px" alt="UserBlock">`;

            index++;

            if (index >= 4) {
                index = 1;
            }    

            cycle(index); // recursively call `cycle()`
        }    
    }, 200);    
}    

function play(e) {
    refresh()
    btnDisable(true)

    let imgNum;
    let btnText = e.target.innerText;

    if (btnText == 'ROCK') {
        imgNum = 1;
    }    
    else if (btnText == 'PAPER') {
        imgNum = 2;
    }    
    else {
        imgNum = 3;
    }    

    gameStart = true;

    userBlock.innerHTML = `<img src="images/${imgNum}.webp" width="300px" alt="UserBlock">`;
    computerBlock.innerHTML = `<img src="images/${random = Math.ceil(Math.random() * 3)}.webp" width="300px" alt="ComputerBlock">`;

    if (imgNum == random) {
        userBlock.appendChild(draw);
    }    
    else if ((imgNum == 1 && random == 2) || (imgNum == 2 && random == 3) || (imgNum == 3 && random == 1)) {
        cScores += 1;
        localStorage.setItem('cScores', cScores);
        userBlock.appendChild(loose);
    }    
    else if ((imgNum == 1 && random == 3) || (imgNum == 2 && random == 1) || (imgNum == 3 && random == 2)) {
        uScores += 1;
        localStorage.setItem('uScores', uScores);
        userBlock.appendChild(win);
    }    
    else {
        console.log('Error!!');
    }

    setTimeout(function () {
        gameStart = false;
        btnDisable(false);
        cycle(1);
    }, 1000);    
}    


// ************** Main ****************
reset.addEventListener('click', () => {
    localStorage.clear();
    uScores = 0;
    cScores = 0;
    refresh()
})

for (item of btnSelect) {
    item.addEventListener('click', play);
}

set();

cycle(1);