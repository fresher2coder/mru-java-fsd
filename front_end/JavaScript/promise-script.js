//promise
const promise_1 = new Promise((resolve, reject) => {
  //fetching data
  let love = true;

  if (love) {
    resolve("Heart");
  } else {
    reject("Broken Heart");
  }
});

promise_1
  .then((data) => {
    console.log("Happy Ending: ", data);
  })
  .catch((data) => {
    console.log("Bad Ending: ", data);
  });

const promise_fn = (love) => {
  return new Promise((resolve, reject) => {
    if (love) {
      resolve("Heart");
    } else {
      reject("Broken Heart");
    }
  });
};

promise_fn(false)
  .then((data) => {
    console.log("Happy Ending: ", data);
  })
  .catch((data) => {
    console.log("Bad Ending: ", data);
  });
