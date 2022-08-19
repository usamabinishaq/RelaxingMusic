import {tracksCategory} from '../../data/tracks';
import {
  deleteFavouriteSounds,
  getFavourites,
  setFavouriteSounds,
} from '../../services';
import {
  GET_CATEGORIES,
  PLAYING_END,
  PLAYING_START,
  SET_FAVOURITE_CATEGORIES,
  SET_PLAYING_CATEGORY,
  SET_SOUNDS,
  UPDATE_CURRENT_CATEGORY,
} from './types';

// export const fetchAllSounds = sounds => dispatch => {
//   dispatch({type: LOADING_START});
//   dispatch({type: GET_SOUNDS, payload: sounds});
// };
export const fetchAllCategories = () => dispatch => {
  dispatch({
    type: GET_CATEGORIES,
    payload: tracksCategory,
  });
};

export const UpdateCurrentCategory = category => dispatch => {
  dispatch({
    type: UPDATE_CURRENT_CATEGORY,
    payload: category,
  });
};

export const UpdateCurrentCategorySounds = tracks => dispatch => {
  dispatch({
    type: SET_SOUNDS,
    payload: tracks,
  });
};

export const UpdateFavourites = (cid, state) => dispatch => {
  state ? setFavouriteSounds(cid) : deleteFavouriteSounds(cid);
  dispatch(fetchAllFavourites());
};

export const fetchAllFavourites = () => dispatch => {
  getFavourites().then(response => {
    let len = response.rows.length;
    let favTemp = [];
    console.log(len);
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        var row = response.rows.item(i);
        favTemp.push(row);
      }

      let temp = [];
      favTemp.map((item, index) => {
        let filter = tracksCategory.filter(i => i.id === item.sid);
        temp.push(filter[0]);
      });
      dispatch({
        type: SET_FAVOURITE_CATEGORIES,
        payload: temp,
      });
    } else {
      dispatch({
        type: SET_FAVOURITE_CATEGORIES,
        payload: [],
      });
    }
  });
};

export const updateAllPlayingTracksStatus = state => dispatch => {
  state ? dispatch({type: PLAYING_START}) : dispatch({type: PLAYING_END});
};

export const updateCUrrentPlayingCategory = category => dispatch => {
  // console.log('CATEGORRRYYY===> jjjj', category);
  dispatch({type: SET_PLAYING_CATEGORY, payload: category});
};
