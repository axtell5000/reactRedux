var axios = require('axios');

//action generator - name
export var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name //Is a ES6 shortcut for doing name: name
  };
};


//action generator - hobby
export var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby //Is a ES6 shortcut for doing hobby: hobby
  };
};

export var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id //Is a ES6 shortcut for doing id: id
  };
};


//action generator - movie
export var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title, //Is a ES6 shortcut for doing title: title
    genre  //Is a ES6 shortcut for doing genre: genre
  };
};

export var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id //Is a ES6 shortcut for doing id: id
  };
};


//Action generator - map
export var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

export var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

//We have converted the function so that redux can use it as an action, we need redux-thunk installed
export var fetchLocation = () => {

  return (dispatch, getState) => {
    dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then(function(res){
      var loc = res.data.loc;
      var baseUrl = 'https://maps.google.com?q=';

      dispatch(completeLocationFetch(baseUrl + loc));
    });
  };
};
