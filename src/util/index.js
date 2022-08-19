// import moment from 'moment';
// import {Platform} from 'react-native';

// export const util = {
//   amountWithCommas: amount =>
//     amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
//   formatDate: date => date.toDateString(),
// };

// export const validateEmail = email => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );
// };
// export const validatePassword = pass => {
//   return String(pass)
//     .toLowerCase()
//     .match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}$/);
// };

// export const checkTwoString = (str1, str2) => {
//   if (String(str1) === String(str2)) {
//     return true;
//   }
//   return false;
// };

// export function isEmpty(str) {
//   return !str || str.length === 0;
// }

// export const formatedDate = date => {
//   return moment(date).format('MMM DD YYYY');
// };

// export const formatedTime = date => {
//   return moment(date).format('HH:MM:SS');
// };
// export const Log = (key = '', value) => {
//   // console.log(key + " : ", value);
// };

// export const addMethodArray = (arrayData, objectToAdd) => {
//   let arr = arrayData ? arrayData : [];
//   arr.push(objectToAdd);
//   Log('Add Method ==>', arr);
//   return arr;
// };
// export const removeMethodArray = (arrayData, objectToRemoved) => {
//   let arr = arrayData ? arrayData : [];
//   arr = arr?.filter(data => data?._id != objectToRemoved?._id);
//   Log('Remove Method Before==>', arrayData);
//   Log('Remove Method After==>', arr);

//   return arr;
// };

// export const updateMethodArray = (arrayData, objectToUpdated, updatedValue) => {
//   return arrayData.map(data =>
//     data?._id === objectToUpdated?._id ? {...data, ...updatedValue} : data,
//   );
// };

// export const mapURL = (lati, lang, name) => {
//   const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
//   const lat = lati;
//   const lng = lang;
//   const latLng = `${lat},${lng}`;
//   const label = name;
//   const url = Platform.select({
//     ios: `${scheme}${label}@${latLng}`,
//     android: `${scheme}${latLng}(${label})`,
//   });
//   Log('URL MAP:', url);
//   return url;
// };
