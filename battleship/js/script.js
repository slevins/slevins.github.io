window.onload = init;

function init(){
    var fire = document.getElementById('form');

    fire.onsubmit = handlerFireButton;
    model.generateShipLocations();
}

var view = {

    displayMessage: function(msg){

        var messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = msg;
    },

    displayMissingShot: function(cellId){

        var cell = document.getElementById(cellId);
        cell.setAttribute('class', 'miss');
    },

    displayHittingShip: function(cellId){

        var cell = document.getElementById(cellId);
        cell.setAttribute('class', 'hit');
    }
};

var model = {
    boardSize: 7,
    amountShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    arrHits: [],

    ships: [
        {locations: [0,0,0], hits: ['','','']},
        {locations: [0,0,0], hits: ['','','']},
        {locations: [0,0,0], hits: ['','','']}
    ],

    fire: function(shot){

        for(var i=0; i<this.amountShips; i++){
            var ship = this.ships[i];
            var index = ship.locations.indexOf(shot);
            if(index >= 0){
                ship.hits[index] = 'hit';
                this.arrHits.push(shot);

                view.displayMessage('Подбил');
                view.displayHittingShip(shot);
                if(this.isSunk(ship)){
                    this.shipsSunk++;
                    view.displayMessage('Корабль потоплен!!!')
                }
                return true;
            }
        }
        view.displayMessage('Промах');
        view.displayMissingShot(shot);
        return false;
    },

    isSunk: function(ship){

        for(var i=0; i<this.shipLength; i++){
            if(ship.hits[i] !== 'hit'){
                return false;
            }
        }
        return true;
    },

    generateShipLocations: function(){
        var location;

        for(var i=0; i<this.amountShips; i++){
            do{
                location = this.generateShip();
            }while(this.collision(location));
            this.ships[i].locations = location;
        }
    },

    generateShip: function(){
        var direction = Math.floor(Math.random()*2);
        var row, col;
        var newShipLocations = [];

        if(direction === 1){
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        }else{
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        for(var i=0; i<this.shipLength; i++){
            if(direction === 1){
                newShipLocations.push(row + '' + (col + i));
            }else{
                newShipLocations.push((row + i) + '' + col);
            }
        }
        return newShipLocations;
    },

    collision: function(locations){
        for(var i=0; i<this.amountShips; i++){
            var ship = this.ships[i];
            for(var j=0; j<locations.length; j++){
                if(ship.locations.indexOf(locations[j]) >= 0){
                    return true;
                }
            }
        }
        return false;
    }
};

var controller = {
    shots: 0,

    processShot: function(shot){
        var coords = parseShot(shot);
        if(coords){
            this.shots++;
            var hits = model.fire(coords);

            if(hits && model.amountShips === model.shipsSunk){
                view.displayMessage('Ты потопил все мои корабли за '+ this.shots + ' выстрелов')
            }
        }
    }

};

//
function parseShot(shot){
    var arr = ['a','b','c','d','e','f','g'];

    if(shot === null || shot.length !== 2){
        alert("Некорректно введены данные")
    }else{
        var firstChar = (shot.charAt(0)).toLowerCase();
        var indexRow = arr.indexOf(firstChar);
        var indexColumn = shot.charAt(1);
        var coordinates = indexRow + indexColumn;

        if(indexRow < 0 || isNaN(indexColumn)){
            alert('Что за херню ты ввёл??')
        }else if(indexRow >= model.boardSize || indexColumn < 0 || indexColumn >= model.boardSize){
            alert('Координаты вне предела доски')
        }else if(model.arrHits.indexOf(coordinates) >= 0){
            alert('Ты же стрелял туда уже!')
        }else{
            return coordinates;
        }
    }
    return null;
}

function handlerFireButton(){
    var input = document.getElementById('guessInput');
    var value = input.value;

    controller.processShot(value);
    input.value = '';
    input.focus();

    return false;
}