let menuPic = document.querySelector('.menuPic');
let option2 = document.querySelector('.option2');

function handleAppearNewMenu(){
    if(option2.style.display === 'none'){
        option2.style.display = 'flex';
    }else{
        option2.style.display = 'none';
    };
}

menuPic.addEventListener('click', handleAppearNewMenu);

var counter = 1;

//
setInterval(function(){
    document.getElementById('radio'+ counter).checked = true;
    counter++;
    if(counter > 3){
        counter = 1;
    }
}, 5000);

let sparkle2 = document.querySelector('.sparkle2');
let sparkle3 = document.querySelector('.sparkle3');
let sparkle5 = document.querySelector('.sparkle5');
let slide_info = document.querySelector('.slide_info');
let slide_button = document.querySelector('.slide_button');
let reason_title = document.querySelector('.reason_title');
let reason = document.querySelector('.reason');
let why_info = document.querySelector('.why_info');

function handleMoveSparkle5() {
    //console.log(window.scrollY, slide_info.offsetTop, reason.offsetTop);
    if(window.scrollY > slide_info.offsetTop){  
        if( window.scrollY < reason.offsetTop){
            sparkle2.style.transform = 'translate( -'+ ((window.scrollY - slide_info.offsetTop))+'px,-'+(((window.scrollY + slide_info.offsetTop)-1012)/3)+'px)';
            sparkle3.style.transform = 'translate( -'+((window.scrollY - slide_info.offsetTop))+'px,-'+(((window.scrollY + slide_info.offsetTop)-1175)/2)+'px)';
            sparkle5.style.transform = 'translate( -'+ ((window.scrollY - slide_info.offsetTop)) +'px,'+(((window.scrollY + slide_info.offsetTop)-1158)/4)+'px)';
        }
        
    }
    
    
}

window.addEventListener('scroll', handleMoveSparkle5);