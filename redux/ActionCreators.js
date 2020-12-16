import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

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

// promotions
// export const fetchPromos = () => (dispatch) => {
//   dispatch(promosLoading());
//   return fetch(baseUrl + 'promotions')
//     .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         var error = new Error('Error ' + response.status + ': ' + response.statusText);
//         error.response = response;
//         throw error;
//       }
//     }, error => {
//       var errmess = new Error(error.message);
//       throw errmess;
//     })
//     .then(response => response.json())
//     .then(promos => dispatch(addPromos(promos)))
//     .catch(error => dispatch(promosFailed(error.message)));
// };
// export const promosLoading = () => ({
//   type: ActionTypes.PROMOS_LOADING
// });
// export const promosFailed = (errmess) => ({
//   type: ActionTypes.PROMOS_FAILED,
//   payload: errmess
// });
// export const addPromos = (promos) => ({
//   type: ActionTypes.ADD_PROMOS,
//   payload: promos
// });

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