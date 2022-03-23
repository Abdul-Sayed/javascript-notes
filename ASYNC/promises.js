/*************
Basic Syntax
*************/


// let p1 = new Promise((resolve, reject) => {
//   if  (true) {
//     resolve('p1 resolved');
//   } else {
//     reject('p1 rejected');
//   }
// })

//p1.then() runs only after Promise p1 has finished resolving. 
// The expected value of p1 can safely be consumed in p1.then()

// p1.then( (result) => {
//   console.log('Result of first promise: ' + result + ' Lorem Ipsum dolor')
// } )

// p1.catch( (result) => {
//   console.log('Result if first promise fails: ' + result + ' Lorem Ipsum dolor')
// } )


// // resolve/reject methods on the Promise object can also be called as:

// let p2 = Promise.resolve('p2 resolved');

// p2.then( (result) => {
//   console.log('Result of second promise: ',result,'Lorem Ipsum dolor')
// } )

// let p2_5 = Promise.reject('p2_5 rejected');

// p2_5.catch( (result) => {
//   console.log('Result if second promise fails: ' + result + ' Lorem Ipsum dolor')
// })


// // A function can return Promise.resolve() and PRomise.reject()
// let p3 = () => Promise.resolve('p3 resolved');

// p3().then( (result) => {
//   console.log('Result of third promise: ',result,'Lorem Ipsum dolor')
// })

// let p3_5 = () => Promise.reject('p3_5 rejected');

// p3_5().catch( (result) => {
//   console.log('Result if third promise fails: ' + result + ' Lorem Ipsum dolor')
// })


/*************
Chaining
*************/

// let p1 = new Promise((resolve, reject) => {

//   // resolve(res); // calling this will call then()
//   // reject(err); // calling this will call catch()

//   setTimeout(resolve, 1500, Math.floor(Math.random() * 10) + 1)
// })

// p1.then((res) => {
//   console.log(res); // res represents output from resolve
//   return 2*res; //  if then() has a return statement, other then() can be chained to it
// }).then((res) => {
//   console.log(res); // res represents output from the previous then()
// }).catch((err) => {
//   // called if an error is thrown in any of the then()
//   console.log(err);
// })


/*************
Promise.all()
*************/

// Used when you only want to run your code after ALL your promises are resolved
// You don't know which of the promises will resolve first
// eg: fetching remote data from multiple locations

// let p1 = Promise.resolve('Got the list of users');
// let p2 = () => Promise.resolve('Got the list of tweets');
// let p3 = Promise.resolve('Got the weather');

// // Only fires if all the promises are resolved, none are rejected

// Promise.all([p1,p2(),p3]).then((resultsArr) => {
//   console.log(resultsArr[0]);
//   console.log(resultsArr[1]);
//   console.log(resultsArr[2]);
// })

// See HTML file for practical example of waiting for CSS files to load


/*************
Promise.race()
*************/

// Used when you only want the result from the first resolved promise
// Making multiple server requests for redundency

// let p1 = Promise.reject(111);
// let p2 = Promise.resolve(222);
// let p3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 1000, 333)
// })

// // Returns the first one to resolve/reject. 
// // If there's a tie, it returns the first one written in the array
// Promise.race([p3, p1, p2])
// .then((result) => {
//   console.log('winning:', result)
// })
// .catch((result) => {
//   console.log('Failed:', result)
// })



// async await vs promises vs callbacks

/*************
Async Await
*************/
let someServerRequest = () => {
	fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then(response => response.json())
		.then(json => console.log(json))
}

async function start() {
  try {
    const avatarURL = await someServerRequest();
  } catch (err) {
    console.error("Error in server request", err);
  }
}

start();



/*****Promises******/

let p = new Promise((resolve,reject) => {
	let a = 1 + 1;
	// Execute resolve code block upon meeting the condition.
	// Execute reject code block upon failing the condition
  if (a == 2) {
    resolve('Success')
  } else { 
		reject('Failed')
  }
})

// Run .then method if the promise is resolved
// Run .catch method if the promise is rejected
p.then((resolveOutput) => {
  console.log('The output from resolve is ' + resolveOutput)
}).catch((rejectOutput) => {
  console.log('The output from reject is ' + rejectOutput)
})


/******************************/

// 
const recordVideoOne = new Promise((resolve,reject) => {
  resolve('Video 1 Recorded')
})

const recordVideoTwo = new Promise((resolve,reject) => {
  resolve('Video 2 Recorded')
})

const recordVideoThree = new Promise((resolve,reject) => {
  resolve('Video 3 Recorded')
})

// When all the promises complete, return all their resolve code
Promise.all([
  recordVideoOne,
  recordVideoTwo,
  recordVideoThree,
  ]).then((messages) => {
    console.log(messages)
  })
  
  
// As soon as one of the resolve mothods completes, return its resolve output. Used for redundant database calls;
Promise.race([
  recordVideoOne,
  recordVideoTwo,
  recordVideoThree,
  ]).then((message) => {
    console.log(message)
  })
  
  


interface Stock {
  fruits: string[];
    liquid: string[];
    holder: string[];
    toppings: string[];
}
  
 let stocks: Stock = {
  fruits: ["strawberry", "grapes", "bananas", "apple"],
  liquid: ["water", "ice"],
holder: ["cone", "cup", "stick"],
  toppings: ["chocolate", "peanuts"],
}

let isShopOpen = Math.floor(Math.random()*8);   // closed 1 day of the week


/*
* Using Async Await Syntax
*/

let time = (timeout: number) => {
    return new Promise((resolve, reject) => {
        if (isShopOpen) {
            setTimeout(resolve, timeout);
        } else {
            reject('shop is closed')
        }
    })
}

async function kitchen() {
    try {
        await time(2000);
        console.log(`${stocks.fruits[0]} was selected`);

        await time(2000);
        console.log(`the fruit has been chopped`);

        await time(2000);
        console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`);
    }
    catch(error) {
        console.log(error, 'customer left')
    }
    finally {
        console.log('Day ended, shop is closed')
    }
}


kitchen()


/*
* Using Promises
*/

// let order = (time: number, work: any): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         if (isShopOpen) {
//             setTimeout(() => {resolve(work())},time)
//         } else {
//             reject('Our shop is closed')
//         }
//     })
// }

// order(2000, () => console.log(`${stocks.fruits[0]} was selected`))
// .then(() => {
//     return order(2000, () => console.log(`the fruit has been chopped`))
// })
// .then(() => {
//     return order(2000, () => console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`))
// })
// .catch((err: Error) => console.log(`${err}`))
// .finally(() => {
//     console.log('Day ended, shop is closed')
// })



/*
* Using Callbacks
*/


// let order = (fruitName: string, callbackProduction: any): void => {
//     setTimeout(() => {
//         console.log(`${fruitName} was selected`);
//         callbackProduction();
//     }, 2000)
// }


// let production = (): void => {
//     setTimeout(() => {
//         console.log('production has started');
        
//         setTimeout(()=>{
//             console.log('the fruit has been chopped')
//         }, 2000)
//     }, 0)
// }

// order(stocks.fruits[0], production);



/*
Summary: 
    Avoid callbacks nested more than 2 levels deep.

    For promises, the basic structure is:
    let order = () => {
        return new Promise((resolve, reject) => {
            if (some_cond) {
                resolve(some_data)
            } else {
                reject(some_error)
            }
        })
    }

    order()
    .then() // .then runs on successful resolution of async op in promise
    .then()
    .catch()  // runs on failure and rejection of async op in promise
    .finally()  // runs anyway at the end 

    For async away, anything await is blocking until it resolves or rejects
*/

























