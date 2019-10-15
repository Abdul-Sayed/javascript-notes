
const beersURL = 'http://localhost:3000/beers';
const ulTag = document.querySelector('#list-group');
const beerDetailTag = document.querySelector('#beer-detail');

// Grab all beers from API and display. fetch only needs to run once
BeerAdapter.getBeers(beersURL)

.then(beers => {
	beers.forEach(beerObj => {
		const newBeer = new Beer(beerObj);
		ulTag.innerhtml += newBeer.renderLi()
	})
})

// Show beer details 
ulTag.addEventListener('click', event => {
	if (event.target.tagName === 'LI') {
		const beerId = parseInt(event.target.dataset.id);
		// Beer.find returns the Beer instance that matches the passed id
		const foundBeer = Beer.find(beerId);
		beerDetailTag.innerHTML = foundBeer.renderDetails() 
	}
})

// Update beer details
beerDetailTag.addEventListener('click', event => {
	if (event.target.innerText === 'Save') {
		const newDescription = event.target.parentElement.querySelector('textarea').value;
		const beerId = parseInt(event.target.dataset.id);
		const foundBeer = Beer.find(beerId);

		BeerAdapter.updateDescription(beersURL, beerId, newDescription)
		.then(updatedBeerObj => {
			foundBeer.description = updatedBeerObj.description
		})

	}
})


