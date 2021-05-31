const productForms = document.querySelector('.productForms');
const productFormsSuccess = document.querySelector('.successfullMsg');
const productFormsLoading = document.querySelector('.loadingMsg');
const productFormsError = document.querySelector('.errorMsg');
const productFormsImages = document.querySelector('.productForms__images');
const orders = document.querySelector('.orders');
const ordersBtn = document.querySelector('.adminBtn__orders');
const adminAddBtn = document.querySelector('.adminBtn__add');
const deleteBtn = document.querySelector('.adminBtn__delete');
const textArea = document.querySelector('.productForms__textArea');
const cartInfo = document.querySelector('.cartInfo');
const orderFinal = document.querySelector('.orders__final');
const ordersForms = document.querySelector('.ordersForms');
let id;

const menuShow = document.querySelector('.menuSection__menuHeader');
const headerMenu = document.querySelector('.menuSection__sec2');
menuShow.addEventListener('click', ()=>{
    headerMenu.classList.add('menuSecShow');
});

//botones de las opciones
ordersBtn.addEventListener('click', ()=>{
    productForms.classList.add('hidden');
    orderFinal.classList.add('hidden');
    cartInfo.classList.remove('hidden');
});

adminAddBtn.addEventListener('click', ()=>{
    productForms.classList.remove('hidden');
    orderFinal.classList.add('hidden');
    cartInfo.classList.add('hidden');
});

deleteBtn.addEventListener('click', ()=>{
    productForms.classList.add('hidden');
    orderFinal.classList.remove('hidden');
    cartInfo.classList.add('hidden');
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
        description: textArea.value,
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


db.collection('products').onSnapshot((querySnapshot) =>{
    orders.innerHTML = ``;

    querySnapshot.forEach((doc) =>{
        const data = doc.data();

        const orderContainer = document.createElement('div');
        let img = data.images[0]?.url;

        orderContainer.innerHTML = `
            <div class="orders__content">
                    <section class="orders__list">
                        <img class="orders__img" src="${img}">
                        <div class="orders__info">
                            <h2 class="orders__productName">${data.name}</h2> 
                            <div class="orders__numbers">
                                <h2 class="orders__productPrice">$${data.price}</h2> 
                                <p class="orders__quantity">${data.stars}</p>
                                <p class="orders__quantity">${data.type}</p>
                            </div>
                        </div>
                        <div class="orders__optionsBtn">
                            <button class="orders__delete"><img class="orders__DeleteIcon" src="./resources/close.png"></button>
                            <button class="orders__edit"><img class="orders__editIcon" src="./resources/edit.png"></button>
                        </div>
                    </section>
            </div>
        `;
        orderContainer.classList.add('orderContainer');
        orders.appendChild(orderContainer);

        const deleteOrder = orderContainer.querySelector('.orders__delete');
        const editOrder = orderContainer.querySelector('.orders__edit');

        deleteOrder.addEventListener('click', ()=>{
            console.log('entro delete');
            db.collection('products').doc(doc.id).delete();
        });


        editOrder.addEventListener('click', ()=>{
            console.log('entro delete');
            ordersForms.classList.remove('hidden');
             id = doc.id;
        });

        const editBtn = document.querySelector('.productForms__button');

        editBtn.addEventListener('click', ()=>{

        ordersForms.classList.add('hidden');
            db.collection('products').doc(id).update({
                name: ordersForms.name.value,
                price: ordersForms.price.value,
                type: ordersForms.type.value,
                stars: ordersForms.stars.value
            });
        });
    });
});





//////////
const handleRenderCart = (querySnapshot) =>{
    cartInfo.innerHTML = ``;

    querySnapshot.forEach((doc) =>{
        const data = doc.data();

        const cartInfoContent = document.createElement('div');
        //let img = data.images[0]?.url;

        cartInfoContent.innerHTML = `
        <section class="cartInfo__list">
        <h2 class="cartInfo__name"> ${data.name}</h2> 
            <div class="cartInfo__info">
                <h2 class="cartInfo__address"><strong cartInfo__addressTitle>Dirección:</strong> ${data.address}</h2> 
                <h2 class="cartInfo__date"><strong cartInfo__dateTitle>Fecha:</strong> ${data.date}</h2>
                <h2 class="cartInfo__total"><strong cartInfo__totalTitle>Total:</strong> ${data.total}</h2> 
            </div>
        </section>
        `;
        cartInfoContent.classList.add('cartInfo__content');
        cartInfo.appendChild(cartInfoContent);
    });
}
db.collection('orders').get().then(handleRenderCart);



