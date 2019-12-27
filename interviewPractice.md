## Currying 
Currying is a process in functional programming of transforming a function with multiple arguments into a sequence of nested functions that each take one of those multiple arguments.
Curried functions are invoked repeatedly because each level of nesting returns a function
    function tripleProduct(num1) {
      return num2 => {
        return num3 => {
          return num1 + num2 + num3;
        }
      }
    }

    tripleProduct(10)(20)(30)  //=> 6000
OR
    const multiply10 = tripleProduct(10);
    const multiply20 = multiply10(20);
    const multiply30 = multiply20(30);  //=> 6000


## Immediately Invoked Functions
IIFEs are functions that are executed upon creation. 

    (function doubleNumber(num) {
      console.log(num * 2)
    })(5)