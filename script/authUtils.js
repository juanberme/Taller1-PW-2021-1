

//para mostrar cosas que solo se van a mostrar cuando ya esté inicializado
function userAuthChanged(loggedIn){
    console.log(loggedIn);
    const filters = document.querySelector('.filters');
    
    const showLoggedIn = document.querySelectorAll('.showLoggedIn');
    showLoggedIn.forEach(function(elem){
        if(loggedIn){
            elem.classList.remove('hidden');
        }else{
            elem.classList.add('hidden');
        }
    });

    const hideLoggedIn = document.querySelectorAll('.hideLoggedIn');
    hideLoggedIn.forEach(function(elem){
        if(loggedIn){
            elem.classList.add('hidden');
        }else{
            elem.classList.remove('hidden'); 
        }
    });

    const showLoggedAdmin = document.querySelectorAll('.showLoggedAdmin');
    showLoggedAdmin.forEach(function(elem){
        if(loggedIn && loggedUser.admin){
            elem.classList.remove('hidden');
        }else{
            elem.classList.add('hidden');
        }
    });
    
}



function userLoggedOut(){

}