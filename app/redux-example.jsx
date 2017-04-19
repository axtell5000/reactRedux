var Redux = require('redux');


console.log('Starting Redux example');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure(); //configure is the function name in configureStore.jsx

/*-----------------------------------------------------------------------------------------
  PURE FUNCTION EXAMPLES
 ------------------------------------------------------------------------------------------*/

// //Pure function examples
// //Same output as input
// function add (a,b) {
//   return a + b;
// }
//
// //Not pure function example
// //Not allowed outside "interference"
// //Not allowed promises and asynchronous calls
// var a = 3;
//
// function add(b) {
//   return a + b;
// }
//
// var result;
//
// function add(a,b) {
//   result = a = b;
//   return result;
// }
//
// function add(a,b) {
//   return a + b + new Date().getSeconds();
// }
//
// //In pure functions, the function cant change a property of an object passed into it, we can do something like this though
//
// function changeProp(obj) {
//   return {
//     ...obj,
//     name: 'Jen'
//   };
//   // obj.name = 'Jen' //cant do this
//   // return obj;
// }
//
// var startingValue = {
//   name: 'Andrew',
//   age: 25
// };
//
// var res = changeProp(startingValue);
// console.log(startingValue);
// console.log(res);


var currentState = store.getState();
console.log('currentState', currentState);

//Subscribe to changes, takes a function that runs everytime a state changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('New state', store.getState());

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View Your Location</a>';
  }

});

// unsubscribe(); //when calling unsubscribe it stops the listening for changes

//actions.fetchLocation(); was this before conversion

store.dispatch(actions.fetchLocation()); //after we have converted normal function into a redux action

store.dispatch(actions.changeName('Stephen'));

store.dispatch(actions.addHobby('running'));

store.dispatch(actions.addHobby('walking'));

store.dispatch(actions.removeHobby(2));

store.dispatch(actions.changeName('Ignatius'));

store.dispatch(actions.addMovie('Mad Max', 'Action'));

store.dispatch(actions.addMovie('It', 'Horror'));

store.dispatch(actions.removeMovie(1));


