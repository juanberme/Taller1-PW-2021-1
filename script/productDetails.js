const params = new URLSearchParams(location.search);
const productTitle = document.querySelector('.productDet__title');
const productImg = document.querySelector('.productDet__principalImg');
const productPrice = document.querySelector('.productDet__price');
const starsCount = document.querySelector('.productDet__starsCount');
const productDescription = document.querySelector('.productDet__description');
const radioBtn1 = document.querySelector('.productDet__radio1');
const radioBtn2 = document.querySelector('.productDet__radio2');
const radioBtn3 = document.querySelector('.productDet__radio3');
let indexSlide = 2;



const id = params.get('id');

let productsCollection = db.collection('products');

const productDetails = document.querySelector('.productDet');
const addBtn = document.querySelector('.productDet__add');
const decreaseAmount = productDetails.querySelector('.productDet__decrease');
const increaeAmount = productDetails.querySelector('.productDet__increase');
const numberAmount = productDetails.querySelector('.productDet__number');

db.collection('products')
    .doc(id)
    .get()
    .then(function (doc){
        console.log(doc.id, doc.data());
        const data = doc.data();
        if(!data){
            location.href="./404.html";
        }
        productImg.setAttribute('src', data.images[0]?.url);
        radioBtn1.addEventListener('click',()=>{
            productImg.setAttribute('src', data.images[0]?.url);
            //console.log(indexSlide);
        });
        
        radioBtn2.addEventListener('click',()=>{
            productImg.setAttribute('src', data.images[1]?.url);
            //console.log(indexSlide);
        });
        
        radioBtn3.addEventListener('click',()=>{
            productImg.setAttribute('src', data.images[2]?.url);
            //console.log(indexSlide);
        });
        /*let img = data.images[indexSlide]?.url;
        if(!img){
            img = './resources/placeholder.jpeg'
        }*/
        
        console.log(indexSlide);
        
        productTitle.innerHTML = data.name;
        productPrice.innerHTML = data.price;
        productDescription.innerHTML = data.description;
        var totalStars =''+data.stars*20+'%';
        starsCount.style.width = totalStars;

        

//para agregar al carrito desde productDetail

increaeAmount.addEventListener('click', function() {
    numberAmount.value++;
    console.log(numberAmount.value);

});

decreaseAmount.addEventListener('click', function(){
    numberAmount.value--;
    if(numberAmount.value < 0){
        numberAmount.value = 0;
    }
})


addBtn.addEventListener('click', function(){
    if(loggedUser){
        addToMyCart({
        ...data,
        id: doc.id,
    });
    } else{
        handleGoToLogin();
    }
    console.log(cart.length, cartBtnNumber);
});

});





//por si no encuentra una página, lo redirige a esta
if(!id){
    location.href="./404.html";
}
/*const params = new URLSearchParams(location.search);
const id = params.get('id');

let productsCollection = db.collection('products');

const productDetails = document.querySelector('.productDet');

db.collection('products')
    .doc(id)
    .get()
    .then(function (doc){
        console.log(doc.id, doc.data());
        const data = doc.data();
        if(!data){
            location.href="./404.html";
        }
        let img = data.images[0]?.url;
        if(!img){
            img = './resources/placeholder.jpeg'
        }
        productDetails.innerHTML = `
        <div class="productDet__detImages">
        <img class="productDet__principalImg" src="${img}">
    </div>

    <div class="productDet__info">
        <h2 class="productDet__title">${data.name}</h2>
        <div class="productDet__calification">
            <div class="productDet__star">
                <img src="resources/calification.png" style="width:${data.stars*20}%">
            </div>
            <h4 class="productDet__rate">${data.stars}</h4>
        </div>
        <h2 class="productDet__price">$ ${data.price} COP</h2>
        <p class="productDet__description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad</p>
        
        <div class="productDet__buttons">
            <button class="productDet__add">Agregar</button>
            <div class="productDet__quantity">
                <button class="productDet__decrease">-</button>
                <input type="number" class="productDet__number">
                <button class="productDet__increase">+</button>
            </div>
        </div>
    </div>
        `
});

//para agregar al carrito desde productDetail
const addBtn = productDetails.querySelector('.productDet__add');

    addBtn.addEventListener('click', function(){
        if(loggedUser){
            console.log(hola);
            addToMyCart({
            ...data,
            id: doc.id,
        });
        //localStorage.setItem('store__cart', JSON.stringify(cart));
        } else{
            handleGoToLogin();
        }
        console.log(cart.length, cartBtnNumber);
    });




//por si no encuentra una página, lo redirige a esta
if(!id){
    location.href="./404.html";
}*/