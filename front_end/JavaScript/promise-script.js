const promise_1 = new Promise((resolve, reject) => {
  //fetch data
  const love = false;
  if (love) {
    resolve("Heart");
  } else {
    reject("Broken Heart");
  }
});

promise_1
  .then((data) => {
    console.log("Marriage: ", data);
  })
  .catch((data) => {
    console.log("Break up: ", data);
  });

const promise_fn = (love) => {
  //fetch data
  return new Promise((resolve, reject) => {
    //fetch data

    if (love) {
      resolve("Heart");
    } else {
      reject("Broken Heart");
    }
  });
};

promise_fn(true)
  .then((data) => {
    console.log("Marriage: ", data);
  })
  .catch((data) => {
    console.log("Break up: ", data);
  });
