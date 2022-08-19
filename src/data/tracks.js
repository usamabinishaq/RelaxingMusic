import * as constants from '../constants/constants';
import icon_1 from '../assets/icons/1.svg';
import icon_2 from '../assets/icons/9.svg';
import icon_6 from '../assets/icons/3.svg';
import icon_7 from '../assets/icons/4.svg';
import icon_10 from '../assets/icons/5.svg';
import icon_9 from '../assets/icons/6.svg';
import icon_8 from '../assets/icons/7.svg';
import icon_4 from '../assets/icons/8.svg';
import icon_5 from '../assets/icons/2.svg';
import icon_3 from '../assets/icons/10.svg';
import icon_11 from '../assets/icons/11.svg';
import icon_12 from '../assets/icons/12.svg';

export const tracks = [
  {
    id: 1,
    url: constants.track_1, // Load media from the network
    title: 'Light Rain',
    icon: constants.img_1,
    volume: 1,
    isPlaying: false,
    selected: false,
  },
  {
    id: 2,
    url: constants.track_2, // Load media from the network
    title: 'Heavy Rain',
    volume: 1,
    isPlaying: false,
    icon: constants.img_2,
    selected: false,
  },
  {
    id: 3,
    url: constants.track_3, // Load media from the network
    title: 'Thunder',
    volume: 1,
    isPlaying: false,
    icon: constants.img_3,
    selected: false,
  },
  {
    id: 4,
    url: constants.track_4,
    title: 'Rain on Umbrella',
    volume: 1,
    isPlaying: false,
    icon: constants.img_4,
    selected: false,
  },
  {
    id: 5,
    url: constants.track_5,
    title: 'Rain on Window',
    volume: 1,
    isPlaying: false,
    icon: constants.img_5,
    selected: false,
  },
];
export const NatureTracks = [
  {
    id: 1,
    url: constants.track_7, // Load media from the network
    title: 'Bird Singing',
    icon: constants.img_8,
    volume: 1,
    isPlaying: false,
    selected: false,
  },
];
export const ForestTracks = [
  {
    id: 1,
    url: constants.track_8, // Load media from the network
    title: 'Rain Forest',
    icon: constants.img_2,
    volume: 1,
    isPlaying: false,
    selected: false,
  },
  {
    id: 2,
    url: constants.track_6, // Load media from the network
    title: 'Birds in Forest',
    icon: constants.img_8,
    volume: 1,
    isPlaying: false,
    selected: false,
  },
];

export const tracksCategory = [
  {
    id: 1,
    name: 'Rain & Thunders',
    image: constants.cat_1,
    tracks: tracks,
    favourite: false,
  },
  {
    id: 2,
    name: 'Nature',
    image: constants.cat_2,
    tracks: NatureTracks,
    favourite: false,
  },
  {id: 3, name: 'Animal', image: constants.cat_3, tracks: [], favourite: false},
  {id: 4, name: 'City', image: constants.cat_4, tracks: [], favourite: false},
  {
    id: 5,
    name: 'Instruments',
    image: constants.cat_5,
    tracks: [],
    favourite: false,
  },
  {
    id: 6,
    name: 'Meditation',
    image: constants.cat_6,
    tracks: [],
    favourite: false,
  },
  {
    id: 7,
    name: 'Forest',
    image: constants.cat_8,
    tracks: ForestTracks,
    favourite: false,
  },
];

export const categoriesImages = [
  constants.cat_1,
  constants.cat_2,
  constants.cat_3,
  constants.cat_4,
  constants.cat_5,
  constants.cat_6,
  constants.cat_8,
];
