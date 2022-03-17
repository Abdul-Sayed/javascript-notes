# Scope, hoisting, var vs let/const, this

## var vs let

What will this alert ?

    function createButtons() {

      for (var i = 1; i <= 5; i++) {
        var body = document.querySelector("BODY");
        var button = document.createElement("BUTTON");
        button.textContent = 'Button ' + i;
        body.appendChild(button);

        button.onclick = function() {
          alert('This is button ' + i);
        }
      }
    }

    createButtons();

With var, the scope is not limited to the block in which the variable is used - whereas let and const are. Changing `var i` to `let i` makes i different for each time the loop block runs, so the current i will be preserved.

Another way is to invoke a function, passing in the current i of the loop;

    const renderButton = i => {
      var body = document.querySelector("BODY");
      var button = document.createElement("BUTTON");
      button.textContent = "Button " + i;
      body.appendChild(button);
      button.onclick = function() {
        alert("This is button " + i);
      };
    };

    function createButtons() {
      for (var i = 1; i <= 5; i++) {
        renderButton(i);
      }
    }

    createButtons();

This could also be done as an IIFE, avoiding the need for an external function call;

    (function createButtons() {
      for (var i = 1; i <= 5; i++) {
        var body = document.querySelector("BODY");
        var button = document.createElement("BUTTON");
        button.textContent = "Button " + i;
        body.appendChild(button);

        (function(i) {
          button.onclick = function() {
            alert("This is button " + i);
          };
        })(i)
      }
    })();

## var vs let hoisting

    // var/let hoisting
    // What will be the output?

    (function f() {
      console.log('using var', area);
      console.log('using let', name);
      var area = 'Geology';
      let name = 'Bert';
    })()

    // using var undefined and Reference Error
    // During compilation, Javascript performs variable declarations, then re runs to perform all variable assignments, reads, and function invocation. In the first phase, the variables are hoisted to the top of their scope and given tentative default values. With var, variables are assigned undefined in the initial run. With let, variables are not assigned anything (typeof wil equal the string 'undefined'). Therefore attempting to consume name throws a reference error. Its best practice to write all variable declaration and assignments at the top of their scope. Otherwise implement error handling as follows:

    (function f() {
      if (area !== undefined) console.log('using var', area);
      try {
        console.log('using let', name);
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
      }
      var area = 'Geology';
      let name = 'Bert';
    })()

## arrow functions

Arrow functions should not be used for methods in objects, classes, and constructor functions since using `this` in those arrow functions will refer to the global object rather than the object containing the arrow function. Same for event handlers.

## this keyword

`this` is a reference holder that will refer to different values based on scope and how its called

When this is used in the global scope, it refers to the window object (unless in strict mode)
When 'this' is used in an object, it refers to the object its in.
When 'this' is used in an object's method, it refers to the parent of that method; the object.
When this is used in a standalone function it refers to the parent of that function, which will be the global window object.

In general, `this` references the object which the function is part of.

In global scope, `this` refers to the window object;
this.table = "window table" //=> table became a public attribute of the window object
window.table //=> "window table"

This used in a global function (event if nested) will refer to the window object (when not in strict mode)
const cleanTable = function() {
console.log(`cleaning ${this.table}`) //=> 'cleaning window table'
}

In an object, this refers to the object
let johnsRoom = { //=> window.johnsRoom == undefined because johnsRoom is private
table: 'johns table',
cleanTable() {
console.log(`cleaning ${this.table}`) //=> johnsRoom.cleanTable() === 'cleaning johns table'
}
}

In a class, this refers to the class

    class createNewRoom {
        constructor(name) {
            this.table = `${name}s table`
        }
        cleanTable(soap) {
            console.log(`cleaning ${this.table} using ${soap}`)
        }
    }

## Call/Apply/Bind This

Often times a reference to a function is passed around as a variable. This loses its binding when referencing a method in which `this` is used. Arrow functions also don't keep track of this.

We can explicitly pass the object to reference 'this' to when invoking a function.

Call:
let add = function (c) {
console.log(this.a + this.b + c)
}

    let obj = {
      a: 1,
      b: 2
    }

    add.call(obj, 3)   //=> 6

Apply: - same as call, but pass in arguments as an array

    function getBrand(prefix) {
        console.log(prefix + this.brand);
    }

    let honda = {
        brand: 'Honda'
    };
    let audi = {
        brand: 'Audi'
    };

    getBrand.apply(honda, ["It's a "]); // "It's a Honda"
    getBrand.apply(audi, ["It's an "]); // "It's a Audi"

Bind:

    let car = {
        brand: 'Honda',
        getBrand: function () {
            return this.brand;
        }
    }

    console.log(car.getBrand()); // Honda

    let brand = car.getBrand;
    console.log(brand()); // undefined

    let brand = car.getBrand.bind(car);  // pass the object you want this to reference in the argument of bind
    console.log(brand()); // Honda

// -----------------------------------------------------------------------

# Closures

