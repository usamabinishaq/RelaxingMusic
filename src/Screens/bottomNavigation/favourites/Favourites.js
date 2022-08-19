import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Appbar from '../../../components/Appbar/Appbar';
import Heading from '../../../components/small/text/Heading';
import CategoryItem from '../../../components/small/views/CategoryItem';
import {tracksCategory} from '../../../data/tracks';
import {width_screen} from '../../../util/common/dimensions';
import {isArrayCheck, PoppinsSemiBold} from '../../../util/Utils';
import variables from '../../../util/variables';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFavourites} from '../../../services';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllFavourites,
  UpdateCurrentCategory,
} from '../../../redux/actions/sounds';

function Favourites({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {favourite_categories} = useSelector(state => state._sounds);

  useEffect(() => {
    dispatch(fetchAllFavourites());
  }, [isFocused]);

  const _handleSelectedCategory = item => {
    dispatch(UpdateCurrentCategory(item));
    navigation.navigate('SoundsTab', {category: item});
  };
  return (
    <View style={styles.main}>
      <Appbar title={'Favourites'} />
      {isArrayCheck(favourite_categories) ? (
        <View
          style={{paddingHorizontal: '2.5%', flex: 0.9, width: width_screen}}>
          <FlatList
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            data={favourite_categories}
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
      ) : (
        <View
          style={{flex: 0.9, justifyContent: 'center', alignItems: 'center'}}>
          <Heading
            size={variables.fontSizePMedium}
            fontFamily={
              PoppinsSemiBold
            }>{`No favourite tracks found!`}</Heading>
        </View>
      )}
    </View>
  );
}

export default Favourites;
