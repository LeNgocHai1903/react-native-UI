import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import {loginUrl} from  '../shared/loginUrl';
import {reserUrl} from '../shared/reserve-table'
import { Alert } from 'react-native';

// leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());
  return fetch(baseUrl + 'leaders')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};
export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});
export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});
export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

// products
export const fetchProducts = () => (dispatch) => {
  dispatch(productsLoading());
  return fetch(baseUrl + 'products')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(products => dispatch(addProducts(products)))
    .catch(error => dispatch(productsFailed(error.message)));
};
export const productsLoading = () => ({
  type: ActionTypes.PRODUCTS_LOADING
});
export const productsFailed = (errmess) => ({
  type: ActionTypes.PRODUCTS_FAILED,
  payload: errmess
});
export const addProducts = (products) => ({
  type: ActionTypes.ADD_PRODUCTS,
  payload: products
});

// comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};
export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

// favorites
export const postFavorite = (productId) => (dispatch) => {
  setTimeout(() => {
    dispatch(addFavorite(productId));
  }, 2000);
};
export const addFavorite = (productId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: productId
});

export const deleteFavorite = (productId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: productId
});


// comment
export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (productId, rating, author, comment) => (dispatch) => {
  const newComment = {
      productId: productId,
      rating: rating,
      author: author,
      comment: comment,
  };
  newComment.date = new Date().toISOString();

  setTimeout(() => {
      dispatch(addComment(newComment));
  }, 2000);
};

//User


//login
export const login =  (name, password) => {
  // const { username, password } = loginInput;
  return (dispatch) => { // don't forget to use dispatch here!
    return fetch(loginUrl + 'login', {
      method: 'POST',
      headers: {  // these could be different for your API call
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name": name, "password": password}),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Đã đăng nhập') { // response success checking logic could differ
          dispatch(setLoginState({ ...json, userId: name })); // our action is called here
          Alert.alert('Sucess')
        } else {
          Alert.alert('Login Failed', 'Username or Password is incorrect');
        }
      })
      .catch((err) => {
        Alert.alert('Login Failed', 'Some error occured, please retry');
        console.log(err);
      });
  };
};

export const setLoginState = (loginData) => {
  return {
    type: ActionTypes.SET_LOGIN_STATE,
    payload: loginData,
  };
};

export const setLogoutState = () => {
  return {
    type: ActionTypes.SET_LOGOUT_STATE,
    payload: {
      login: false
    },
  };
};

//register

//login
export const register =  (name, password, email) => {
  // const { username, password } = loginInput;
  return (dispatch) => { // don't forget to use dispatch here!
    return fetch(loginUrl + 'signup', {
      method: 'POST',
      headers: {  // these could be different for your API call
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name": name, "password": password, "email": email}),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Đăng kí thành công') { // response success checking logic could differ
          // dispatch(setLoginState({ ...json, userId: name })); // our action is called here
          Alert.alert('Registed')
        } else {
          Alert.alert('Login Failed', 'Username or Password is incorrect');
        }
      })
      
  };
};

//ReserveTable

export const bill =  (guests, smoking,date,userId) => {
  // const { username, password } = loginInput;
  return (dispatch) => { // don't forget to use dispatch here!
    return fetch(reserUrl  + userId  , {
      method: 'POST',
      headers: {  // these could be different for your API call
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"numberofguest": guests, "creator": userId,  "smoking": smoking, "date": date}),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Đặt bàn thành công') { // response success checking logic could differ
          // dispatch(setLoginState({ ...json, userId: name })); // our action is called here
          Alert.alert('Đã đặt bàn thành công')
        } else {
          Alert.alert('Login Failed', 'Username or Password is incorrect');
        }
      })
      
  };
};


