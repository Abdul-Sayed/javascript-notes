
# Loading Javascript

Javascript is included in HTML via the <script> tag. The script tag is usually inserted just before the close of the body tag. This is to ensure that all the UI content loads before the javascript. Otherwise UI loading would be paused until all the Javascript loaded and ran. 

This could also be acheived while keeping all the <script> tags in the HTML HEAD by using the defer attribute.  Javascript will wait until all the HTML is parsed before running. 

<script defer type="text/javascript" src="largeFile.js"></script>



# Javascript APIs

Most development you do, and the code you write in text editors, is with Javascript's console API. This is why the output appears in the console tab of chrome developer tools. The methods below work with the console API. 

(Manipulating the DOM is done with Javascript's DOM API)

## Find data type 

	variable.typeof

## Javascript Date Object 

	new Date().toLocaleTimeString()

## JavaScript Scope

To determine a variable's scope in JavaScript, ask yourself two questions:
1. Is it declared inside a function?
2. Is it declared with the `var` keyword?
Variables declared with var are only available within that function's scope. Variables declared without var attach themselves to the global object.

	var log = console.log()

	var x = 1; 

	function myFunction(){
			y = 2;    // This makes y global, even through its written inside a function 
			console.log(x);
		}

	log(myFunction())

	log(y)

This will run, but if `log(myFunction())` is written after `log(y)`, then it will crash

Variables local to a function are not available outside that function

	var animal = 'dog';
	
	function makeZoo() {
		var animal = 'cat';
	
		console.log(`I think I'll put this ${animal} in the zoo.`);
	}
	
	makeZoo(); // "I think I'll put this cat in the zoo."
	
	log(animal) // "dog" ; the var animal = 'cat' is only valid inside the function

Functions that nest functions have to be double called

	var funkyFunction = function() {
		return function() {
			return "FUNKY!"
		}
	}

	var theFunk = funkyFunction()();  // "FUNKY!"

----
## Conditionals

	var greeting;
	var time = new Date().getHours();
	if (time < 12) {
		greeting = "Good morning";
	} else if (time < 17) {
		greeting = "Good day";
	} else {
		greeting = "Good evening";
	}


## Truthy and Falsy
Falsy values: undefined, null, 0, "", NaN  
Truthy values: NOT falsy values  
Truthy and falsy values can be converted to hard true or false be prepending with !!
       
		var height = 0
		if (height) {
		console.log('Variable is defined')
		}
		else {
		console.log('Variable is not defined')
		}
To correct this, use  

		if (height || height === 0)


----

## Loops and Iterators

### for loops

Use a for loop when you know how many times you want the loop to run (for example, when you have an array of known size).

	for ([counter initialization]; [condition]; [iteration]) {
		[loopBody];
	}

[counter initialization] is typically used to declare a counter variable
[condition] is an expression evaluated before each loop iteration. Loop proceeds if evaluates to true
[iteration] is executed at the end of each iteration. Increments or decrements a counter, bringing the loop towards its end
[loopBody] is code which runs on every iteration as long as the condition evaluates to true

	var step;
	for (let step = 0; step < 5; step++) {
		console.log('Walking east one step');   // Runs 5 times, with values of step 0 through 4.
	}

Alternative for-in loop  

var person = { fname: "John", lname: "Doe", age: 25 };

var text = "";
for (const key in person) {
  text += person[key] + " ";
}
must use bracket notation

Alternative for-of loop (works with arrays and maps, not plain objects)

	const iterable = ['mini', 'mani', 'mo'];

	for (const value of iterable) {
		console.log(value);
	}

Alternative forEach 

	const arr = ['cat', 'dog', 'fish'];
	arr.forEach(element => {
		console.log(element);
	});
Leaves original array intact


### while loops

A while loop can also be used instead of a for loop if you know how many times to loop;
A while loop (conditional loop) is best used when we don't know how many times a loop needs to run - that is, the condition is dependent on a dynamic function/return value. So the body of the loop might _never_ run! 

	[counter initialization]

	while ([condition]) {
		[loopBody];
		[iteration]
	}

	let i = 0;
	while (i < 3) { // shows 0, then 1, then 2
		alert( i );
		i++;
	}

### do-while loops

 The loop's body is executed at least once before the condition is tested.

 [counter initialization]
	do {
		[loopBody + iteration];
	} while ([condition]);

	let i = 0;
	do {
		alert( i );
		i++;
	} while (i < 3);

### Loop Iterators

You should use i+=1 or i-=1 when iterating in loops. i++ and i-- can introduce bugs.

	for (var i=10; i>1; i-=1) {
			log(i);
	}
----


## Arrays

An array is an ordered list of items (called "elements" of the array) separated by commas.

### Array Literal Syntax

	var myArray = [element0, element1, ..., elementN];

### Array Constructor Syntax

	var evenNumbers = new Array();	

### Array Methods


#### Array.push() 

The push() method adds new items to the end of an array, changing the array. It returns the length of the modified array.

	array.push(item1, item2, ..., itemX)


	var animals = ['pigs', 'goats', 'sheep'];

	// Note: console.log(animals.push('cows')) returns the length of the modified array; 4. Instead seperate the push command from the use statement

	animals.push('cows');
	console.log(animals);  // ["pigs", "goats", "sheep", "cows"]

#### Array.unshift() 

The unshift() method adds new items to the beginning of an array, changing the array. It returns the length of the modified array.

	array.unshift(item1, item2, ..., itemX)


	function myArray(arr, elem) {
			arr.unshift(elem);
			return arr;

			// Note: return arr.unshift(elem) would just give the length of the modified array. Instead seperate the unshift command from the use statement
	}

	let result = myArray( ['foo', 1], 2 );  // [2, "foo", 1]

#### Array.pop() 

The pop() method removes the last element from an array, changing the array. It returns that removed element.

	array.pop()


	var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];


	plants.pop();
	console.log(plants);  // ["broccoli", "cauliflower", "cabbage", "kale"]

	let bitterGreen = plants.pop()
	console.log(bitterGreen);  // 'kale', the 1st plants.pop() already took off 'tomato'

