console.log("Start");

setTimeout(() => {
  console.log("Javascript: 0");
}, 0);
setTimeout(() => {
  console.log("Javascript: 2000");
}, 2000);
setTimeout(() => {
  console.log("Javascript: 3000");
}, 3000);

console.log("End");

const add = (a, b) => ({ a: 10, b: 20, sum: a + b });

console.log("Sum: ", add(10, 20));

/*
    JS is high level, dynamically typed, non-blocking IO, async, oops

    Arrow Functions:

    1. =>
    2. left: parameters -> ()
    3. right: fn body -> {}
        3.1: implicit return keyword -> single expression or ({key: value})->obj
        3.2: explicit return keyword -> multiple line fn body{ return }
*/
