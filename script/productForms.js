


const productForms = document.querySelector('.productForms');
const productFormsSuccess = document.querySelector('.successfullMsg');
const productFormsLoading = document.querySelector('.loadingMsg');
const productFormsError = document.querySelector('.errorMsg');
const productFormsImages = document.querySelector('.productForms__images');

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
        stars: productForms.stars.value

    };
    if(productForms.status_traditional.checked) product.status.push('traditional');
    if(productForms.status_recent.checked) product.status.push('recent');
    if(productForms.status_new.checked) product.status.push('new');

    if(productForms.content_vegan.checked) product.content.push('vegan');
    if(productForms.content_NoVegan.checked) product.content.push('no vegan');

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
 
    

    return;
    
    console.log(product);

    
}

productForms.addEventListener('submit', handleSubmit);