/*const btnOpenModal = document.querySelector('.bnt-open-modal');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modalcontent');
const modalBackdrop = document.querySelector('.modalbackdrop');
const modalClose = document.querySelector('.modal__close');

function handleModalAppear () {
  modal.style.opacity = 1;
  modalContent.style.transform = 'translate(0px, 0px)';
}

function handleOpenModal () {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  setTimeout(handleModalAppear, 1);
}

function handleCloseModal () {
  modal.style.opacity = 0;
  modalContent.style.transform = 'translate(0px, -500px)';
  document.body.style.overflow = 'hidden scroll';
  setTimeout(function () {
    modal.style.display = 'none';
  }, 500);
}

modalBackdrop.addEventListener('click', handleCloseModal);
modalClose.addEventListener('click', handleCloseModal);*/

//btnOpenModal.addEventListener('click', handleOpenModal);

//
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
                <input type="button" value="Ver más" class="product__addBtn">
                <h4 class="product__price">$ ${data.price}</h4>
            </div>
        ` ;
        product.classList.add('product'); 
        //product.setAttribute('href', '#');
        list.appendChild(product);
        //console.log();
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


