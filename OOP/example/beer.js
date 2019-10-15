class Beer {

	constructor({name, tagline, description, image_url, id}) {
		this.name = name;
		this.tagline = tagline;
		this.description = description;
		this.image_url = image_url;
		this.id = id;
	}

	introduceYourself() {
		return `Hi, I'm ${this.name} and ${this.tagline}`
	}

	renderLi() {
		return `<li class="list-group-item" data-id="${this.id}"> ${this.name} </li>`
	}

	renderDetails() {
		return 
		`
			<h1> ${ this.name}</h1 >
			<img src="${this.image_url}">
			<h3>${this.tagline}</h3>
			<textarea>${this.description}</textarea>
			<form>
				<input type="text" placeholder="Enter New Beer Description">
				<button id="edit-beer" data-id=${this.id} class="btn btn-info">
					Save
				</button>
			</form>
		`
	}

	static find(id) {
		Beer.all.find(beer => beer.id === id)
	}
}

Beer.all = []