#### Array.shift() 

The shift() method removes the first element from an array, changing the array. It returns that removed element.

	arr.shift()


	var array1 = [1, 2, 3, 4, 5];

	array1.shift();
	console.log(array1.shift());  // 1
	console.log(array1);  // [2, 3, 4, 5]


#### Array.concat()

The concat() method is used to append one or more arrays to an array. Returns a new array containing the values of the joined arrays. Leaves the original arrays intact. 

	array1.concat(array2, array3, ..., arrayX)

	var array1 = ['a', 'b', 'c'];
	var array2 = ['d', 'e', 'f'];

	console.log(array1.concat(array2))  // ["a", "b", "c", "d", "e", "f"]


#### Array.slice()

/** WARNING: MAKE SURE YOU SPELL SLICE() CORRECTLY. DONT WRITE SPLICE() BY ACCIDENT  **/

For returning a slice (portion) of an array. Array.slice(startIndex, endIndex) returns an extracted array leaving the original array unchanged. 

	array.slice(startIndex, endIndex)

startIndex: An integer that specifies where to start the selection (inclusive). Use negative numbers to select from the end of an array. If omitted, it acts like "0"

endIndex: An integer that specifies where to end the selection (exclusive). If omitted, all elements from the start position and to the end of the array will be selected. Use negative numbers to select from the end of an array (last item is index -1)

	var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
	var citrus = fruits.slice(1, 3); // Orange,Lemon

	var cats = ["Persian", "Siamese", "Sphynx", "Leopard", "Lion", "Tiger"];

	var bigCats = cats.slice(3); // ["Leopard", "Lion", "Tiger"]

	log(cats); // ["Persian", "Siamese", "Sphynx", "Leopard", "Lion", "Tiger"]
	log(bigCats);

