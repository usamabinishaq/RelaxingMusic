import {Platform} from 'react-native';
import {height_, height_screen} from './common/dimensions';

const getSize = size => size;

const variables = {
  getSize,
  colorGradient: ['#060715', '#060414'],
  colorPrimary: '#060715',
  secondary: ['#835AE0', '#835AE000'],
  colorGradient2: ['#835AE0', '#3C3B42'],

  bg_gradient: ['#835AE0', '#5EACE4'],
  colorIcon: '#0BF7ED',
  cardColor: '#835AE080',
  colorSelectedCard: '#835AE0',
  ColorLightGray: '#D9D9D9',

  colorSuccess: '#18B141',
  colorError: '#FF6060',
  colorBlack: '#000000',
  colorBlackDim: '#000000',
  colorBorder: '#3C3B4290',
  colorDotActive: '#33A3F4',

  colorWhite: '#ffffff',
  colorWhiteDim: '#f0f0f060',
  fontColorMain: '',
  fontColorGray: '#D3D3D3',

  fontColorMediumGray: '#716F81',
  colorLightBorder: '#F8F8F8',
  placeHolderColor: '#A9A9A9',

  fontWeightBold: '600',
  fontWeightThin: '200',
  fontWeightRegular: '400',
  colorHeading: '#2D2D53',
  colorSubtext: '#8B8B8B',
  colorRatingActive: '#00CA9D',
  colorRatingInActive: '#DAD9E2',

  fontSizeH1Large: getSize(50),
  fontSizeH1Medium: getSize(32),
  fontSizeH1Small: getSize(27),
  fontSizeH2Large: getSize(24),
  fontSizeH2Medium: getSize(21),
  fontSizeH2Small: getSize(18),
  fontSizePMedium: getSize(16),
  fontSizePSmall: getSize(14),
  fontSizeSubtext: getSize(12),
  fontSizeSmall: getSize(10),
  fontSizeTine: getSize(8),

  UIPaddingHorizontal: '6%',
  UIPaddingVertical: '6%',
  authPagePaddingTop: '30%',
  tineScale: height_screen * 0.005,
  firstScale: height_screen * 0.01,
  secondScale: height_screen * 0.015,
  thirdScale: height_screen * 0.02,
  fourScale: height_screen * 0.025,
  fiveScale: height_screen * 0.03,
  sixScale: height_screen * 0.04,
  iosTopPadding: height_screen * 0.05,
  iosTopPadding_firstScale: height_screen * 0.03,

  borderRadiusSmall: getSize(5),
  borderRadiusMedium: getSize(10),
  borderRadiusLarge: getSize(30),
  borderRadiusXLarge: getSize(70),

  shadowStyle: intensity => ({
    shadowColor: variables.colorBlack,
    shadowOffset: {
      width: 0,
      height: intensity / 2,
    },
    shadowOpacity: 1,
    shadowRadius: intensity * 0.7,
    elevation: intensity,
  }),

  circleStyle: size => ({
    width: size,
    height: size,
    borderRadius: size,
    alignItems: 'center',
    justifyContent: 'center',
  }),

  circleSizeSmall: getSize(50),
  circleSizeMedium: getSize(60),
};

export default variables;
