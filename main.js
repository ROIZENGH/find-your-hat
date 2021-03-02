const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
    this._field=field;
    this._fieldHeight=field.length;
    this._fieldWidth=field[0].length;
    this._currentPosition = [0,0];
    this._nextPosition = [0,0];
  };
    get fieldHeight(){
      return this._fieldHeight;
    };
    get fieldWidth(){
      return this._fieldWidth;
    };
    get currentPosition(){
      return this._currentPosition;
    }
    get nextPosition(){
        return this._nextPosition;
    }
    print(){
    let fieldPrint=[];
    for(let i=0; i<this._field.length; i++){
      fieldPrint.push(this._field[i].join(""))
    }
    fieldPrint = fieldPrint.join("\n");
    console.log(fieldPrint);
  }
}

const myField = new Field([
  ['*', '░', '░', '░', 'O'],
  ['░', '░', '░', 'O', '░'],
  ['░', '░', '░', 'O', '░'],
  ['░', '░', '░', '^', '░'],
]);

console.log(myField.fieldHeight);
console.log(myField.fieldWidth);
console.log(myField.currentPosition);
console.log("You (*) should try to reach ^. Avoid going out of bounds or falling in holes (O). You can move Up (U/u), Down(D/d), Left(L/l) or Right(R/r).")
myField.print();

let endGame = false;
while(!endGame){
    let move = prompt("Which direction do you wish to go?");
    move = move.toLowerCase();
  
    switch (move) {
        case "u":
            myField._nextPosition[0] = myField.currentPosition[0] - 1;
            break;
        case "d":
            myField._nextPosition[0] = myField.currentPosition[0] + 1;
            break;
        case "l":
            myField._nextPosition[1] = myField.currentPosition[1] - 1;
            break;
        case "r":
            myField._nextPosition[1] = myField.currentPosition[1] + 1;
            break;
        default: 
        console.log("Please enter a valid direction (U,D,L or R)");
    }

    if(myField.nextPosition[0]<0 || myField.nextPosition[0]>myField.fieldHeight-1 || myField.nextPosition[1] < 0 || myField.nextPosition[1] > myField.fieldWidth-1){
        console.log("You moved out of Bounds! You just lost :'(");
        endGame = true;
        break;
    }

    if(myField._field[myField.nextPosition[0]][myField.nextPosition[1]] === hole){
        console.log("You fell into a hole! You just lost :'(");
        endGame = true;
        break;
    }
    else if(myField._field[myField.nextPosition[0]][myField.nextPosition[1]] === hat){
        console.log("You reached the goal! You just won!! :)");
        endGame = true;
        break;
    }
    else if(myField._field[myField.nextPosition[0]][myField.nextPosition[1]] === pathCharacter){
        console.log("You can't go back the same path. You just lost :'(");
        endGame = true;
        break;
    }
    else if(myField._field[myField.nextPosition[0]][myField.nextPosition[1]] === fieldCharacter){
        myField._currentPosition = myField._nextPosition;
        myField._field[myField._currentPosition[0]][myField._currentPosition[1]] = pathCharacter;
    }
    myField.print();
  }