A closure is a pattern that can give outer scope access to variables from an inner scope.

    function greeting() {
        let message = 'Hi';

        function sayHi() {
            console.log(message);
        }

        return sayHi;
    }
    let hi = greeting();
    hi(); // still can access the message variable value; 'Hi'

In greeting(), the reference to sayHi(), an inner function, is being returned. So sayHi is being used as a closure. The variable hi recieves the returned reference and when invoked, it behaves as if sayHi() is being invoked, with the outer context of the sayHi() closure being preserved. Therefore access to the message variable is preserved.

## Immediately Invoked Functions

IIFEs are functions that are executed upon creation.

    (function doubleNumber(num) {
      console.log(num * 2)
    })(5)

## Currying

Currying is a process in functional programming of transforming a function with multiple arguments into a sequence of nested functions that each take one of those multiple arguments.
Curried functions are invoked repeatedly because each level of nesting returns a function

    function tripleProduct(num1, num2, num3) {
      return num1 * num2 * num3
    }

// can be transformed into:

    function tripleProduct(num1) {
      return num2 => {
        return num3 => {
         return num1 * num2 * num3;
        }
      }
    }

    tripleProduct(10)(20)(30)  //=> 6000

// OR
const multiply10 = tripleProduct(10);
const multiply20 = multiply10(20);
const multiply30 = multiply20(30); //=> 6000

## Closures and function vs block scope

Javascript has lexical scoping which allows variables defined in outer scopes to be available in nested scopes (unlike Ruby). Closures allow an outer scope access to data nested within a function's scope.

    const f1 = () => {
      let i = 1;
      return () => {
        console.log(i * 2)
      }
    }

    f1()()   //=> logs 2

The nested function within the setTimeout is a closure and the following iterator logs 3, 3, 3 each after a second.
This is because var is function scoped, and maintains its value across the entire f2 function. i increments to 3 before the first setTimeout executes, so all the setTimeout will be using i = 3

    (function f2() {
      for (var i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 1000);
      }
    })()

Simply replace var with let to make i block scoped, so that i only keeps its value over the for loop. Therefore setTimeout will only recieve the current i of the loop

    (function f2() {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => console.log(i), 1000);
      }
    })()

Another option is to invoke an external function within the for loop, passing it the current i each iternation

    const loggit = (i) => {
      setTimeout(() => console.log(i), 1000);
    }

    (function f2() {
      for (var i = 0; i < 3; i++) {
        loggit(i)
      }
    })()

Yet another option is to encapsulate the nested function of setTimeout and bind the context of the for loop to it, passing in i.

    (function f3() {
      for (var i = 0; i < 3; i++) {
        setTimeout((x => console.log(x)).bind(this, i), 1000);
      }
    })()

// -------------------------------------------------------------------------------

# Asynchronous JS

## Async Question

// what is the resulting output ?

    let num = 0;

    async function increment() {
    num += await 2; // same as Promise.resolve(2)
    console.log(num)
    }

    increment();

    num += 1
    console.log(num)

// First the synchronous code is run, so num = 1 when the syncronous console.log runs. While being asynchronous, when invoked, increment() is initialized with num = 0. It is set aside until the rest of the main stack is run. So num = 0 + 1; logging 1. Upon returning to increment(), JS continues with the value of num initialized at the time it was called; num = 0 + 2; logging 2.

## SetTimeout Functions

    console.log('a');

    let timmy = setTimeout(function () {
    console.log('b')
    }, 1);

    let tommy = setTimeout(function () {
    console.log('c')
    }, 10);

    let timer = setTimeout(function () {
    console.log('d')
    }, 0);

    console.log('e')

    // what is the print order and why ?
    // setTimeout is always taken off the main stack to be revisited after handling the main synchronous loop. However many ms the main loop took to complete will be the time all the async que stack functions will have been waiting. All setTimeouts that had a delay less than the elapsed ms will fire first in the order written.
    // a , e, b, d, c

// -------------------------------------------------------------------------------

# OOP

## Making a method private

// Revealing module pattern; pattern to only expose certain object methods to the outside. \_convention signifies a private variables

    let myModule = (function () {
    let _data = [];
    let _render = () => {
    // click listeners for _add and _remove
    return 'I rendered'
    };
    let _add = () => {
    // _data.push('new data')
    };
    let _remove = () => {
    // _data.pop
    }
    return { render: _render }
    })();

    console.log(myModule.render())

// -------------------------------------------------------------------------------

# Misc.

## Automatic semicolon injection

Given this code, how will it run ?

    let a = {
      a: 123
    }

    [a].forEach(x => console.log(x))

Because of the missing semicolon on the object a, JS reads this as doing an object property lookup. Javascript interprets this as

    let a;  // undefined; looking up {a:123} by key undefined:
    a = {a:123}[a].forEach(x => console.log(x))

## Determine if a function recieved the expected number of parameters

