class BeerAdapter {

	static getBeers(beersURL) {
		return fetch(beersURL)
		.then(res => res.json())
	}


	static updateDescription(beersURL, beerId, newDescription) {
		return fetch(`${beersURL}/${beerId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				description: newDescription
			})
		})
		.then(resp => resp.json())
	}
}


