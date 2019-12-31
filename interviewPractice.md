
## this keyword
`this` is a reference holder that will refer to different values based on scope and how its called

When this is used in the global scope, it refers to the window object (unless in strict mode)
When 'this' is used in an object, it refers to the object its in.
When 'this' is used in an object's method, it refers to the parent of that method; the object.
When this is used in a standalone function it refers to the parent of that function, which will be the global window object. 

In global scope, `this` refers to the window object;
    this.table = "window table"   //=> table became a public attribute of the window object
    window.table  //=> "window table" 

This used in a global function (event if nested) will refer to the window object (when not in strict mode)
    const cleanTable = function() {
        console.log(`cleaning ${this.table}`)    //=> 'cleaning window table'
    }

When using this in functions, its best to make them arrow functions. That way the outer scope will be sought to define the context of this. Arrow functions have no binding to this. 

In an object, this refers to the object
    let johnsRoom = {    //=> window.johnsRoom == undefined because johnsRoom is private
      table: 'johns table',
      cleanTable() {
        console.log(`cleaning ${this.table}`)   //=> johnsRoom.cleanTable() === 'cleaning johns table'
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

## Binding This

Often times a reference to a function is passed around as a variable. This loses its binding when referencing a method in which `this` is used. Arrow functions also don't keep track of this. 

We can explicitly assign the value of this by passing a bound reference where this will be used.

call - someFunction.call(obj, arg1, arg2)

    var UI = {
      render: function (id = 0, section = 'body') {
        console.log(this.id, id, section)
      }
    }

    var post = {
      id: 1
    }

    UI.render.call(post, 2, 'footer')

apply - 
bind - 

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



## Immediately Invoked Functions
IIFEs are functions that are executed upon creation. 

    (function doubleNumber(num) {
      console.log(num * 2)
    })(5)

## Closures
Closures are nested functions with access to data from outer scope(s). Javascript has lexical scoping which allows variables defined in outer scopes to be available in nested scopes (unlike Ruby). 

    const f = () => {
      let i = 1;
      return () => {
        console.log(i * 2)
      }
    }

    f()()   //=> logs 2

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