Grab items starting from the end on an array using negative index;

	var biggestCats = cats.slice(-3);
	log(biggestCats);

You can also pick apart an array leaving out what you dont want.

	var items = [1, 2, 3, 4, 5]  // discard the 3th element (index 2) and return the rest

	var newItems = [...items.slice(0,2), ...items.slice(3)]  // [1, 2, 4, 5]


#### Array.splice()

/** WARNING: MAKE SURE YOU SPELL SPLICE() CORRECTLY. DONT USE SLICE() ACCIDENTLY  **/

The splice() method adds/removes items to/from an array, and returns the removed item(s) (if any are removed). Array.splice modifies the original array.

	array.splice(index, howManyToRemove, item1ToAdd, ....., itemXToAdd)

index (required): An integer that specifies at what (inclusive) position to add/remove items, Use negative values to specify the position from the end of the array (last item is index -1)

howmany (optional): The number of items to be removed. Set to the # of items your removing. If set to 0, items will be added, and splice will return an empty array 

item1, ..., itemX (optional): The new item(s) to be added to the array. New items can also be added if items were removed. 


----

## Objects

An object is a list of key: value pairs, like a dictionary is a list of unique words and associated definition pairs. Keys are strings. Pass in string keys. Number keys get coerced into strings. 

### Object Literal Syntax

	var meals = { key: value };

### Object Constructor Syntax

	var meals = new Object( { key: value } );

### Referencing Object Properties

Add, update properties

	var meals = { breakfast: 'oatmeal' }
	meals.lunch = 'burrito'  // add new property
	meals.breakfast = 'cereal'  // update a property
	meals['second breakfast'] = 'bagel'  // use ['key name'] when dealing with multiple word keys
	delete meals['second breakfast']  // delete a property

Accessing properties

	var meals = { firstMeal: 'oatmeal' }
Access 'oatmeal' using dot syntax or bracket syntax
Square-bracket syntax requires quotes if referencing the key directly
	log(meals.firstMeal) or log(meals["firstMeal"]);

Syntax when key is a variable. Useful inside functions where objects use parameters as keys. 
	const firstMeal = 'breakfast'
	var meals = { [firstMeal]: "oatmeal" }	// { breakfast: oatmeal }
The variable firstMeal resolves to its value, breakfast, when inside []
	meals.breakfast or meals['breakfast'] or meals[firstMeal]  // "oatmeal"

	var sweetMeal = 'dessert'
	meals[sweetMeal] = 'cake';  // [sweetMeal] evaluates to dessert
	meals  // {breakfast: "oatmeal", dessert: "cake"}

	meals.dessert  or  meals["dessert"]  or  meals[sweetMeal]  // 'cake'

*****     *****     *****
Note: When you pass in a variable key to an object, use [key]. Just make sure that the key is of data type string. 
*****     *****     *****

### Object Methods  

#### Object.keys()

The Object.keys() method returns an array of a given object's own property keys, instead of using a normal loop.

	const object1 = {
		a: 'somestring',
		b: 42,
		c: false
	};

	console.log(Object.keys(object1));  // ["a", "b", "c"]

----

#### Object.assign()

The Object.assign() method is used to copy the values of all properties from one or more source objects to a target object. It Returns the target object.

	const target = { };  // Note: The target and source objects must be pre declared
	const source = { b: 4, c: 5 };

	Object.assign(target, source);  // target === {b: 4, c: 5}

The source object also overwrites conflicting properties (and later source objects overwrite earlier ones);

	const target = { a: 1, b: 2 };  const source = { b: 4, c: 5 };
	Object.assign(target, source);  // target === { a: 1, b: 4, c: 5 }

Example with two source objects. Note the target can be written as {}, and the 2nd source obj is rewriting flour

	let target = Object.assign( { }, { chocolate: '1 cup', flour: '2 cups' }, { flour: '1/2 cup' }, { eggs: 3 } )
	target  // {chocolate: "1 cup", flour: "1/2 cup", eggs: 3}


