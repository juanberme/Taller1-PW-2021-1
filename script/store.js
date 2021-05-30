const list = document.querySelector('.list');
const filters = document.querySelector('.filters');
const adminBtn = document.querySelector('.headerStore__admin');

console.log(loggedUser);
let user = loggedUser;

setTimeout(function(){
    console.log(loggedUser);
}, 2000);


const hideBtn = document.querySelector('.headerStore__button');
let isHide = true

hideBtn.addEventListener('click', function(){
    console.log(loggedUser.name);
    if(isHide == !true){
        filters.classList.add('hidden');
        console.log(isHide);
        isHide =!true;
    }else{
        filters.classList.remove('hidden');
        console.log(isHide);
        isHide =!true;
    }
});

const checkProductFormAdmin = () => {
    if(!loggedUser || !loggedUser.admin) {
      adminBtn.classList.add('hidden');
    }else{
        adminBtn.classList.remove('hidden');
    }
}

adminBtn.addEventListener('click', ()=>{
    location.href="./productForms.html";
});

const handleCollectionResult = (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data =  doc.data();
        
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
                                <a class="product__title" href="./productDetails.html?id=${doc.id}&name=${data.name}">${data.name}</a>
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
                <input type="button" value="Agregar" class="product__addBtn">
                <h4 class="product__price">$ ${data.price}</h4>
            </div>
            <button class="hidden showLoggedAdmin">delete</button>
        ` ;
        product.classList.add('product'); 
        //product.setAttribute('href', '#');
        list.appendChild(product);
        //console.log();
        const addBtn = product.querySelector('.product__addBtn');

        let increaseAmount = product.querySelector('.product__increase');
        let decreaseAmount = product.querySelector('.product__decrease');
        let numberAmount = product.querySelector('.product__number');
        if(product !== null){
            increaseAmount.addEventListener('click', function() {
                numberAmount.value++;
                console.log(numberAmount.value);
            });
    
            decreaseAmount.addEventListener('click', function(){
                numberAmount.value--;
                if(numberAmount.value < 0){
                    numberAmount.value = 0;
                }
            });
        }
        

        addBtn.addEventListener('click', function(){
            addToMyCart({
                ...data,
                id: doc.id,
            });
            
            
            //console.log(cart.length, cartBtnNumber);
        });
    });
}


/*const headerStore = document.querySelector('.headerStore');
if(loggedUser.name !== null){
    nombreUsuario.innerHTML = `
<h2 class="headerStore__loggedName">Hola, ${loggedUser.name}</h2>`
}*/


//para agregar el nombre de usuario
const nombreUsuario = document.querySelector('.headerStore__username');


//para agregar los filtros
filters.addEventListener('change', function (){
    //console.log(filters.star);

    let productsCollection = db.collection('products');

    if(filters.type.value){
        productsCollection = productsCollection.where('type', '==', filters.type.value);
    }

    if(filters.price.value){
        switch(filters.price.value){
            case '1':
                productsCollection = productsCollection.where('price', '>=', 1000);
                productsCollection = productsCollection.where('price', '<', 3000);
                break;
            case '2':
                productsCollection = productsCollection.where('price', '>=', 3100);
                productsCollection = productsCollection.where('price', '<', 6000);
                break;
            case '3':
                productsCollection = productsCollection.where('price', '>=', 6100);
                productsCollection = productsCollection.where('price', '<', 9000);
                break;
            case '4':
                productsCollection = productsCollection.where('price', '>=', 9100);
                break;
        }
    }

    if(filters.stars.value){
        switch(filters.stars.value){
            case '1':
                productsCollection = productsCollection.where('stars', '==', '1');
                break;

            case '2':
                productsCollection = productsCollection.where('stars', '==', '2');
                break;

            case '3':
                productsCollection = productsCollection.where('stars', '==', '3');
                break;

            case '4':
                productsCollection = productsCollection.where('stars', '==', '4');
                break;

            case '5':
                productsCollection = productsCollection.where('stars', '==', '5');
                break;    
        }
    }

    //ordenamientos
    if(filters.order.value){
        switch(filters.order.value){
            case 'price_asc':
                productsCollection = productsCollection.orderBy('price', 'desc');
                break;

            case 'price_desc':
                productsCollection = productsCollection.orderBy('price', 'asc');
                break;

            case 'alpha':
                if(filters.price.value){
                    productsCollection = productsCollection.orderBy('price', 'asc');
                }
                productsCollection = productsCollection.orderBy('name', 'asc');
                break;

            case 'createdAt':
                if(filters.price.value){
                    productsCollection = productsCollection.orderBy('price', 'asc');
                }
                productsCollection = productsCollection.orderBy('createdAt', 'desc');
                break;
        }
    }
    productsCollection.get().then(handleCollectionResult);

    const params = new URLSearchParams(location.search);
    if(params.get('type')){
        productsCollection = productsCollection.where('type', '==', params.get('type'));
    }
});

db.collection('products').get().then(handleCollectionResult);


