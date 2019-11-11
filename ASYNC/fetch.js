
// Making GET Request

const url = "https://jsonplaceholder.typicode.com/todos/1";

fetch(url)

  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch.')
    }
    return response.json()
  })

  .then(data => {

    let pretty = JSON.stringify(data, null, '\t');
    console.log(pretty)

  })
  .catch(err => {
    console.error(err.message)
  });


/////////////////////////////////////////////////////////////////

// Making POST Request

//Compact way
fetch('http://localhost:3000/dogs', {
	method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
		dogName: "Byron",
		dogBreed: "Poodle"
	})
})
  .then(response => response.json())
  .then(parsedResponse => {
    console.log(parsedResponse);
  })
	.catch(error => {
    console.log(error.message);
  });

// Seperated way
const url = "http://localhost:3000/dogs";

let formData = {
  dogName: "Byron",
  dogBreed: "Poodle"
};
 
let configObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
};
 
fetch(url, configObj)
  .then(response => response.json())
  .then(parsedResponse => {
    console.log(parsedResponse);
  })
	.catch(error => {
    console.log(error.message);
  });


// Does the same as 

/*
<form action = "http://localhost:3000/dogs" method = "POST">
  <label> Dog Name: <input type="text" name="dogName" id="dogName" /></label > <br />
  <label> Dog Breed: <input type="text" name="dogBreed" id="dogBreed" /></label> <br />
  <input type="submit" name="submit" id="submit" value="Submit" />
</form >
*/


///////////////////////////////////////////////////////////

// PATCH 

    fetch(`http://localhost:3000/channels${updatedChannel.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(updatedChannel)
    })
      .then(response => response.json())
      .then(updatedChannel => {
        console.log(updatedChannel);

      })
      .catch(error => {
        console.log(error.message);
      });

// ------------------------------------------------------------------
// Async Syntax
const apiURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

async function getTop100Campers() {
	const resp = await fetch(apiURL);
	const json = await resp.json();
	console.log(json);
}

getTop100Campers();


/////////////////////////////////////////////////////////////

	// Other patterns
	fetch("/api/foo")
		.then(response => {
			if (!response.ok) { throw response }
			return response.json()  //we only get here if there is no error
		})
		.then(json => {
			doSomethingWithResult(json)
		})
		.catch(err => {
			err.text().then(errorMessage => {
				displayTheError(errorMessage)
			})
		})