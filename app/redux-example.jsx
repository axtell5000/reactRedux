var redux = require('redux');

console.log('Starting Redux example');

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

// In the reducer we work with the state
var reducer = (state = {name: 'Anonymous'}, action) => {
  //state = state ||{name: 'Anonymous'}; //ES5 way

  console.log('New action', action);

  switch (action.type){
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };

    default:
      return state;
  }

}

//that long piece of code is to get the redux chrome dev tool to work, you need this piece of code, plus you cannot see this tool from the console
var store = redux.createStore(reducer, Redux.compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

var currentState = store.getState();
console.log('currentState', currentState);

//Subscribe to changes, takes a function that runs everytime a state changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('Name is ', state.name);

  document.getElementById('app').innerHTML = state.name;

});

// unsubscribe(); //when calling unsubscribe it stops the listening for changes


store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Stephen'
});


store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Ignatius'
});



