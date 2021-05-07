const firebaseConfig = {
    apiKey: "AIzaSyD9KoHYGh39yD3AVfw8gVeNvY0q5EXB2jE",
    authDomain: "taller1-pw211.firebaseapp.com",
    projectId: "taller1-pw211",
    storageBucket: "taller1-pw211.appspot.com",
    messagingSenderId: "252463248566",
    appId: "1:252463248566:web:920db6220bd20f8a336217"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();



const productForms = document.querySelector('.productForms');
const productFormsSuccess = document.querySelector('.successfullMsg');
const productFormsLoading = document.querySelector('.loadingMsg');
const productFormsError = document.querySelector('.errorMsg');



function handleSubmit(a){
    a.preventDefault();

    const product = {
        name: productForms.name.value,
        price: parseInt(productForms.price.value),
        type: productForms.type.value,
        status: [],
        content: []
    };
    if(productForms.status_traditional.checked) product.status.push('traditional');
    if(productForms.status_recent.checked) product.status.push('recent');
    if(productForms.status_new.checked) product.status.push('new');

    if(productForms.content_vegan.checked) product.content.push('vegan');
    if(productForms.content_NoVegan.checked) product.content.push('no vegan');

    let error = ''; 

    if(!product.name){
        error += 'Debes ponerle nombre al producto. <br/>';
    } 

    if(!product.price){
        error += 'Debes agregarle precio al producto. <br/>';
    } 

    if(product.price < 1000){
        error += 'El precio del producto no puede ser menor a 1000 COP. <br/>'
    }

    if(!product.type){
        error += 'Debes seleccionar el tipo de producto. <br/>';
        
    } 

    if(error){
        productFormsError.innerHTML = error;
        productFormsError.classList.remove('hidden');
        return;
    }
    console.log(product);

    productFormsLoading.classList.remove('hidden');
    db.collection("products").add(product)
    .then(function(docRef){
        console.log('document added', docRef.id)
        productFormsLoading.classList.add('hidden');
        productFormsSuccess.classList.remove('hidden');
    })
    .catch(function(error){
        productFormsLoading.classList.add('hidden');
        productFormsError.classList.remove('hidden');
    });
}

productForms.addEventListener('submit', handleSubmit);