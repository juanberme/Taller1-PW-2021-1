
const productForms = document.querySelector('.productForms');
const productFormsSuccess = document.querySelector('.successfullMsg');
const productFormsLoading = document.querySelector('.loadingMsg');
const productFormsError = document.querySelector('.errorMsg');
const productFormsImages = document.querySelector('.productForms__images');
const orders = document.querySelector('.orders');
const ordersBtn = document.querySelector('.adminBtn__orders');
const addBtn = document.querySelector('.adminBtn__add');
const deleteBtn = document.querySelector('.adminBtn__delete');

//botones de las opciones
ordersBtn.addEventListener('click', ()=>{
    productForms.classList.add('hidden');
});

addBtn.addEventListener('click', ()=>{
    productForms.classList.remove('hidden');
});

deleteBtn.addEventListener('click', ()=>{
    productForms.classList.add('hidden');
});

const imageFiles = [];

//poder previsualizar la imagen
productForms.image.addEventListener('change', function(){
    const file = productForms.image.files[0];
    console.log(file);
    console.log('change')
    if(!file) return;
    var reader = new FileReader(); 
    reader.onload = function(event) {
        const productFormsImg = document.createElement('img');
        productFormsImg.classList.add('productForms__img');
        productFormsImg.setAttribute('src', event.target.result)
        productFormsImages.appendChild(productFormsImg);
    }
    reader.readAsDataURL(file); // convert to base64 string
    imageFiles.push(file);
});

//poder crear el formulario y subir la información
function handleSubmit(a){
    a.preventDefault();

    const product = {
        name: productForms.name.value,
        price: parseInt(productForms.price.value),
        type: productForms.type.value,
        status: [],
        content: [],
        stars: productForms.stars.value,
        createdAt: new Date(Date.now()),
        //id: docRef.id
    };
    /*if(productForms.status_traditional.checked) product.status.push('traditional');
    if(productForms.status_recent.checked) product.status.push('recent');
    if(productForms.status_new.checked) product.status.push('new');

    if(productForms.content_vegan.checked) product.content.push('vegan');
    if(productForms.content_NoVegan.checked) product.content.push('no vegan');*/

    //Crear avisos de errores
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

    if(!product.stars){
        error += 'Debes seleccionar la clasificacion. <br/>';
    }

    if(error){
        productFormsError.innerHTML = error;
        productFormsError.classList.remove('hidden');
        //return;
    }else{
        productFormsError.classList.add('hidden');
    }

    productFormsLoading.classList.remove('hidden');
    productFormsError.classList.add('hidden');

    const genericCatch = function(error){
        productFormsLoading.classList.add('hidden');
        productFormsError.classList.remove('hidden');
        productFormsError.innerHTML = 'There was a error in the product upload'; 
    }


       //espera a subir la informacion al firebase
    db.collection("products").add(product)
    .then(function(docRef){

       const uploadPromises = [];
        downloadUrlPromises = [];

        //se suben las imagenes a la carpeta de firebase
       imageFiles.forEach(function (file){
        var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);
        //espera a subir la imagen
        uploadPromises.push(fileRef.put(file))
       });

       //esperamos que todos los downloads url lleguen
       Promise.all(uploadPromises).then(function (snapshots){
        snapshots.forEach(function(snapshot) {
            //espera a tener el url de descarga
            downloadUrlPromises.push(snapshot.ref.getDownloadURL());
          });

          Promise.all(downloadUrlPromises).then(function(downloadUrls){

            //se crea el arreglo con todas las imagenes 
              const images = [];
              downloadUrls.forEach(function (url, index){
                  images.push({
                      url: url,
                      ref: snapshots[index].ref.fullPath
                  })
              })
              //actualizamos el producto con el arreglo de todas las imagenes
              db.collection("products").doc(docRef.id).update({
                images: images
              }).then(function (){
                productFormsLoading.classList.add('hidden');
                productFormsSuccess.classList.remove('hidden');
              }).catch(genericCatch);

          }).catch(genericCatch);

       }).catch(genericCatch);

    }).catch(genericCatch);

    //subir la imagen
    var storageRef = firebase.storage().ref();

}

productForms.addEventListener('submit', handleSubmit);

const checkProductFormAdmin = () => {
    if(!loggedUser || !loggedUser.admin) {
      location.href = '/store.html';
    }
}

//poder ver el pedido del user

/*const handleCollectionResult = (querySnapshot) => {
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
                <input type="button" value="Agregar" class="product__addBtn hidden showLoggedIn">
                <h4 class="product__price">$ ${data.price}</h4>
            </div>
            <button class="hidden showLoggedAdmin">delete</button>
        ` ;
        product.classList.add('product'); 
        //product.setAttribute('href', '#');
        list.appendChild(product);
        //console.log();
        const addBtn = product.querySelector('.product__addBtn');
        addBtn.addEventListener('click', function(){
            addToMyCart({
                ...data,
                id: doc.id,
            });
            
            
            //console.log(cart.length, cartBtnNumber);
        });
    });
}*/

/*const handleRenderOrders = (querySnapshot) =>{
    orders.innerHTML = ``;

    querySnapshot.forEach((doc) =>{
        const data = doc.data();

        const orderContainer = document.createElement('div');
        let img = data.cart[0]?.images[0]?.url;

        orderContainer.innerHTML = `
        <h2 class="orders__name">Nombre de usuario</h2>
        <section class="orders__list">
            <img class="orders__img" src="${img}">
            <div class="orders__info">
                <h2 class="orders__productName">${data.name}</h2> 
                <div class="orders__numbers">
                    <h2 class="orders__productPrice">${data.price}</h2> 
                    <p class="orders__quantity">X2</p>
                </div>
            </div>
        </section>
        `;
        orderContainer.classList.add('orderContainer');
        orders.appendChild(orderContainer);

    });
}*/



//db.collection('cart').get().then(handleRenderOrders);
