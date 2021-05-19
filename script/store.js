const list = document.querySelector('.list');
const filters = document.querySelector('.filters');

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
                                <a class="product__title" href="#">${data.name}</a>
                                <div class="product__calification">
                                    <img src="resources/calification.png" style="width:10%">    
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
                <input type="button" value="Ver más" class="product__addBtn">
                <h4 class="product__price">$ ${data.price}</h4>
            </div>
        ` ;
        product.classList.add('product'); 
        product.setAttribute('href', '#');
        list.appendChild(product);
        console.log(product.doc.data);
    });
}

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
    productsCollection.get().then(handleCollectionResult);
});

db.collection('products')
    .get()
    .then(handleCollectionResult);


