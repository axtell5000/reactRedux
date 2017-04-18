var Redux = require('redux');

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

//Setting up a neater default value
var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;

// In the reducer we work with the state
//Have to have default values

var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};

var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter(function (hobby){ //remember filter keeps the element that returns true based on our condition
        return hobby.id !== action.id;
      });
    default:
      return state;
  }
};

var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ];
    case 'REMOVE_MOVIE':
      return state.filter(function (movie){ //remember filter keeps the element that returns true based on our condition
        return movie.id !== action.id;
      });
    default:
      return state;
  }
};

//BIG NOTE: When using combineReducers it uses strings instead of objects
var reducer = Redux.combineReducers({//takes an object wit hkey value pairs with the attributes/properties it must manage
  name: nameReducer, //the name state is going to be managed by the nameReducer
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

//that long piece of code is to get the redux chrome dev tool to work, you need this piece of code, plus you cannot see this tool from the console
var store = Redux.createStore(reducer, Redux.compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

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
  type: 'ADD_HOBBY',
  hobby: 'running'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'walking'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Ignatius'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Mad Max',
  genre: 'Action'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'It',
  genre: 'Horror'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});


