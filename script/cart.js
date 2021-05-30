const list = document.querySelector('.cartList');
const totalSpan = document.querySelector('.checkout__total span');
const checkoutForm = document.querySelector('.checkout__form');
const cartProductsList = document.querySelector('.cartProducts__list');

let total = 0;

console.log(cart);
    
renderCart = () =>{
    cart.forEach((data) => {
     
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", data);
        //const cartProductsContent = document.querySelector('.cartProducts__content');


        const cartProductsContent = document.createElement('div');
        let img = data.images[0]?.url;
        if(!img){
            img = './resources/placeholder.jpeg'
        }

        cartProductsContent.innerHTML =`
            <div class="cartProducts__content">
                    <div class="cartProducts__imgContent">
                        <img class="cartProducts__img" src="${img}">
                    </div>
                        <div class="cartProducts__info">
                                <h2 class="cartProducts__title">${data.name}</h2>
                                <h2 class="cartProducts__price">$ ${data.price}</h2>
                        </div>
            </div>
           
        ` ;
        cartProductsContent.classList.add('.cartProducts__content'); 
        //product.setAttribute('href', '#');
        list.appendChild(cartProductsContent);
        //console.log();
        
        //cartProductsList.appendChild(cartProductsContent);
        total += data.price;
    }); 

    
    totalSpan.innerText = total; 
    checkoutForm.addEventListener('submit', function(event){
        event.preventDefault();

        const productIds = [];

        cart.forEach(function(data){
            productIds.push(data.id);
        });
        
        const order = {
            name: checkoutForm.cartName.value,
            cardNumber: checkoutForm.ccnumber.value,
            address: checkoutForm.address.value,
            date: Date.now(),
            productIds: productIds, 
            total: total,
            uid: loggedUser.uid
        }
        console.log(order);
        ORDERS_COLLECTION.add(order)
            .then(function(docRef){
                console.log(docRef.id);
                CART_COLLECTION.doc(loggedUser.uid).set({
                    cart: [],
                });
                location.href = '/store.html';
            })
    });
}




 
