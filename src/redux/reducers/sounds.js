import {tracksCategory} from '../../data/tracks';
import {
  LOADING_START,
  LOADING_END,
  SET_SOUNDS,
  GET_CATEGORIES,
  GET_FAVOURITE_CATEGORIES,
  SET_FAVOURITE_CATEGORIES,
  PLAYING_END,
  PLAYING_START,
  UPDATE_CURRENT_CATEGORY,
  SET_PLAYING_CATEGORY,
  GET_PLAYING_CATEGORY,
} from '../actions/types';
const initial_state = {
  loading: true,
  all_sounds: tracksCategory[0].tracks,
  all_playing: false,
  timer: null,
  categories: [],
  current_category: tracksCategory[0],
  favourite_categories: [],
  playing_category: null,
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case LOADING_END:
      return {
        ...state,
        loading: false,
      };
    case PLAYING_START:
      return {
        ...state,
        all_playing: true,
      };
    case PLAYING_END:
      return {
        ...state,
        all_playing: false,
      };
    case SET_SOUNDS:
      return {
        ...state,
        all_sounds: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        all_sounds: action.payload.tracks,
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        current_category: action.payload,
      };

    case SET_FAVOURITE_CATEGORIES:
      return {
        ...state,
        favourite_categories: action.payload,
      };
    case SET_PLAYING_CATEGORY:
      console.log('THE PAYLOAD IS====>', action.payload?.name);
      return {
        ...state,
        playing_category: action.payload,
      };

    default:
      return state;
  }
}
