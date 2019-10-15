# Document Object Model

DOM is like the DNA of a webpage 
The DOM is created when the page loads from the HTML that the web server provides the browser.
With JavaScript we can view a current representation of our Document Object Model.

If you prepend 'view-source:' to a website's URL (or right click and select view source), you'll see the page's source HTML.
The browser reads this HTML, along with CSS and JavaScript, to create the DOM. The Document Object Model of the respective web page is what browsers display. 

You can modify the DOM, for example, by editing the page in the developer console. Doing so causes changes in the DOM, and therefore the page looks different as a result. However the original underlying HTML, which comes from the server (viewed by R clicking 'view source'), is left unaffected. The HTML never changes after it is first rendered. All you can do is access the Document Object Model, which alters the model and that alters the appearance of the web page. When we change the appearance of a web page, what we are really changing is the Document Object Model, which directly determines the appearance displayed in the browser. We can view and manipulate the Document Object Model by opening our developer tools, but when we do so the HTML is not changed.

The highest level of the DOM tree is the window object. Each browser tab has its own window object. The window contains the entire DOM document. All components of your HTML file will be accessible from within the window object. Both the document object and screen object are nested in it, as well as global variables declared with var. If used, the jQuery library becomes an object of the window object. window.document returns the entire HTML document. The document object represents any web page loaded in the browser. The document contains all the nodes that represent the HTML elements of the page. We use the document object to traverse through the HTML and manipulate elements.

With JavaScript's Document Object Model API we can also select specific portions of the DOM, and manipulate them, which changes what shows up in a browser window.

----

# Ensure Javascript runs AFTER the HTML loads and the Document is ready

Use the defer attribute when inserting JS into HTML

	<script src="index.js" defer></script>

Encase all code in the attached JS files with:

	if (document.readyState == 'loading') {
			document.addEventListener('DomContentLoaded', ready)
	} else {
			ready();
	}

	function ready() {

		//  Insert all code here ....

	}


==============================



----
# DOM Hierarchy
The server turns the index.html response string into a data structure. 

A DOM node can have unlimited children but only one parent 
Child nodes are obtained by; element.children, Parent node by element.ParentElement 


# DOM API Methods

## DOM manipulation workflow;
1. Create blanck element 
2. Add stuff to that element (text, styles, attributes)
3. Slap it on the DOM (append it to the body or another element)

## Create elements from scratch

There is a whole set of functions that you can use to create entirely new elements and add them to the page.
To create a new element, use the aptly named createElement:
	var imgEl = document.createElement("img");
	imgEl.src = "https://www.kasandbox.org/programming-images/animals/cat.png";
	imgEl.alt = "Photo of cute cat";

This creates <img src="https://www.kasandbox.org/programming-images/animals/cat.png" alt="Photo of cute cat">

To append it to the page, call append on the target parent element:
	document.body.append(imgEl);  //=> add imgEl to bottom of body
	document.body.prepend(imgEl);  //=> add imgEl to top of body

append() accepts multiple arguments, and appenChild() accepts only one

This adds it to the end of the page. You can make some elements nested children of other elements;
		var1.append(var2);

Similarly, you can also use insertBefore, replaceChild, removeChild, and insertAdjacentHTML.


## Modifying attributes
You can set an attribute on an element by setting the property of the same name. For example, to change the src of an <img>:
	imgEl.src = "http://www.dogs.com/dog.gif";
In addition, you can also use the setAttribute method, like so:
	imgEl.setAttribute("src", "http://www.dogs.com/dog.gif");

If you want to remove an attribute, you should do that with removeAttribute - like to remove the disabled attribute off a button, effectively enabling it:
	imgEl.removeAttribute("disabled");


## Remove elements with element.remove();
		document.querySelector('header').remove()

To remove the 2nd <li> from <ul>
		ul.removeChild(ul.querySelector('li:nth-child(2)'));

		
## Make text appear in the page
		document.body.innerHTML = "Some text here";
To completely replace the contents of an element with an arbitrary string of HTML, use innerHTML:
	mainEl.innerHTML = "cats are the <strong>cutest</strong>";
This is useful inside an iteration to populate HTML dynamically from an iteration 
	ulTag.innerHTML += `<li><p>${compliments[i]}</p></li>`

If you don't need to pass in HTML tags, you should use textContent (recommended) or innerText instead:
	mainEl.textContent = "cats are the cutest";

## Target elements by tag;
		var spanTexts = document.getElementsByTagName("span");
This returns an HTML collection of all span tags. You can alter anything in these span tags by;
		spanText.innerHTML = "changed content"

If there are multiple span tags, you'll have to loop through the array-like HTML collection;
		for(i=0;i<spanTexts.length;i++) {
			spanTexts[i].innerHTML = "changed content within all span tags"
		}

## Target images, links;
		var images = document.getElementsByTagName("img");
			for (var i = 0; i < images.length; i++) {
				images[i].src = "http://www.newImageURL.com";
			}

		var links = document.querySelectorAll("a .link");
			for (var i = 0; i < links.length; i++) {
				links[i].src = "http://www.newLink.com";
			}

