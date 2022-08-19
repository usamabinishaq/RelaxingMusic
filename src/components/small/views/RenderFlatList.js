import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {FlatList} from 'react-native';

const RenderFlatList = ({data, columns, horizontal, renderItem, ...props}) => {
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  const ref = useRef();

  const scrollToIndex = () => {
    ref.current.scrollToIndex({animation: true, index: 0});
  };
  useEffect(() => {
    scrollToIndex();
  }, [isFocused]);

  const _handleOnPressItem = (item, index) => {
    // navigate('SingleWallpaperList', {
    //   index: index,
    //   wallpaperId: item._id,
    //   selectedCategoryList: data,
    //   title: title,
    // });
  };

  return (
    <FlatList
      horizontal={horizontal}
      ref={ref}
      style={{marginTop: '2.5%'}}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      {...props}
    />
  );
};
export default RenderFlatList;
