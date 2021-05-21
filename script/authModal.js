const authModal = document.createElement('section');
authModal.classList.add('modal');
authModal.innerHTML =` 
<div class="modalbackdrop"></div>
<article class="modalcontent">
  <button class="modal__close">X</button>
  <form class="authform">
  <p>No haz <strong>iniciado sesión</strong></p>

<label class="authform__regfield productForms__label">
  Nombre
  <input class="productForms__input" type="text" name="name">
</label>

<label class="authform__regfield registrationForms__label">
    apellido
    <input class="productForms__input" type="text" name="lastName">
</label>

<label class="registrationForms__label">
    Email
    <input class="productForms__input" type="email" name="email">
</label>

<label class="registrationForms__label">
    Contraseña
    <input class="registrationForms__input" type="password" name="password">
</label>

<button type="button" class="authform__register">Registrarme</button>
<button type="button" class="authform__login">Iniciar sesion</button>
<button type="submit">Enviar</button>
</form>
</article>
`;

document.body.appendChild(authModal);

const authForm = authModal.querySelector('.authform');
const regFields = authForm.querySelectorAll('.authform__regfield');
const registerBtn = authForm.querySelector('.authform__register');
const loginBtn = authForm.querySelector('.authform__login');
let isLogin = true;

function handleGoToLogin(){
    regFields.forEach(function(elem){
        elem.classList.add('hidden');
    });
    loginBtn.classList.add('hidden');
    registerBtn.classList.remove('hidden');
    isLogin = true;
}

loginBtn.addEventListener('click', handleGoToLogin);

registerBtn.addEventListener('click', function(event){
    regFields.forEach(function(elem){
        elem.classList.remove('hidden');
    });
    loginBtn.classList.remove('hidden');
    registerBtn.classList.add('hidden');
    isLogin = false;
});

handleGoToLogin();

authForm.addEventListener('submit', function(event){
    event.preventDefault();
    console.log('submit');

    const name = authForm.name.value;
    const lastName = authForm.lastName.value;
    const email = authForm.email.value;
    const password = authForm.password.value;

    if(isLogin){
            firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
        var user = userCredential.user;
            // ...
        })
        .catch((error) => {
        console.log(error)
  });

    }else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user);
            // ...
            db.collection('users').doc(user.uid).set({
                name: name,
                lastName: lastName,
                email: email,
                password: password
            });
    })
    .catch((error) => {
        console.log(error);
    });

    }
});