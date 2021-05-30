const menuUser = document.querySelector('.menuSection__menuUser');
const menuLogout = document.querySelector('.menuSection__logOut');
const cartCounter = document.querySelector('.cartBtn');
//const adminBtn = document.querySelector('.headerStore__admin');
//const nameUser = document.querySelector('.headerStore__loggedName');

//para mostrar cosas que solo se van a mostrar cuando ya esté inicializado
function userAuthChanged(loggedIn){
    console.log(loggedIn);
    const filters = document.querySelector('.filters');
    
        //para los botones de iniciar y cerrar sesion
        if(loggedIn){
            menuUser.classList.add('hidden');
            menuLogout.classList.remove('hidden');
            cartCounter.classList.remove('hidden');
            //nameUser.classList.remove('hidden');
            
        }else{
            menuUser.classList.remove('hidden');
            menuLogout.classList.add('hidden');
            cartCounter.classList.add('hidden')
            //nameUser.classList.add('hidden');
        }
    
}



menuUser.addEventListener('click', ()=>{
    authModal.style.display = 'block';
    setTimeout(handleModalAppear, 1);
});

menuLogout.addEventListener('click', ()=>{
    firebase.auth().signOut();
});

function userLoggedOut(){

}