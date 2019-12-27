## Class Syntax
class names are capitalized. The constructor function is the instance initializer; it creates instance objects. No functions should be written in the constructor. Methods within the class are instance methods, unless designated otherwise. 
	class Square {
		constructor(sideLength) {
			this.sideLength = sideLength;
		}
	
		area() {
			return this.sideLength * this.sideLength;
		}
	
		areaMessage() {
			return `The area of this square is ${this.area()}`;
		}
	}
	let square = new Square(5);
	square.area(); // => 25
	square.areaMessage(); // => LOG: The area of this square is 25

## <Named) Import and Export 

In src/animal.js, 
	export class Feline {
		constructor(type, legs) {
			this.type = type;
			this.legs = legs;
		}
		makeNoise(sound = 'Loud Noise') {
			return sound
		}
		get metaData() {
			return `Type: ${this.type}, Legs: ${this.legs}`
		}
	}

	export class Cat extends Feline {
		constructor(type, legs, lives) {
			super(type, legs);
			this.tail = tail;
		}

		makeNoise(sound = 'meow') {
			return sound
		}
	}

In src/index.js, 
	import { Feline, Cat } from './animal.js'
	
	let cat = new Cat('Cat', 4);

	console.log(cat.type)   //=> Cat
	console.log(cat.legs)   //=> 4
	console.log(cat.makeNoise())   //=> 'meow'
	console.log(cat.metaData)   //=> Type: Cat, Legs: 4



## Getter MEthods
Use for methods that only serve to retrieve data. Get methods read like properties (attribute readers), rather than like functions
	class Square {
		constructor(sideLength) {
			this.sideLength = sideLength;
		}
	
		get area() {
			return this.sideLength * this.sideLength;
		}
	}

	let square = new Square(5);
	square.sideLength; // => 5
	square.area; // => 25     The area method reads like a property

## Setter MEthods
Attribute writer methods 
	class Square {
		constructor(sideLength) {
			this.sideLength = sideLength;
		}
	
		get area() {
			return this.sideLength * this.sideLength;
		}
	
		set area(newArea) {
			this.sideLength = Math.sqrt(newArea);
		}
	}


	let square = new Square(5);
	square.sideLength; // => 5
	square.area; // => 25
	square.area = 64;
	square.sideLength; // => 8
	square.area; // => 64

## More Setter and Getter examples

  class Book {
    constructor(author) {
      this._author = author;
    }
    // getter
    get writer(){
      return this._author;
    }
    // setter
    set writer(updatedAuthor){
      this._author = updatedAuthor;
    }
  }
  const lol = new Book('anonymous');
  console.log(lol.writer);  // anonymous
  lol.writer = 'wut';
  console.log(lol.writer);  // wut

## Class MEthods 
These are used in classes containing helper methods, where no instance of it is needed
	class CommonMath {
		static triple(number) {
			return number * number * number;
		}
	
		static findHypotenuse(a, b) {
			return Math.sqrt(a * a + b * b);
		}
	}

	let num = CommonMath.triple(3);
	num; // => 27
	let c = CommonMath.findHypotenuse(3, 4);
	c; // => 5


## Example
We can use get and set whenever we are handling input or output of a class
Also, we can Keep track of all instances with .all

	class Student {
		constructor(firstName, lastName) {
			this._firstName = this.sanitize(firstName);
			this._lastName = this.sanitize(lastName);
			Student.all.push(this)
		}
	
		get firstName() {
			return this.capitalize(this._firstName);
		}
	
		set firstName(firstName) {
			this._firstName = this.sanitize(firstName);
		}
	
		capitalize(string) {
			// capitalizes first letter
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	
		sanitize(string) {
			// removes any non alpha-numeric characters except dash and single quotes (apostrophes)
			return string.replace(/[^A-Za-z0-9-']+/g, '');
		}
	}
	
	Student.all = []
	let student = new Student('Carr@ol-Ann', ')Freel*ing');
	student; // => Student { _firstName: 'Carrol-A


	## Inheritance 

    class Rectangle {
      constructor(length, width) {
        this.length = length;
        this.width = width;
      }

      get area() {
        return this.length * this.width
      }
    }

    class Square extends Rectangle {
      constructor(side) {
        super(side, side);
      }
    }

---
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
				super(name,age);     // Inherit the properties assigned in the parent with super
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



		class Polygon {
		constructor(sidesArray) {
			this.sidesArray = sidesArray
		}

		get countSides() {
			return this.sidesArray.length
		}

		get perimeter() {
			let sum = 0;
			this.sidesArray.forEach(side => {
				sum += side
			});
			return sum;
		}

	}


	class Triangle extends Polygon {
		... 
	}


	## Seperation of concerns file structure  --> see included files in src_example

For each class, create a seperate js file (in src folder).
Leave index.js to be strictly a run file.
Then, in index.html, write script tags (with defer attribute) above index.js script tag (which should be last)






