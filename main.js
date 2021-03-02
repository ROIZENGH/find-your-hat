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
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
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
  if(move === "u"){
    if((myField._currentPosition[0]-1) < 0){
      console.log("You moved out of Bounds! You just lost :'(");
      endGame = true;
      break;
    }
    else{
      myField._currentPosition[0] = myField._currentPosition[0] - 1;
      myField._field[myField._currentPosition[0]][myField._currentPosition[1]] = "*";
    }
    myField.print();
  }
  if(move === "d"){
    if((myField._currentPosition[0]+1) > (myField.fieldHeight-1)){
      console.log("You moved out of Bounds! You just lost :'(");
      endGame = true;
      break;
    }
    myField._currentPosition[0] = myField._currentPosition[0] + 1;
    myField._field[myField._currentPosition[0]][myField._currentPosition[1]] = "*";
    myField.print();
  }
  if(move === "r"){
    if((myField._currentPosition[1]+1) > (myField.fieldWidth-1)){
      console.log("You moved out of Bounds! You just lost :'(");
      endGame = true;
      break;
    }
    myField._currentPosition[1] = myField._currentPosition[1] + 1;
    myField._field[myField._currentPosition[0]][myField._currentPosition[1]] = "*";
    myField.print();
  }
  if(move === "l"){
    if((myField._currentPosition[1]-1) < 0){
      console.log("You moved out of Bounds! You just lost :'(");
      endGame = true;
      break;
    }
    myField._currentPosition[1] = myField._currentPosition[1] - 1;
    myField._field[myField._currentPosition[0]][myField._currentPosition[1]] = "*";
    myField.print();
  }
  if(move === "x"){
    endGame = true;
  }
}