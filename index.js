let sparkle5 = document.querySelector('.sparkle5');
let slide_info = document.querySelector('.slide_info');
let why_info = document.querySelector('.why_info');

function handleMoveSparkle5() {
    console.log(sparkle5.scrollX);
    if(window.scrollY > slide_info.offsetTop){
        sparkle5.style.transform = 'translate( -'+ (window.scrollY - slide_info.offsetTop) +'px, 0px)';
        if( window.scrollY < why_info.offsetTop){
            
        }
        
    }
    
    
}

window.addEventListener('scroll', handleMoveSparkle5);