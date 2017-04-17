var Redux = require('redux');

console.log('Starting todo redux example');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};


var reducer = (state = stateDefault, action) => {
  switch (action.type){
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };

    default:
      return state;
  }
};

var store = Redux.createStore(reducer, Redux.compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

//Subscribe to changes, takes a function that runs everytime a state changes
  store.subscribe(() => {
    var state = store.getState();

    document.getElementById('app').innerHTML = state.searchText;

});

// unsubscribe(); //when calling unsubscribe it stops the listening for changes


console.log('currentState:', store.getState());

//dispatching your action
store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'I keeps it real'
});



store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'This goes out to all my homies in Battlecreek'
});



store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'I drop it like its hot yo'
});


