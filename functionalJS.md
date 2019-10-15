## Function Arguments Object
A function's own arguments can be accesed with the `arguments` keyword

	function func1(a, b, c) {
		console.log(arguments[0]);  // expected output: 1

		console.log(arguments[1]);  // expected output: 2

		console.log(arguments[2]);  // expected output: 3
	}

	func1(1, 2, 3);

----

## Array.includes

let numArray = [1,2,3,4,5]
console.log(numArray.includes(0))  //=> false
console.log(numArray.includes(2))  //=> true

----

## Array.from

Creates an iterable into an array

	console.log(Array.from('foo'));
	// expected output: Array ["f", "o", "o"]

----

## for-in loop
Loops through keys of an object (or indices of an array)
var text = "";
var person = { fname: "John", lname: "Doe", age: 25 };

for (const key in person) {
  text += person[key] + " ";
}
// must use bracket notation

## for-of loop

Loops through strings, arrays, and other iterables besides object literals

	let iterable = 'boo';

	for (let value of iterable) {
		console.log(value);  // "b" , "o" , "o"
	}


	let iterable = [10, 20, 30];

	for (let value of iterable) {
		value += 1;
		console.log(value);  // 11 , 21 , 31
	}

To use it over user-defined iterables; examine all of the parameters passed into a JavaScript function:

	(function() {
		for (let argument of arguments) {
			console.log(argument);  // 1 , 2 , 3
		}
	})(1, 2, 3);

To use it with Object literals, use

	const obj = { a: 'foo', z: 'bar', m: 'baz' };

	for (let value of Object.values(obj)) {
			console.log(value);  // 'foo' , 'bar' , 'baz'
	}

----

## Array.findIndex()

----

## Array.find() 

	let cars = [
			{make: "Ford", model: "E150", price: 10000},
			{make: "Chevy", model: "Camaro", price: 20010},
			{make: "Toyota", model: "Tacoma", price: 30900},
			{make: "Ford", model: "Explorer", price: 9000},
			{make: "Ford", model: "F250", price: 2400},
	]

	let fastCar = cars.find(car => {
			return car.model === "Camaro";
	})

## Array.every()
Returns true if condition is true for every iteration
	areAllCarsReasonablyPriced = cars.every(car => {
			return car.price < 15000
	})  //=> false

## Array.some() 
Returns true if one condition is true for whole iterable
	areSomeCarsReasonablyPriced = cars.some(car => {
			return car.price < 15000
	})

## Array.forEach()

	let numbers = [2,3,4,5,6];
	let doubled = [];

	numbers.forEach( (elem, indx, arr) => {
		elem = 2*elem;
		doubled.push(elem);
	})

	console.log(numbers);
	console.log(doubled);

The forEach() method executes a provided function once for each array element,
leaving the array unchanged

----

## Array.map()

	let numbers = [2,3,4,5,6];

	let doubled = numbers.map( n => 2*n)
Arra.map() executes a function on each array element
and returns the new resultant array

----

## Array.filter()
Works same as ruby .select 

	var cars = [
			{make: "Ford", model: "E150", price: 10000},
			{make: "Chevy", model: "Camaro", price: 20010},
			{make: "Toyota", model: "Tacoma", price: 30900},
			{make: "Ford", model: "Explorer", price: 9000},
			{make: "Ford", model: "F250", price: 2400},
	]

	let fords = cars.filter(car => {
			return car.make === "Ford";
	})

----

## Array.reduce()

	const trips = [{ distance: 34 }, { distance: 12 } , { distance: 1 }];

	let totalDistance = trips.reduce( (sum, trip) => {
			return sum += trip.distance;
	}, 0);

sum starts as the 0 supplied to reduce after the callback function

	const desks = [
		{ type: 'sitting' },
		{ type: 'standing' },
		{ type: 'sitting' },
		{ type: 'sitting' },
		{ type: 'standing' }
	];

	let deskTypes = desks.reduce( (previous, desk) => {
			if (desk.type === "sitting") previous.sitting++;
			if (desk.type === "standing") previous.standing++;
			return previous;
	}, { sitting: 0, standing: 0 });

previous starts as { sitting: 0, standing: 0 }


Return Unique elements of array;

	function unique(array) {
			return array.reduce( (previous, item) => {
					if(!previous.find(foundItem => item === foundItem )) {
							previous.push(item);
					}
					return previous;
			}, []);
	}

----

## Array.sort()

sort an array of objects by alphabet 

	Array.sort((obj1, obj2) => obj1.name.localeCompare(obj2.name))

sort an array ob ofjects numerically (ascending)

	Array.sort((obj1, obj2) => obj1[field] - obj2[field])

----

## Array.some()

----

## Array.every()