## Access Elements by name attrinbute 

	document.getElementByName('name')
## Access an element with an id (id s are uniquely assigned to html tags);
		var heading = document.getElementById("heading");
It returns an HTML DOM node and assigns it to the variable heading. You can call methods on the instance heading such as heading.text to grab any text in the element with #heading. 

Heading's HTML can then be modified by 
		heading.innerHTML = "New Heading..."
If only text will be written, use
		heading.textContent = "New Heading..."

## Target elements by class name
		var classVariable = document.getElementsByClassName("classWrittenHere");
getElementsByClassName returns an HTML collection
Just like if the're multiple tags, the classVariable is looped through to modify each class instance.

## Target element using the general querySelector. Select by tagname, classes, ids, CSS selectors. Combinators can be used as well;
This returns a NodeList, which has more methods that can be called on it compared to an HTML collection (like forEach). 
		document.querySelectorAll("p className")
This is for cases where there are multiple elements being selected, so a loop is again required. For a single element, 
		document.querySelector("#idName or .singleClass");

		document.querySelector('header')

Note that since querySelector/querySelectorAll select a variety of elements, its necessary to prepend class or id names with . or #


## Change CSS classes

You can change styles just like how you change attributes, by accessing the style property of the element, and setting the corresponding property. For example, to change the color:
	headingEl.style.color = "hotpink";                                                                                                                                                                                                                                   
Remember to "camelCase" the multi-word CSS property names, since hyphens are not valid JS property names:
	headingEl.style.backgroundColor = "salmon";

Instead of adding styles in JS, you can assign a predefined CSS class;
		<style>
			.catcolors {
					color: orange;
					background-color: black;
			}
		</style>
		...
		<script>
Assign .catcolors class to #heading element;
		var headingEl = document.querySelector("#heading");
		headingEl.className = "catcolors";
Add another class to an element if it already has a class
		var nameEls = document.querySelectorAll("p .animal");
			for (var i = 0; i < nameEls.length; i++) {
					nameEls[i].classList.add("catcolors");
			}
		</script>

Manipulate the style attribute of the elements to change the CSS. Camel case is used where CSS properties have dashes.
		var headingEl = document.querySelector("#heading");
		headingEl.style.color = "orange";
		headingEl.style.backgroundColor = "black";
		headingEl.style.textAlign = "center";

----

## Dom Events

## The browser triggers many events. A full list is available in MDN, but here are some of the most common event types and event names:
mouse events (MouseEvent): 
    mousedown, mouseup, click, dblclick, mousemove, mouseover, mousewheel, mouseout, contextmenu
touch events (TouchEvent): 
    touchstart, touchmove, touchend, touchcancel
keyboard events (KeyboardEvent): 
    keydown, keypress, keyup
form events: 
    focus, blur, change, submit
window events: 
		scroll, resize, hashchange, load, unload

## Steps

1. Find and store the element we want to listen to events on.
    var clickerButton = document.getElementById("clicker");

2. Define the function expression that will respond to the event.

    var onButtonClick = function() {
			clickerButton.textContent = "Oh wow, you clicked me!";
    };

3. Add the event listener for the element and function; addEventListener() takes two arguments: 
a) the name of the event, 
b) a callback function to "handle" the event
		clickerButton.addEventListener("click", onButtonClick);
The first argument of the event listener is the event type. 
The second argument is the named function (defined elsewhere). Notice there are no parenthesis for the function.
Including them would make the function execute immediately, even before the click.
Not including parenthesis, the code refers to the function only upon click. 

Remove the event listener 
	clickerButton.removeEventListener("click", onButtonClick);

4. The anonymous "inline" way of writing the event listener is
		clickerButton.addEventListener("click", function() {
			clickerButton.textContent = "Oh wow, you clicked me!";
    };);


	const input = document.querySelector('.input')
	
	input.addEventListener('keydown', function(e) {
		if (e.key === "g") {
			return e.preventDefault()
		} else {
			console.log(e.key)
		}
	});

preventDefault is a function that, when called, will prevent the event from taking place.
stopPropagation is a function that stops the event from triggering other nodes in the DOM that might be listening for the same event.


## Event Delegation  => delegate attributes based on the event 
1) Add an event listener to a parent element 
2) Style an adjacent sibling of target

document.querySelector('ul').addEventListener('mouseover', (event) => {
	if event.target.tagname === "LI" {
		// event.target.parentElement.querySelector('button').style.backgroundColor = 'pink'
		event.target.previousElementSibling.style.backgroundColor = 'pink'
	}
})



## Using Data Set
In HTML, 
	<cite data-hug-count = 0;>Hugged 0 times</cite>
Then in the JS, 
	let updatedHugCount = parseInt(cite.dataset.hugCount);
	updatedHugCount++
	cite.dataset.hugCount = updatedHugCount;
	cite.innerHTML = `<cite>Hugged ${updatedHugCount} times</cite>`

