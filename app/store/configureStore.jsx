var Redux = require('redux');
var thunk = require('redux-thunk').default;
var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require('./../reducers/index');

export var configure = () => {

//BIG NOTE: When using combineReducers it uses strings instead of objects
  var reducer = Redux.combineReducers({//takes an object with key value pairs with the attributes/properties it must manage
    name: nameReducer, //the name state is going to be managed by the nameReducer
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
  });



//that long piece of code is to get the redux chrome dev tool to work, you need this piece of code, plus you cannot see this tool from the console
  var store = Redux.createStore(reducer, Redux.compose(
    Redux.applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

  return store;

};
