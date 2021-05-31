const menuUser = document.querySelector('.menuSection__menuUser');
const menuLogout = document.querySelector('.menuSection__logOut');
const cartCounter = document.querySelector('.cartBtn');
const formsBtn = document.querySelector('.headerStore__admin');
const menuUser2 = document.querySelector('.menuSection2__menuUser');
const menuLogout2 = document.querySelector('.menuSection2__logOut');
const detailAdd = document.querySelector('.productDet__add');

//para mostrar cosas que solo se van a mostrar cuando ya esté inicializado
function userAuthChanged(loggedIn){
    console.log(loggedIn);
    const filters = document.querySelector('.filters');
    
        //para los botones de iniciar y cerrar sesion
        if(loggedIn){
            menuUser.classList.add('hidden');
            menuLogout.classList.remove('hidden');
            cartCounter.classList.remove('hidden');
            formsBtn.classList.remove('hidden');
            menuUser2.classList.add('hidden');
            menuLogout2.classList.remove('hidden');
            
        }else{
            menuUser.classList.remove('hidden');
            menuLogout.classList.add('hidden');
            cartCounter.classList.add('hidden');
            formsBtn.classList.add('hidden');
            menuUser2.classList.remove('hidden');
            menuLogout2.classList.add('hidden');
        }
    
}

menuUser.addEventListener('click', ()=>{
    authModal.style.display = 'block';
    setTimeout(handleModalAppear, 1);
});

menuUser2.addEventListener('click', ()=>{
    authModal.style.display = 'block';
    setTimeout(handleModalAppear, 1);
});


menuLogout.addEventListener('click', ()=>{
    firebase.auth().signOut();
});

menuLogout2.addEventListener('click', ()=>{
    firebase.auth().signOut();
});

function userLoggedOut(){

}