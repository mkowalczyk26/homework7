function promiseAll(promises) {
    return new Promise((resolve, reject) => {  
        let results = []
        let completedCount = 0

        if (promises.length === 0) {
            resolve(results)
            return
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
            .then((result) => {
                results[index] = result
                completedCount++

                if (completedCount === promises.length) {
                resolve(results)
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
    })
}

  const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ];
  
  promiseAll(promises)
    .then(results => {
      console.log("All promises resolved:", results);
    })
    .catch(error => {
      console.error("At least one promise rejected:", error);
    });





function promiseAllSettled(promises) {
    return Promise.all(promises.map(promise =>
        promise
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    ))
}


const promises2 = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3)
  ];
  
  promiseAllSettled(promises2)
    .then(results => {
      console.log("All promises settled:", results);
    });








function chainPromises(functions) {
    return functions.reduce((chain, currentFunction) => {
        return chain.then((currentValue) => {
            return currentFunction(currentValue)
        })
    }, Promise.resolve())
}

function asyncFunction1() {
    return Promise.resolve("Result from asyncFunction1");
  }
  
  function asyncFunction2(data) {
    return Promise.resolve(data + " - Result from asyncFunction2");
  }
  
  function asyncFunction3(data) {
    return Promise.resolve(data + " - Result from asyncFunction3");
  }
  
  const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];
  
  chainPromises(functionsArray)
    .then(result => {
      console.log("Chained promise result:", result);
    })
    .catch(error => {
      console.error("Chained promise error:", error);
    });







function promisify(callbackStyleFunction) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            callbackStyleFunction(...args, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
}


function callbackStyleFunction(value, callback) {
    setTimeout(() => {
      if (value > 0) {
        callback(null, value * 2);
      } else {
        callback("Invalid value", null);
      }
    }, 1000);
  }
  
  const promisedFunction = promisify(callbackStyleFunction);
  
  promisedFunction(3)
    .then(result => {
      console.log("Promised function result:", result);
    })
    .catch(error => {
      console.error("Promised function error:", error);
    });