----

## Functions

Parameters are placeholders that we put between the parentheses when declaring a function. When we invoke that function, we can pass arguments to the invocation that get stored as local, function-level variables that are available anywhere in the function body. Essentially, the arguments are the actual values that we pass to the function, and the parameters are the named references where we store those passed-in values

Functions with no return statement return undefined. 

> Function Declarations
Declared functions are not executed immediately. They are "saved for later use", and will be executed later, when they are invoked (called upon).
		function myFunction(a, b) {
			return a * b;
		}

> Function Expressions
In a function expression, the function name is stored in a variable which is used to invoke the function (anonymous function)
		var myFunction = function (a, b) {
			return a * b
		};
Or
		let myFunction = (a,b) => a*b; 

Named function expressions 

    var fibo = function fibonacci() {
        // inside you can use "fibonacci()" here as this funciton expression has a name.
    };

    // Outside here, fibonacci() fails, but fibo() works.


> Immediately Invoked Functions
IIFEs are useful to protect overwriting global variables as everything in the IIFE block is scoped locally. 
Good for encapsulation

	var somethingElse = (function(nm) {
		return {
			"name": nm,
			"id": 123,
			x: function() {
				return "nested"
			}
		};
	})("Bob");

somethingelse is an IIFE which returns an object
IIFs are invoked upon declaration
() already written in declaration, so no need to re-invoke somethingElse()
	console.log(somethingElse);
	console.log(somethingElse.name);
	console.log(somethingElse.x())
----

## Scoping
Variables defined in a block are not accessible in higher scopes. But variables defined in ancestor scopes are defined in descendant scopes. 

### Lexical Scoping 

Functions that use variables not defined in their blocks look for those variable definitions in successive scopes above the scope where the function is defined (not where the function is invoked);

	const myVar = 'Foo';

	function first() {
		console.log('Inside first()');

		console.log('myVar is currently equal to:', myVar);
	}

	function second() {
		const myVar = 'Bar';

		first();
	}

Invoking second() will return 'Foo' because myVar = 'Foo' in the parent scope of where first() is defined (not invoked)
Therefore to return 'Bar', the parent scope of first() must be second();

	const myVar = 'Foo';

	function second() {
		function first() {
			console.log('Inside first()');

			console.log('myVar is currently equal to:', myVar);
		}

		const myVar = 'Bar';

		first();
	}

### Hoisting 

// Declaration:
let hello;
 
// Assignment:
hello = 'World!';
 
// Declaration and assignment on the same line
let goodnight = 'Moon';

// Function Declaration
function myFunc () {
  return 'Hello, world!';
}

Variable assignments must be written above where they are read (consumed)

Javascript first goes through a compilation phase where it skips over all executions (variable reads, variable assignations, function invocations) and looks to declarations (variable and function declarations). Then it skips over declarations and runs the executions. 

So function declarations don't have to be written above where they are invoked. 

However, its best practice to declare functions at the top of their scope (before they are invoked). Same for variables; declare and assign them at the top of their scope using const or let, before they are consumed. 
----

## Objects

Objects have properties (state variables) and methods (behavior) 
Object Constructor 
       
	function Person(name, age) {
		this.name = name;
		this.age = age;
	}
Create instances of the Constructor;

	var friend = new Person("Peter", 33);

Here's onother quick way to initialize objects;
	let friend = {
		name:"Peter",
		age:33,
		sayName: function() {
			return 'His name is ' + this.name;
		}
	};
Then use the object normally;
	console.log(friend.name);
	console.log(friend.sayName());



	function Person(name, age) {
			this.name = name;
			this.age = age;
			this.yearsUntilRetirement: yearsLeft;
	}

	yearsLeft() {
			return 65 - this.age;
	}

	var friend = new person("Peter", 33);

	console.log(friend.yearsUntilRetirement());

----

## Object Scope

	var user = "Global";

	function sayHi() {
		var user = "Local";
		alert(window.user); 
	}
	sayHi();
	
