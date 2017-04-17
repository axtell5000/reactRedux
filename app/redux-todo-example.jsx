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

var store = Redux.createStore(reducer);

console.log('currentState:', store.getState());

//dispatching your action
store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'I keeps it real'
});

console.log('Search text should keeps it real', store.getState());
