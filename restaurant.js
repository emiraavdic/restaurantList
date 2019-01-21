let restaurants = [['Njam Njam', 0], ['Mozaik', 0], ['Old Story', 0], ['Sezam', 0], ['Zlatnik', 0], ['Mama Mia', 0], ['Sedra', 0], ['Merak', 0], ['Limenka', 0]];
let listDoc = document.getElementById('restaurantList');
document.body.background = 'img.png';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundSize = 'cover';

/*let addRestaurant(input){

}*/

let addItem = function(name, order, input) {
    let item = document.createElement('div');
    item.classList.add('item');
    order.insertBefore(item, input);
    item.textContent = '- ' + input.value;
    //window.sessionStorage.getItem()
    input.value = '';
}

let getOrder = function (el) {
    if(el[1]) return;
    let order = document.createElement('div');
    order.classList.add('order');
    order.appendChild(document.createTextNode(el[0]));
    document.body.appendChild(order);
    let input = document.createElement('input');
    input.type = 'text';
    order.appendChild(input);
    let submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Add';
    order.appendChild(submit);
    submit.addEventListener('click', function() { addItem(el[0], order, input) });
    ++el[1];
}

let makeRestaurantList = function () {
    let title = document.createElement('h2');
    title.textContent = 'LISTA RESTORANA';
    listDoc.appendChild(title);

    for(let el of restaurants){
        let restaurant = document.createElement('ol');
        restaurant.addEventListener('click', function() { getOrder( el );} );
        listDoc.appendChild(restaurant);
        restaurant.textContent = el[0];
        window.sessionStorage.setItem(el[0],[]);
    }
}

makeRestaurantList();

//rgb(172, 227, 243);
//rgb(75, 154, 179);
//✓

console.log(window.sessionStorage.getItem('Mozaik'));