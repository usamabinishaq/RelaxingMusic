import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  DeviceEventEmitter,
  FlatList,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';
import Appbar from '../../../../components/Appbar/Appbar';
import CategoryItem from '../../../../components/small/views/CategoryItem';
import {height_screen, width_screen} from '../../../../util/common/dimensions';
import style from './style';
import variables from '../../../../util/variables';
import ImageSlider from '../../../../components/small/views/ImageSlider';
import Heading from '../../../../components/small/text/Heading';
import {isArrayCheck, PoppinsSemiBold} from '../../../../util/Utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllCategories,
  fetchAllFavourites,
  UpdateCurrentCategory,
} from '../../../../redux/actions/sounds';
import {useIsFocused} from '@react-navigation/native';

const Categories = ({navigation}) => {
  const dispatch = useDispatch();
  const {categories, favourite_categories} = useSelector(
    state => state._sounds,
  );
  const [sliderImages, setSliderImages] = useState([categories[0]?.image]);
  const [sliderTracks, setSliderTracks] = useState([categories[0]]);
  const isFocused = useIsFocused();
  const [exitApp, setExitApp] = useState(0);
  const message = 'Press back again to exit the app';
  let exit = 0;

  const _handleSelectedCategory = item => {
    dispatch(UpdateCurrentCategory(item));
    navigation.navigate('SoundsTab', {data: true});
  };
  useEffect(() => {
    //Fetch Latest Categories
    dispatch(fetchAllCategories());
    dispatch(fetchAllFavourites());

    let tempImages = [];
    let tempCategory = [];

    if (isArrayCheck(categories)) {
      tempCategory = [...categories];
      tempCategory?.slice(0, 5).map(item => {
        tempImages.push(item?.image);
      });
    }
    setSliderImages(tempImages);
    setSliderTracks(tempCategory);
  }, [categories, isFocused]);
  useEffect(() => {
    if (isFocused) {
      const backAction = () => {
        Alert.alert('Exit App', 'Are you sure you want to exit app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [isFocused]);

  return (
    <View style={style.main}>
      <Appbar title={'Home'} />
      <View style={{flex: 0.9, alignItems: 'center'}}>
        {/* {Category List} */}
        <ScrollView>
          {/* {Slider View} */}
          <View
            style={{
              height: height_screen * 0.275,
              alignItems: 'center',
              width: width_screen,
              paddingBottom: '5%',
            }}>
            <ImageSlider
              data={sliderTracks}
              images={sliderImages}
              onImagePress={item => {
                _handleSelectedCategory(item);
              }}
            />
          </View>
          {/* {Favourite View} */}
          {isArrayCheck(favourite_categories) ? (
            <View style={{paddingHorizontal: '2.5%', width: width_screen}}>
              <Heading
                size={variables.fontSizePMedium}
                fontFamily={PoppinsSemiBold}
                style={{paddingHorizontal: '2.5%'}}>
                {'Favourites'}
              </Heading>
              <FlatList
                horizontal={true}
                // style={{marginTop: '2.5%'}}
                showsHorizontalScrollIndicator={false}
                data={favourite_categories}
                renderItem={({item, index}) => {
                  return (
                    <CategoryItem
                      key={index}
                      name={item.name}
                      icon={item.image}
                      selected={item.selected}
                      onPress={() => {
                        _handleSelectedCategory(item, index);
                      }}
                    />
                  );
                }}
              />
            </View>
          ) : null}

          {/* {ALL View} */}

          <View style={{paddingHorizontal: '2.5%', width: width_screen}}>
            <Heading
              size={variables.fontSizePMedium}
              fontFamily={PoppinsSemiBold}
              style={{paddingHorizontal: '2.5%'}}>
              {'All'}
            </Heading>
            <FlatList
              numColumns={3}
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({item, index}) => {
                return (
                  <CategoryItem
                    size={width_screen / 3 - 15}
                    key={index}
                    name={item.name}
                    icon={item.image}
                    onPress={() => {
                      _handleSelectedCategory(item, index);
                    }}
                  />
                );
              }}
            />
          </View>
          <View style={{marginBottom: '20%'}} />
        </ScrollView>
      </View>
    </View>
  );
};
export default Categories;
