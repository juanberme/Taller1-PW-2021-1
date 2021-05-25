const list = document.querySelector('.cartList');
const totalSpan = document.querySelector('.checkout__total span');
const checkoutForm = document.querySelector('.checkout__form');

let total = 0;

console.log(cart);
    
renderCart = () =>{
    cart.forEach((data) => {
     
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", data);
        const product = document.createElement('article');
        let img = data.images[0]?.url;
        if(!img){
            img = './resources/placeholder.jpeg'
        }
        product.innerHTML =`
            <div class="product__contentImage">
                    <div class="image">
                        <img class="product__img" src="${img}">
                        <div class="product__information">
                            <div class="product__data">
                            <p class="product__title">${data.name}</p>
                                <div class="product__calification">
                                    <img src="resources/calification.png" style="width:${data.stars*20}%">    
                                </div>
                            </div>
                            <div class="product__quantities">
                                <input type="button" value="+" class="product__increase">
                                <input type="number" placeholder="0" min="0" max="100" class="product__number">
                                <input type="button" value="-" class="product__decrease">
                            </div>
                        </div>
                    </div>
            </div>
            <div class="product__info">
                <input type="button" value="Quitar" class="product__addBtn">
                <h4 class="product__price">$ ${data.price}</h4>
            </div>
            <button class="hidden showLoggedAdmin">delete</button>
        ` ;
        product.classList.add('product'); 
        //product.setAttribute('href', '#');
        list.appendChild(product);
        //console.log();
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




 
