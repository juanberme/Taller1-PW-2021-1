let sparkle5 = document.querySelector('.sparkle5');

function handleMoveSparkle5() {
    //console.log(window);
    if(window.scrollY > 400 || window.scrollY < 700){
        sparkle5.style.transform = 'translate( -'+ (window.scrollY -399) +'px, 0px)';
    }
    
}

window.addEventListener('scroll', handleMoveSparkle5);