# Scope, hoisting, var vs let/const, this 

## var vs let

What will this alert ?
    function createButtons() {
      for (var i = 1; i <= 5; i++) {
        var body = document.querySelector("BODY");
        var button = document.createElement("BUTTON");
        button.textContent = 'Button ' + i;
        button.onclick = function() {
         alert('This is button ' + i);
        }
        body.appendChild(button);
      }
    }

    createButtons();

With var, the scope is not limited to the block in which the variable is used - whereas let and const are. Changing `var i` to `let i` makes i different for each time the loop block runs, so the current i will be preserved.

Another way is to invoke a function, passing in the current i of the loop;

    const addButton = i => {
      var body = document.querySelector("BODY");
      var button = document.createElement("BUTTON");
      button.textContent = "Button " + i;
      button.onclick = function() {
        alert("This is button " + i);
      };
      body.appendChild(button);
    };

    function createButtons() {
      for (let i = 1; i <= 5; i++) {
        addButton(i);
      }
    }

This could also be done as an IIFE, avoiding the need for an external function call;

    (function createButtons() {
      for (var i = 1; i <= 5; i++) {
        var body = document.querySelector("BODY");
        var button = document.createElement("BUTTON");
        button.textContent = "Button " + i;
        (function(i) {
          button.onclick = function() {
            alert("This is button " + i);
          };
        })(i)
        body.appendChild(button);
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


## this keyword

`this` is a reference holder that will refer to different values based on scope and how its called

When this is used in the global scope, it refers to the window object (unless in strict mode)
When 'this' is used in an object, it refers to the object its in.
When 'this' is used in an object's method, it refers to the parent of that method; the object.
When this is used in a standalone function it refers to the parent of that function, which will be the global window object.

In global scope, `this` refers to the window object;
this.table = "window table" //=> table became a public attribute of the window object
window.table //=> "window table"

This used in a global function (event if nested) will refer to the window object (when not in strict mode)
const cleanTable = function() {
console.log(`cleaning ${this.table}`) //=> 'cleaning window table'
}

When using this in functions, its best to make them arrow functions. That way the outer scope will be sought to define the context of this. Arrow functions have no binding to this.

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

call - someFunction.call(obj, arg1, arg2)

    var UI = {
      render: function (id = 0, section = 'body') {
        console.log(this.id, id, section)
      }
    }

    var post = {
      id: 1
    }

    UI.render.call(post, 2, 'footer')   //=> this will refer to post in UI.render

apply - someFunction.call(obj, [arg1, arg2])

    UI.render.apply(post, [2, 'footer'])

bind - someFunction.bind(obj) // unlike with call and apply, in bind, someFunction is not called right away. Its put into a variable to be called later

    let r = UI.render.bind(post)
    r()

More examples;

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

    let bob = function (num, str) {
      console.log('bob', num, str, this);
      return true;
    }

    let bill = {
      name: 'Bill Murray',
      movie: 'Lost in Translation',
      myMethod: function (fn, ...rest) {
        console.log(rest)
        // fn.call(bill, rest[0], rest[1])
        fn.apply(bill, rest)
      }
    }

    // console.log(bob(1, 'hello'))
    // console.log(bob.call(bill, 1, 'hey there'))
    // console.log(bob.apply(bill, [2, 'yo there']))
    // console.log(bill.myMethod(bob, 3, 'hi'))

Bind:

    let bob = function (num, str, x) {
      console.log('bob', num, str, this, x);
      return true;
    }

    let bill = {
      name: 'Bill Murray',
      movie: 'Lost in Translation',
    }

    let fred = bob.bind(bill, 5, 'ciao')   // prepared to be called later
    console.log(fred('K'))


// -----------------------------------------------------------------------
# Closures

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

Closures are nested functions with access to data from outer scope(s). Javascript has lexical scoping which allows variables defined in outer scopes to be available in nested scopes (unlike Ruby).

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

// Revealing module pattern; pattern to only expose certain object methods to the outside. _convention signifies a private variables

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

// Revealing module pattern; pattern to only expose certain object methods (_render) to the outside while keeping the others, such as _data, _add, and _remove hidden. (_convention signifies a private variable)

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
