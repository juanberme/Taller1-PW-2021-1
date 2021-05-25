const authModal = document.createElement('section');
authModal.classList.add('modal');
authModal.innerHTML =` 
<div class="modalbackdrop"></div>
<article class="modal__content">
  <button class="modal__close">X</button>
  <form class="authform">

  <p class="registrationForms__registerOption">Ingresa a tu cuenta</p>

<label class="authform__regfield registrationForms__label">
  Nombre
  <input class="registrationForms__input" type="text" name="name">
</label>

<label class="authform__regfield registrationForms__label">
    apellido
    <input class="registrationForms__input" type="text" name="lastName">
</label>

<label class="registrationForms__label">
    Email
    <input class="registrationForms__input" type="email" name="email">
</label>

<label class="registrationForms__label">
    Contraseña
    <input class="registrationForms__input" type="password" name="password">
</label>

<p class="errorMsg"></p>



    <div class="registrationForms__btns">
    <button type="submit" class="authform__send">Continuar</button>
    <button type="button" class="authform__login">Iniciar sesion</button>
    
    <p class="registrationForms__registerOption">¿No tienes cuenta? <strong>Registrate Aquí</strong></p>
        <button type="button" class="authform__register">Registrarme</button>
        
        
    </div>


</form>
</article>
`;

const btnOpenModal = document.querySelector('.bnt-open-modal');
const modal = document.querySelector('.modal');
const modalBackdrop = authModal.querySelector('.modalbackdrop');
const modalClose = authModal.querySelector('.modal__close');



modalBackdrop.addEventListener('click', handleCloseModal);
modalClose.addEventListener('click', handleCloseModal);

//btnOpenModal.addEventListener('click', handleOpenModal);
//<button class="btn bnt-open-modal">Abrir modal</button>


document.body.appendChild(authModal);

const authForm = authModal.querySelector('.authform');
const regFields = authForm.querySelectorAll('.authform__regfield');
const registerBtn = authForm.querySelector('.authform__register');
const loginBtn = authForm.querySelector('.authform__login');
const modalError = authForm.querySelector('.errorMsg');
const authModalContent = authModal.querySelector('.modal__content'); 
const information = authModal.querySelector('.registrationForms__registerOption');

let isLogin = true;

function handleGoToLogin(){
    regFields.forEach(function(elem){
        elem.classList.add('hidden');
    });
    loginBtn.classList.add('hidden');
    registerBtn.classList.remove('hidden');
    isLogin = true;
}

registerBtn.addEventListener('click', function(event){
    regFields.forEach(function(elem){
        elem.classList.remove('hidden');
    });
    information.style.display === 'none';

    loginBtn.classList.remove('hidden');
    registerBtn.classList.add('hidden');
    isLogin = false;
});

loginBtn.addEventListener('click', function(event){
    regFields.forEach(function(elem){
        elem.classList.add('hidden');
    });
    loginBtn.classList.add('hidden');
    registerBtn.classList.remove('hidden');
    isLogin = false;
});

handleGoToLogin();

let infoUser;

authForm.addEventListener('submit', function(event){
    event.preventDefault();
    console.log('submit');

    const name = authForm.name.value;
    const lastName = authForm.lastName.value;
    const email = authForm.email.value;
    const password = authForm.password.value;

    if(isLogin){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                handleCloseModal();
            })
            .catch((error) => {
                console.log(error);
                modalError.innerText = error.message;
  });
    } else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            infoUser = user;
            console.log(user);
            // ...
            const userDoc = {
                name: name,
                lastName: lastName,
                email: email,
                password: password
            };
            db.collection('users').doc(user.uid).set(userDoc);
            setLoggedUser(userDoc, user.uid);
            handleCloseModal();
    })
    .catch((error) => {
        console.log(error);
        modalError.innerText = error.message;
    });

    }
});


function handleModalAppear () {
    authModal.style.opacity = 1;
    authModalContent.style.transform = 'translate(0px, 0px)';
}

function handleCloseModal () {
    authModal.style.opacity = 0;
    authModalContent.style.transform = 'translate(0px, -500px)';
    document.body.style.overflow = 'hidden scroll';
    setTimeout(function () {
        authModal.style.display = 'none';
    }, 500);
  }


