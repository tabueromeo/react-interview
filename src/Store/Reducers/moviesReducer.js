// Store/Reducers/favoriteReducer.js

const initialState = { deleteMovies: [], dislikes: [], likes: [] };

function toggleactionReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "DELETE_MOVIE":
      nextState = {
        ...state,
        deleteMovies: [...state.deleteMovies, action.value]
      };

      return nextState || state;

    case "LIKE_DISLIKE":
      const nonLoveMovieIndex = state.dislikes.findIndex(
        item => item.id === action.value.id
      );

      const loveMovieIndex = state.likes.findIndex(
        item => item.id === action.value.id
      );
      if (nonLoveMovieIndex !== -1) {
        // Le film est non aimé, on le supprime de la liste des non aimés et on l'ajoute dans les aimés

        nextState = {
          ...state,
          dislikes: state.dislikes.filter(
            (item, index) => index !== nonLoveMovieIndex
          )
        };

        nextState = {
          ...nextState,
          likes: [...state.likes, action.value]
        };
      } else if (loveMovieIndex !== -1) {
        //le film est aimé, on le supprime des aimés et on l'ajoute dans les non aimés
        nextState = {
          ...state,
          likes: state.likes.filter((item, index) => index !== loveMovieIndex)
        };
        console.log(nextState.likes);
        nextState = {
          ...nextState,
          dislikes: [...state.dislikes, action.value]
        };
      } else {
        nextState = {
          ...state,
          likes: [...state.likes, action.value]
        };
      }
      return nextState || state;

    default:
      return state;
  }
}

export default toggleactionReducer;
