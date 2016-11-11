var inheritsFrom = function (child, parent){
    child.prototype = Object.create( parent.prototype );
};

var Calculator = function (){};

Calculator.prototype = {

    add: function (x, y){
        return x + y;
    },

    subtract: function (x, y){
        return x - y;
    },

    multiply: function (x, y){
        return x * y;
    },

    divide: function (x, y){
        if(y === 0) {
            console.log( "NaN" );
            return 0;
        }
        return x / y;
    }
};

var calculator = new Calculator();
console.log( calculator.add( 3, 4 ) );
console.log( calculator.add( 2, 3 ) );
console.log( calculator.subtract( 9, 3 ) );
console.log( calculator.multiply( 2, 7 ) );
console.log( calculator.divide( 2, 0 ) );
console.log( calculator.divide( 6, 3 ) );


//prototype
var ScientificCalculator = function (){

    this.sin = function (x){
        return Math.sin( Math.PI / x );
    };

    this.cos = function (x){
        return Math.cos( x * Math.PI );
    };
    this.tan = function (x){
        return Math.tan( x );
    };
    this.log = function (x){
        return Math.log( x );
    }
};

inheritsFrom( ScientificCalculator, Calculator );
var sc = new ScientificCalculator();

console.log( sc.add( 1, 2 ) );
console.log( sc.log( 1 ) );
console.log( sc.tan( 0 ) );

//Mixin Class
var WithExponents = function (){
    this.pow = function (x, y){
        return Math.pow( x, y );
    },

        this.multiplyExp = function (xyArray, qrArray){
            var first =
                Math.pow( xyArray[0], xyArray[1] );
            var second =
                Math.pow( qrArray[0], qrArray[1] );
            var total = (
                (
                    (
                        first * second
                    )
                )
            );
            return total;

        },
        this.divideExp = function (xyArray, qrArray){
            var first =
                Math.pow( xyArray[0], xyArray[1] );
            var second =
                Math.pow( qrArray[0], qrArray[1] );
            var total = (
                (
                    (
                        first / second
                    )
                )
            );
            return total;

        }
};


WithExponents.call( Calculator.prototype );
var calculator = new Calculator();
console.log( calculator.pow( 2, 3 ) );
console.log( calculator.multiplyExp( [2, 3], [2, 4] ) );
console.log( calculator.divideExp( [2, 3], [2, 5] ) );


function delay (delayTime, calcObject, operation, eleArray){

    var promise = new Promise(
        function (resolve, reject){

            window.setTimeout(
                function (){
                    if(operation == "add") {
                        resolve( calcObject.add( eleArray[0], eleArray[1] ) );
                    }
                    else if(operation == "subtract") {
                        resolve( calcObject.subtract( eleArray[0], eleArray[1] ) );
                    }
                    else if(operation == "sqrt") {
                        resolve( calcObject.sqrt( eleArray[0], eleArray[1] ) );
                    }
                }, delayTime
            );
        }
    );

    promise.then(
        // Log the fulfillment value
        function (val){
            console.log( val );
            return promise;
        }
    )
        .catch(
            // Log the rejection reason
            function (reason){
                console.log( 'Handle rejected promise (' + reason + ') here.' );
                return promise;
            }
        );
}

var calculator = new Calculator();

var willAdd = delay( 100, calculator, 'add', [1, 1] );
console.log( willAdd );
console.log( delay( 1000, calculator, 'add', [10, 5] ) );
console.log( delay( 500, calculator, 'subtract', [9, 5] ) );
console.log( delay( 1000, calculator, 'sqrt', [2, 2] ) ); //error --> error