sayHi() returns/alerts window.user. Window is a global object, therefore its methods
are scoped globally, not locally. Therefore 'Global' is returned. 


	var person = {
		name: 'Ryan',
		hobbies: ['Robots', 'Computers', 'Internet'],
		showHobbies: function() {
			this.hobbies.forEach(function(hobby) {
				console.log(`${this.name} likes ${hobby}`)
			})
		}
	}

	console.log(person.showHobbies());
Throws an error because this.name in showHobbies() is too nested to refer to person.name

Solution: create an intermediary that references the object;

	var person = {
		name: 'Ryan',
		hobbies: ['Robots', 'Computers', 'Internet'],
		showHobbies: function() {
			var self = this;
			this.hobbies.forEach(function(hobby) {
				console.log(`${self.name} likes ${hobby}`)
			})
		}
	}

Or just use ES6 arrow notation
	

## Check if a key exists in an Object

True if the key exists in obj, regardless the data type
	obj.hasOwnProperty("key") or  key" in obj   

	var person = {
		name: 'Ryan',
		hobbies: ['Robots', 'Computers', 'Internet']
	}
	person.hasOwnProperty('name')   //  true
	'name' in person   // true 


You can also check if a built in Javascript method exist. If it does, it'll be on the window global object.

	if (window.XMLHttpRequest) {
		alert('XMLHttpRequest exists!')
	}

----

## Associative Arrays
    // These arrays name each index rather than use the default numbering system
    var bucky = new Array();
		bucky["color"] = "blue;
		bucky["food"] = "Hot Pocket";

		console.log("My fav food is " + bucky["food"]);
----

## Classes and Inheritance
		class Person {
			Constructor(name,age) {
				this.name = name;
				this.age = age;
			}
			displayName() {
				console.log(this.name);
			}
			displayAge() {
				console.log(this.age);
			}
		}

Inherit one class into another class with extends
		class Programmer extends Person {
			Constructor(name,age,language) {
				// Inherit the parent's properties with super
				super(name,age);
				this.language = language;
			}
			displayLanguage() {
				console.log(this.language);
			}
		}

		let sally = new Person('sally', 21);
		sally.displayName();
		sally.displayAge();

		let robert = new Programmer('robert',25,'Javascript');
		robert.displayLanguage();
----


## Javascript Timers

setTimeOut() runs once and takes a function to execute after a specified time
	function log(msg) {
		console.log('message:', msg)
	}

	setTimeOut(log, 1000, 'Hello');  // function to delay, time to delay by, argument() to pass to function

You can kill the operation with clearTimeout; 
	let timmy = setTimeOut(log, 1000, 'Hello');
	clearTimeout(timmy);  // timmy() will cancel before the 1000ms it needs to start

setInterval() takes a function and runs repeatedly after a specified period
	let tommy = setInterval(log, 500, 'Goodbye');

setInterval() is killed with clearInterval()
	clearInterval(tommy)



----

## this keyword

When 'this' is used in an object, it refers to the object its in.
When 'this' is used in an object's method, it refers to the parent of that method; the object.
When this is used in a standalone function it refers to the parent of that function, which will be the global window object. 

----

## Closures
Javascript closures allow variables in the outer scope to be accessables inside a block (not the case in other languages)

  const myName = 'Kyle'

  function printName() {
    console.log(myName)
  }

  printName()


  --------

  ## error handling
  try {
    // tryCode - Block of code to try
    s = s.split("").reverse().join('');
  }
  catch (err) {
    // catchCode - Block of code to handle errors
    console.log(err)
  }
  finally {
    //  finallyCode - Block of code to be executed regardless of the try / catch result
    return s
  }

  ### create custom erros with throw 

  function isPositive(a) {
  try {
    if (a > 0) {
      return "YES"
    }
    else if (a === 0) {
      throw "Zero Error"
    } else {
      throw "Negative Error"
    }
  }
  catch (err) {
    return `the error is: ${err}`
  }
}