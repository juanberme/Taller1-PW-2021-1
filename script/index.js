let menuPic = document.querySelector('.menuPic');
let option2 = document.querySelector('.option2');
//funcion para hacer el menú desplegable
function handleAppearNewMenu(){
    if(option2.style.display === 'none'){
        option2.style.display = 'flex';
    }else{
        option2.style.display = 'none';
    };
}


//menuPic.addEventListener('click', handleAppearNewMenu);


var counter = 1;
//funcion para hacer que el slide se mueva
setInterval(function(){
    document.getElementById('radio'+ counter).checked = true;
    counter++;
    if(counter > 3){
        counter = 1;
    }
}, 5000);


//chispas
let sparkle = document.querySelector('.sparkle');
let sparkle2 = document.querySelector('.sparkle2');
let sparkle3 = document.querySelector('.sparkle3');
let sparkle4 = document.querySelector('.sparkle4');
let sparkle5 = document.querySelector('.sparkle5');
let sparkle8 = document.querySelector('.sparkle8');
let sparkle9 = document.querySelector('.sparkle9');
let sparkle10 = document.querySelector('.sparkle10');
let sparkle11 = document.querySelector('.sparkle11');
let sparkle12 = document.querySelector('.sparkle12');

let slide_info = document.querySelector('.slide_info');
let slide_button = document.querySelector('.slide_button');
let reason_title = document.querySelector('.reason_title');
let reason = document.querySelector('.reason');
let why_info = document.querySelector('.why_info');
//funcion para mover las chispas
function handleMoveSparkle5() {
    //console.log(window.scrollY, slide_info.offsetTop, reason.offsetTop);
    if(window.scrollY > slide_info.offsetTop){  
        if( window.scrollY < reason.offsetTop){
            sparkle.style.transform = 'translate(-'+((window.scrollY)/4)+'px, '+((window.scrollY)/7.5)+'px)';
            sparkle2.style.transform = 'translate(-'+((window.scrollY)/1.5)+'px,-'+((window.scrollY)/9)+'px)';
            sparkle3.style.transform = 'translate(-'+((window.scrollY)/2)+'px,'+((window.scrollY)/8)+'px)';
            sparkle4.style.transform = 'translate(-'+((window.scrollY)/3)+'px, '+((window.scrollY)/15)+'px)';
            sparkle5.style.transform = 'translate(-'+(window.scrollY/4)+'px, '+((window.scrollY)/1.7)+'px)';
            sparkle8.style.transform = 'translate(-'+(window.scrollY/2)+'px, '+((window.scrollY)/3)+'px)';
            sparkle9.style.transform = 'translate(-'+((window.scrollY))+'px, '+((window.scrollY)/10)+'px)';
            sparkle10.style.transform = 'translate(-'+((window.scrollY)/3)+'px, '+((window.scrollY)/8.8)+'px)';
            sparkle11.style.transform = 'translate(-'+((window.scrollY)/1.5)+'px, '+((window.scrollY)/15)+'px)';
            sparkle12.style.transform = 'translate( -'+((window.scrollY)/2)+'px, '+((window.scrollY)/8)+'px)';
        } 
    } 
}
window.addEventListener('scroll', handleMoveSparkle5);