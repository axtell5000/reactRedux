var Redux = require('redux');
var axios = require('axios');

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
//Have to have default values

//Name reducer and action generators
// ----------------------------------
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  }
};

//action generator
var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name //Is a ES6 shortcut for doing name: name
  };
};

//Hobbies reducer and action generators
// ----------------------------------
var nextHobbyId = 1;

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

//action generator
var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby //Is a ES6 shortcut for doing hobby: hobby
  };
};

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id //Is a ES6 shortcut for doing id: id
  };
};

//Movie reducer and action generators
// ----------------------------------
var nextMovieId = 1;

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

//action generator
var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title, //Is a ES6 shortcut for doing title: title
    genre  //Is a ES6 shortcut for doing genre: genre
  };
};

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id //Is a ES6 shortcut for doing id: id
  };
};

//Map reducer and action generators
// ----------------------------------

var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type){
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };

    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };

    default:
       return state;
  }
};

//Action generator
var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function(res){
    var loc = res.data.loc;
    var baseUrl = 'https://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseUrl + loc));
  });
};

//BIG NOTE: When using combineReducers it uses strings instead of objects
var reducer = Redux.combineReducers({//takes an object with key value pairs with the attributes/properties it must manage
  name: nameReducer, //the name state is going to be managed by the nameReducer
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});

//that long piece of code is to get the redux chrome dev tool to work, you need this piece of code, plus you cannot see this tool from the console
var store = Redux.createStore(reducer, Redux.compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

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

fetchLocation();

store.dispatch(changeName('Stephen'));

store.dispatch(addHobby('running'));

store.dispatch(addHobby('walking'));

store.dispatch(removeHobby(2));

store.dispatch(changeName('Ignatius'));

store.dispatch(addMovie('Mad Max', 'Action'));

store.dispatch(addMovie('It', 'Horror'));

store.dispatch(removeMovie(1));


