## String Template Literals
	`My favorite food is ${foodVariable} because 
	it smells nice'

The newline formatting is preserved

## Arrow Functions

	function circleArea(r) {
		return Math.PI*Math.pow(r,2);	
	}

With Arrow Functions, this becomes
	let circleArea2 = r => Math.PI*Math.pow(r,2);

Syntax for two or more parameters
	let rectanglePerimeter = (l,w) => (2*l + 2*w)

	var time = function() {
		return new Date();
	};
Becomes
	let time = () => new Date();

If the code block is multiple lines, wrap code in { }, and use return statement

----

## Let , Const Keywords

Var is scoped globally. Both function declarations and function expressions initialized with var become part of the global namespace, unlike variables declared with let/const. With var, the scope is not limited to the block in which its defined. 

Let, Const are block scoped (any block like for loop, etc) - and not in the surrounding function or global context outside that block. With each pass of the block, a new variable is made with let.   

Declaring variables with let confines those variable definitions to the code block where they're written. Outside that code block, the variables are undefined. Declaring variables with let allows them to be reassigned but not redeclared. Use let for counter variables in iterators. 

Declaring primitive variables with const prevents them from being reassigned. const should be used always except where the value needs to change suach as in iterables. Iterables or Objects made with const can still be modified, just not re-assigned.

  {
		var name = 'Ryan';
	}
	console.log(name);  // logs Ryan

	{
		let name = 'Ryan';
	}
	console.log(name);  // logs undefined

In a global context, var attaches variables to the window object, unlike let
    var color = 'red';  //=> window.color == 'red
    let age = 30;  //=> window.age == undefined

----



## Object Literals

	const red = '#ff0000';
	const blue = '#0000ff';

	const COLORS = { red: red, blue: blue };
becomes 
	const colors = { red, blue };


	const fields = ['firstName', 'lastName', 'phoneNumber'];
				
	const props = { fields: fields };
becomes
	const props = { fields };

	----

## Object Methods 

	const color = 'red';

	const Car = {
		color: color,
		drive: function() {
			return 'Vroom!';
		},
		getColor: function() {
			return this.color;
		}
	};

method becoms;

	const Car = {
		color,
		drive() {
			return 'Vroom!';
		},
		getColor() {
			return this.color;
		}
	};

----

## Make an object immutable
An object made with const can still be updated. To make it locked from updating, use
		Object.freeze(object_Name)

----

## Spread Operator
The spread operator spreads (expands) an iterable's elements into a list

	let str = "Hello";
	console.log(...str); // H e l l o

The spread operator can be used to merge arrays:
	let arr = [3, 5, 1];
	let arr2 = [8, 9, 15];

	let merged = [0, ...arr, 2, ...arr2];
	alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)

The spread operator is used to pass an array to functions that normally require a list of many arguments.
	let arr = [3, 5, 1];
	alert( Math.max(...arr) ); //=> 5 (spread turns array into a list of arguments)

Spread operator for objects

	const personOne = {
		name: 'Kyle',
		age: 24,
		address: {
			city: 'Somewhere',
			state: 'One of those cities'
		}
	}

	const personTwo = {
		age: 32,
		favoriteFood: 'Watermelon'
	}

	const personthree = { ...personOne, ...personTwo }  //=> {name: 'Kyle', age: 32, address: {...}, favoriteFood: 'Watermelon' }

	function printUser( { name, age } ) {
		console.log(`name is ${name}, age is ${age}`) 
	}

	printUser(personOne)  //=> name is Kyle, age is 24

---

## Rest Operator

The Rest Operator collapses a variable number of arguments into an array. Opposite of spread, but used at the end of function parameters only    
Its useful for functions that can accept an arbitrary number of parameters

	function list(...nums) {
		console.log(nums);  //=> [2,3,4,5,7]
	}

	list(2,3,4,5,7)



	function sumAll(...args) { // args is the name for the array
		console.log(args.length);
		let sum = 0;
		for (let arg of args) sum += arg;
		return sum;
	}

	alert( sumAll(1) ); // 1
	alert( sumAll(1, 2) ); // 3
	alert( sumAll(1, 2, 3) ); // 6

The function can expect both variables and a rest parameter (at the end);

	function showWaitList(first, second, ...rest) {
			console.log('VIPs are ' + 'first + ' and ' + 'second'); // VIPs are Mary and Albert

			// Further arguments go into the rest array
			// i.e. rest = ["Raymond", "Jeff"]
			console.log(rest[0]); // Raymond
			console.log(rest[1]); // Jeff
			console.log(rest.length); // 2
	}

	showWaitList("Mary", "Albert", "Raymond", "Jeff");

---

## Array Destructuring

Used to unpack an array into variables. Assignments made based on the array position

	var tenses = ["me", "you", "he"]
	var [ firstPerson, secondPerson, thirdPerson ] = tenses;
Or simply
[ firstPerson, secondPerson, thirdPerson ] = ["me", "you", "he"];

	console.log(firstPerson)  // "me"
	console.log(secondPerson)  // "you"
	console.log(thirdPerson)  // "he"

Ignore elements using commas; 3rd and 4th elements skipped. The rest beyond the 5th element are also skipped if theres nothing to assign them to
	const [a, b, , , c] = [1, 2, 3, 4, 5, 6, 7];
	console.log(a, b, c); // 1, 2, 5

	const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
	console.log(a, b); // 1, 2
	console.log(arr); // [3, 4, 5, 7]

---

## Object Destructuring

Used to unpack an object into variables. Assignments made based on the key name


const expense = {
  type: "Business",
  amount: "$45 USD"
};

const { type, amount } = expense;



	const personalInformation = {
		firstName: 'Dylan',
		lastName: 'Israel',
		stack: 'MEAN',
		address: {
			city: 'Austin',
			state: 'Texas'
		}
	}

	const { firstName:nickName, lastName, ...rest } = personalInformation
	const { address: {city} } = personalInformation

// => firstName, nickName == 'Dylan', lastName = 'Israel', rest = {stack: 'MEAN', address: {city: 'Austin', state: 'Texas'}}
//=> city = 'Austin'
Note: firstName or nickName both receive the value 'Dylan'


Destructuring within a function's parameter;

	const stats = {
		max: 56.78,
		standard_deviation: 4.34,
		median: 34.54,
		mode: 23.87,
		min: -0.75,
		average: 35.85
	};
	const half = (function () {

			return function half( { max, min } ) {  
					return (max + min) / 2.0;
			};

	})();
	console.log(stats); // should be object
	console.log(half(stats)); // should be 28.015


----

## Default parameters

 The default parameter kicks in when the argument is not specified (it is undefined). The parameter name will receive its default value,
 in this case "Anonymous", when you do not provide a value for the parameter. 

	function greeting(name = "Anonymous") {
		return "Hello " + name;
	}
	console.log(greeting("John")); // Hello John
	console.log(greeting()); // Hello Anonymous

----

## Generators
These are functions that pause at each yeild and continue with next()
		function* getNextId() {
			let id=0;
			while(id<3) {
				yield id++;
			}
		}

		let createUser = getNextId();
		console.log(createUser.next()); // returns 0
		console.log(createUser.next()); // returns 1
		console.log(createUser.next()); // returns 2
		console.log(createUser.next()); // returns undefined
----

## Sets 



## Truthy Operand
When all values are true/truthy; the last value is returned
	true && false //=> false
	true && 'Hi' //=> 'Hi'
	true && 'Hi' && 1 //=> 1

## Conditional (Ternary) Operator
Syntax:
	condition ? statement-if-true : statement-if-false;

	function findGreater(a, b) {
		return a > b ? "a is greater" : "b is greater";
	}
Replaces
	function findGreater(a, b) {
		if(a > b) {
			return "a is greater";
		}
		else {
			return "b is greater";
		}
	}
For multiple conditions;
	function findGreaterOrEqual(a, b) {
		return (a === b) ? "a and b are equal" : (a > b) ? "a is greater" : "b is greater";
	}
Replaces
	function findGreaterOrEqual(a, b) {
		if(a === b) {
			return "a and b are equal";
		}
		else if(a > b) {
			return "a is greater";
		}
		else {
			return "b is greater";
		}
	}