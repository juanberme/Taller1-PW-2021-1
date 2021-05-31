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
const storage = firebase.storage();

let loggedUser = null;

setTimeout(function(){
  console.log(loggedUser);
}, 2000);

const setLoggedUser = (info, id) =>{
  loggedUser = info;
  loggedUser.uid = id;
  //console.log(doc.data());
  userAuthChanged(true);
  if(typeof checkProductFormAdmin !== 'undefined') checkProductFormAdmin();
  if(typeof checkAdminBtn !== 'undefined') checkAdminBtn();
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('onAuthStateChanged', user);
      db.collection('users').doc(user.uid).get().then(function(doc){
        if(!doc.data()) return;
        setLoggedUser(doc.data(), user.uid);
      });
      getMyCart(user.uid);
    } else {
      loggedUser = null;
      cart = [];
      // User is signed out
      // ...
      userAuthChanged(false);
    }
});
  

let cart = [];
const cartBtnNumber = document.querySelector('.cartBtn span');

//nos permite subir la info a una seccion llamada cart
const CART_COLLECTION = db.collection('cart');

const ORDERS_COLLECTION = db.collection('orders');
//para agregar a cart un nuevo producto
const addToMyCart = (product) =>{
  cart.push(product);
  CART_COLLECTION.doc(loggedUser.uid).set({
    cart,
  });
  cartBtnNumber.innerText = cart.length;
};

let renderCart = null;

const getMyCart = (uid)=>{
  CART_COLLECTION.doc(uid).get().then(snapShot => {
    const data = snapShot.data();
    console.log(data);
    if(!data) return;
    if(cartBtnNumber) cartBtnNumber.innerText = data.cart.length;
    cart = data.cart;
    console.log(renderCart);
    if(renderCart) renderCart();
  });
}
