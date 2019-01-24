/*list resturana, svaki restoran mora imati IDBCursor,
id, name

var orders */

let restaurants = {
    101: "Njam Njam", 
    102: "Mozaik", 
    103: "Old Story", 
    104: "Sezam", 
    105: "Zlatnik",
    106: "Mama Mia", 
    107: "Sedra",
    108: "Merak", 
    109: "Limenka"};

let orderList = {
    101: [], 
    102: [], 
    103: [], 
    104: [], 
    105: [], 
    106: [], 
    107: [], 
    108: [], 
    109: []};


let listDoc = document.getElementById('restaurantList');

let removeListofOrders = function (listofOrders){
    while(listofOrders.childElementCount){
        listofOrders.childNodes[0].remove();
    }
}

let addHTMLelement = function (tag, parent) {
    let newNode = document.createElement(tag);
    parent.appendChild(newNode);
    return newNode;
}

let refreshList = function (listofOrders, resID) {
    let arr = orderList[resID];
    //if(arr.length == 0) return;
    removeListofOrders(listofOrders);
    for(let j = 0; j < arr.length; ++j){
        let order = addHTMLelement('li', listofOrders);
        order.appendChild(document.createTextNode(arr[j]));
        
        let cancelButton = addHTMLelement('img', order);
        cancelButton.src = 'close.png';
        cancelButton.classList.add('button');
        cancelButton.addEventListener('click', function () { 
            arr.splice(arr.indexOf(arr[j]), 1) ;
            refreshList(listofOrders, resID);
        } );
    }
}
/*
let refreshList = function (listofOrders) {
    for(let i = 0; i < restaurants.length; ++i){
        let arr = orderList[i].order;
        if(arr.length == 0) continue;
        removeListofOrders(listofOrders);
        for(let j = 0; j < arr.length; ++j){
            let order = addHTMLelement('li', listofOrders);
            order.appendChild(document.createTextNode(arr[j]));
        }
    }
}*/

let addRestaurant = function (id) { 
    let order = addHTMLelement('div', document.getElementById('ordersDiv'));
    order.classList.add('order');
    order.appendChild(document.createTextNode(restaurants[id]));
    
    let cancelOrderButton = addHTMLelement('img', order);
    cancelOrderButton.src = 'close.png';
    cancelOrderButton.classList.add('button');
    cancelOrderButton.addEventListener('click', function () { 
        order.remove();
        orderList[id] = [];
     });

    let listofOrders = addHTMLelement('ul', order);
    listofOrders.classList.add('item')
    
    let input = addHTMLelement('input', order);
    input.type = 'text';
    
    let submit = addHTMLelement('img', order);
    submit.src = 'addLight.png';
    submit.classList.add('button');

    submit.addEventListener('click', function () { 
        orderList[id].push(input.value);
        input.value = '';
        refreshList(listofOrders, id);
    });

}

let makeRestaurantList = function () {
    let title = addHTMLelement('h2', listDoc);
    title.textContent = 'LISTA RESTORANA';

    for(let resID in restaurants){
        let restaurant =addHTMLelement('ol', listDoc);
        restaurant.appendChild(document.createTextNode(restaurants[resID]));
    
        let button = addHTMLelement('button', restaurant);
        button.style.background = 'addRed.png';
        button.classList.add('button');

        button.addEventListener('click', function() { addRestaurant( resID )} );
    }
}

makeRestaurantList();