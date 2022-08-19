import { Alert, ToastAndroid } from "react-native";

export const alertMessage = (showText, headerText = "") => {
  Alert.alert(headerText, showText);
};

export const confirmAlert = (
  showText,
  headerText,
  btnConfirm,
  btnConfirmOnPress,
  btnCancel,
  btnCancelOnPress
) => {
  Alert.alert("", showText, [
    {
      text: btnCancel,
      onPress: btnCancelOnPress,
      style: "cancel",
    },
    { text: btnConfirm, onPress: btnConfirmOnPress },
  ]);
};

export const toastMessages = (showMessage) => {
  ToastAndroid.showWithGravityAndOffset(
    showMessage,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    0,
    25
  );
};

export const checkArray = (arr) => {
  if (Array.isArray(arr) && arr.length > 0) {
    return true;
  }
  return false;
};

export const getElementOfArray = (arr, element) => {
  return arr[element];
};
