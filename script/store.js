const database = [
    {
        product__img: 'donut1/Donut_01.gltf',
        product__title: 'Glaseado de fresa',
        product__price: 8600,
    }, 
    {
        product__img: 'donut2/model.gltf',
        product__title: 'Glaseado de chocolate',
        product__price: 4000,
    }, 
    {
        product__img: 'donut3/model.gltf',
        product__title: 'Glaseado de vainilla',
        product__price: 5200,
    },
    {
        product__img: 'donut1/Donut_01.gltf',
        product__title: 'Glaseado de fresa',
        product__price: 8600,
    }, 
    {
        product__img: 'donut2/model.gltf',
        product__title: 'Glaseado de chocolate',
        product__price: 4000,
    }, 
    {
        product__img: 'donut3/model.gltf',
        product__title: 'Glaseado de vainilla',
        product__price: 5200,
    }  
];

const list = document.querySelector('.list');

function handleProductItem (item){
    const product = document.createElement('article');
    product.innerHTML = `
    <div class="product__contentImage">
                <div class="image">
                    <model-viewer class="product__img" src="./${item.product__img}" camera-controls auto-rotate></model-viewer>
                    <div class="product__information">
                        <div class="product__data">
                            <a class="product__title" href="#">${item.product__title}</a>
                            <img class="product__calification" src="resources/calificacion.png">    
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
                <h4 class="product__price">$ ${item.product__price}</h4>
            </div>
    `;  
    product.classList.add('product'); 
    list.appendChild(product);
    console.log(product);
}

database.forEach(handleProductItem);
