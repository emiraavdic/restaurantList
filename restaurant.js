let restaurants = {
    101: "Njam Njam", 
    102: "Mozaik", 
    103: "Old Story", 
    104: "Sezam", 
    105: "Zlatnik",
    106: "Mama Mia", 
    107: "Sedra",
    108: "Merak", 
    109: "Limenka",
    110: "Nota Bene"};

let orderList = {};
let listDoc = document.getElementById('restaurantList');

let parseInput = function (text){
    if(text.trim().length == 0)
        return 0;
    return 1;
}

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
    let store = JSON.stringify(orderList);
    window.localStorage.setItem('orderList', store);
    if(orderList[resID] == undefined) return;
    let arr = orderList[resID];
    removeListofOrders(listofOrders);
    for(let j = 0; j < arr.length; ++j){
        let order = addHTMLelement('li', listofOrders);
        order.appendChild(document.createTextNode(arr[j]));

        let cancelButton = addHTMLelement('button', order);
        cancelButton.innerHTML = '<img src="close.png">';
        cancelButton.style.marginRight = '40px';

        cancelButton.addEventListener('click', function () { 
            arr.splice(arr.indexOf(arr[j]), 1);
            refreshList(listofOrders, resID);
        } );
    }
}

let addRestaurant = function (id) { 
    let order = addHTMLelement('div', document.getElementById('ordersDiv'));
    order.classList.add('order');
    order.appendChild(document.createTextNode(restaurants[id]));
    
    let cancelOrderButton = addHTMLelement('button', order);
    cancelOrderButton.innerHTML = '<img src="close.png">';
    
    cancelOrderButton.addEventListener('click', function () { 
        order.remove();
        delete orderList[id];
        document.getElementById(id + 'b').disabled = false;
        refreshList(listofOrders, id);
     });

    let listofOrders = addHTMLelement('ul', order);
    listofOrders.classList.add('item')
    
    let inputOrder = addHTMLelement('input', order);
    inputOrder.type = 'text';
    
    let submitOrder = addHTMLelement('button', order);
    submitOrder.innerHTML = '<img src="addLight.png">';

    submitOrder.addEventListener('click', function () { 
        if(parseInput(inputOrder.value)){
            orderList[id].push(inputOrder.value);
        }
        inputOrder.value = '';
        refreshList(listofOrders, id);
    });

    document.getElementById(id+'b').disabled = true;
    return listofOrders;
}

let loadStorage = function () {
    let store = localStorage.getItem('orderList');
    if(store){
        orderList = JSON.parse(store);
        for(let el in orderList){
            let list = addRestaurant(el);
            refreshList(list, el);
        }
    }
}

let makeRestaurantList = function () {
    let title = addHTMLelement('h2', listDoc);
    title.textContent = 'LISTA RESTORANA';

    for(let resID in restaurants){
        let restaurant =addHTMLelement('ol', listDoc);
        restaurant.appendChild(document.createTextNode(restaurants[resID]));
    
        let button = addHTMLelement('button', restaurant);
        button.innerHTML = '<img src="addRed.png">';
        button.id = resID + 'b';

        button.addEventListener('click', function() { 
            addRestaurant( resID );
            orderList[resID] = [];
            let store = JSON.stringify(orderList);
            window.localStorage.setItem('orderList', store);
        } );    
    }
    let dropOrders =addHTMLelement('button', document.getElementById('cancelAllOrders'));
    dropOrders.innerHTML = 'Drop All Orders';
    dropOrders.id = 'dropButton';
    dropOrders.addEventListener('click', function() { 
        localStorage.clear();
        document.getElementById('ordersDiv').innerHTML = '';
        for(let el in orderList){
            document.getElementById(el + 'b').disabled = false;
        }
    });
    loadStorage();
}

makeRestaurantList();