Determine if the number of passed arguments (arguments.length) is the same as the number of parameters (f.length)

    let f = function (a, b) {
      return arguments.length === f.length ? 'matching number of parameters' : 'wrong number of parameters'
    }


    console.log(f())
    console.log(f(1))
    console.log(f(1, 2))
    console.log(f(1, 2, 3))

## Create an array with 5 random numbers without a for loop

while this can be done with a for loop;

    let arr = []
    for (let i = 0; i < 5; i++) {
    arr.push(Math.round((Math.random()) \* 10))
    }

It can also be done by creating a new array of length 5, filling it with placeholder values, then mapping over them to turn them into random numbers

    let myArray = new Array(5).fill(10).map(n => Math.round(n \* Math.random()))

// -------------------------------------------------------------------------------

# JS Runtime

## Execution Context

There is a global and a function execution context

As the JS engine runs code, it creates an execution context with two phases: a creation phase and an execution phase.  
 During the creation phase, JS stores global variables as undefined, sets up the memory heap, and establishes the global object, binding this to it.
In a function execution context, the arguments object would be established rather than the global object.

In the execution phase, the JS engine executes code line by line synchronously, assigns variables their values, and executes function calls

JS engine uses a call stack to manage the execution context. Each time an execution contect is entered, JS pushes it to the top of the call stack.  
 When an execution context completes, it pops off the call stack. The call stack works according to LIFOl Last In First Out.  
 The script will stop when the call stack is empty.

The call stack has a size limit and so recursive functions with no exit conditions will keep adding more function execution contexts until the stack overflows.

## Event Loop

Async functions are handled concurrently using the event loop. When an execution context reaches an async function, the Web API; another component of the web browser takes it off the stack and waits for it to complete. Meanwhile, the rest of the synchronous functions in the call stack are executed. When the async task is complete, the Web API pushes it to the callback que, and from there the event loop will push it back on the stack if the stack is empty.

## Scope, Lexical Scope, Closure

Variables that you declare outside of functions are in the global scope.
The variables that you declare inside a function are local to the function. They are called local variables.
Unless using strict mode; `use strict` in a file or within a function, variables assigned in a function scope without using var, let, or const become global variables - bad practice.

If inside a function scope a variable is used that isn't declared there, JS engine will look keep looking one level up until it finds the variable declaration. Javascript has lexical scoping - where inner function can access the variables declared in its outer scope.

A closure is a pattern that can take advantage of this to give outer scope access to variables from an inner scope.

    function greeting() {
        let message = 'Hi';

        function sayHi() {
            console.log(message);
        }

        return sayHi;
    }
    let hi = greeting();
    hi(); // still can access the message variable value; 'Hi'

In greeting(), the reference to sayHi(), an inner function, is being returned. So sayHi is being used as a closure. The variable hi recieves the returned reference and when invoked, it behaves as if sayHi() is being invoked, with the outer context of the sayHi() closure being preserved. Therefore access to the message variable is preserved.

## Hoisting

During the creation phase of the execution context, JS engine stores var variables for that context as undefined (declares them, but doesn't assign them). Also, the variables are moved to the top of the script. Therefore, the first line of below code doesn't cause an error.

    console.log(counter); // undefined
    var counter = 1;

If the variable is declared with let, JS will not assign it undefined and running this code will throw an error that 'counter' cannot be used before initialization

For functions, using add(x, y) before its declared is not an issue since functions are hoised to the top of the script

    let x = 20,
    y = 10;

    let result = add(x, y);
    console.log(result);

    function add(a, b) {
      return a + b;
    }

However, for function expressions or arrow functions, it is an issue since as a variable, only var add is hoisted to the top and initialized as undefined. The function is not hoisted to the top. Therefore invoking add to assign it to result will throw an error since undefined cannot be used as a function

    let x = 20,
    y = 10;

    let result = add(x,y);
    console.log(result);

    var add = function(x, y) {
    return x + y;
    }

// -------------------------------------------------------------------------------

# JS Patterns

## Implement a JS singleton pattern

This is a pattern to initialize an instance if it doesn't exist and if it exists, return the same instance (without re-initialization)

    let obj = (() => {
    let objInstance;

    function create() {
    let _isRunning = false;
    let start = () => _isRunning = true;
    let stop = () => _isRunning = false;
    let currentState = () => _isRunning;

        return { start, stop, currentState }

    }
    return {
    getInstance: () => {
    return objInstance ? objInstance : objInstance = create()
    }
    }
    })();

## Revealing Module Pattern

// Revealing module pattern; pattern to only expose certain object methods (\_render) to the outside while keeping the others, such as \_data, \_add, and \_remove hidden. (\_convention signifies a private variable)

    let myModule = (function () {
      let _data = [];
      let _render = () => {
        // click listeners to execute internal _add and _remove methods
        return 'I rendered'
      };
      let _add = () => {
        // _data.push('new data')
      };
      let _remove = () => {
        // _data.pop
      }
      return { render: _render }
    })();


    console.log(myModule.render())
