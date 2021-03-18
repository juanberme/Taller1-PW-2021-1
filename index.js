let sparkle5 = document.querySelector('.sparkle5');
let slide_info = document.querySelector('.slide_info');
let slide_button = document.querySelector('.slide_button');
let reason_title = document.querySelector('.reason_title');
let why_info = document.querySelector('.why_info');

function handleMoveSparkle5() {
    console.log(sparkle5.scrollX);
    if(window.scrollY > slide_button.offsetTop){  
        if( window.scrollY < reason_title.offsetTop){
            sparkle5.style.transform = 'translate( -'+ (window.scrollY - slide_button.offsetTop) +'px, 0px)';
        }
        
    }
    
    
}

window.addEventListener('scroll', handleMoveSparkle5);