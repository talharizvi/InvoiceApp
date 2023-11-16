/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  Button,
} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Share from 'react-native-share';
import DatePicker from 'react-native-date-picker';

// Font Family Constant
const fontFamily = {
  Avenir: 'Avenir',
  AvenirHeavy: 'Avenir_Heavy',
  AvenirObliqueOrItalic: 'Avenir_Italic',
  AvenirBook: 'Avenir_Book',
  AvenirMedium: 'Avenir_Medium',
};

const BillScreen = props => {
  console.log({props});
  let maintainance = parseFloat(props.route.params.maintainance);
  let ltPaymentCharge = parseFloat(props.route.params?.ltPaymnt || 0);
  let balance = parseFloat(props.route.params?.bal || 0);
  let extra = parseFloat(props.route.params?.extra || 0);
  console.log('ltPaymentCharge', ltPaymentCharge);

  let totalAmount = maintainance + ltPaymentCharge + balance + extra;
  // create a ref
  const viewRef = useRef();

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  // async function hasAndroidPermission() {
  //   const getCheckPermissionPromise = () => {
  //     if (Platform.Version >= 33) {
  //       return Promise.all([
  //         PermissionsAndroid.check(
  //           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //         ),
  //         PermissionsAndroid.check(
  //           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
  //         ),
  //       ]).then(
  //         ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
  //           hasReadMediaImagesPermission && hasReadMediaVideoPermission,
  //       );
  //     } else {
  //       return PermissionsAndroid.check(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       );
  //     }
  //   };

  //   const hasPermission = await getCheckPermissionPromise();
  //   if (hasPermission) {
  //     return true;
  //   }
  //   const getRequestPermissionPromise = () => {
  //     if (Platform.Version >= 33) {
  //       return PermissionsAndroid.requestMultiple([
  //         PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //         PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
  //       ]).then(
  //         statuses =>
  //           statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
  //             PermissionsAndroid.RESULTS.GRANTED &&
  //           statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
  //             PermissionsAndroid.RESULTS.GRANTED,
  //       );
  //     } else {
  //       return PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
  //     }
  //   };

  //   return await getRequestPermissionPromise();
  // }

  // async function savePicture() {
  //   if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
  //     return;
  //   }

  //   const image = CameraRoll.save(tag, {type, album});
  //   if (image) {
  //     Alert.alert(
  //       '',
  //       'Image saved successfully.',
  //       [{text: 'OK', onPress: () => {}}],
  //       {cancelable: false},
  //     );
  //   }
  // }

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      //savePicture();

      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo');
      if (image) {
        Alert.alert(
          '',
          'Image saved successfully.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const shareImage = async () => {
    try {
      // capture component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      // share
      const shareResponse = await Share.open({url: uri});
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              paddingTop: 10,
              paddingBottom: 20,
              alignSelf: 'center',
              marginTop: 100,
            }}
            ref={viewRef}>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: fontFamily.AvenirHeavy,
                fontWeight: '900',
                fontSize: 18,
                color: '#000',
              }}>
              श्री स्वस्तिक को-ऑप. हाउसिंग सोसायटी लि.
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.Avenir,
                fontSize: 14,
                textAlign: 'justify',
                alignSelf: 'center',
                color: '#000',
              }}>
              (टिएनए / व्हीएसआय/एचएसजी / (टिसी)/२५७३१/ सन २०१३)
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.Avenir,
                fontSize: 16,
                textAlign: 'justify',
                alignSelf: 'center',
                color: '#000',
              }}>
              सर्वे नं. ४१९. (पार्ट), प्लॉट नं. २, हनुमान नगर,
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.Avenir,
                fontSize: 16,
                textAlign: 'justify',
                alignSelf: 'center',
                color: '#000',
              }}>
              नालासोपारा (प.), ता. वसई, जि. पालघर
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontFamily: fontFamily.Avenir,
                  fontSize: 14,
                  color: '#000',
                }}>
                S/N: {props.route.params?.serialNumber || ' '}
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.Avenir,
                  fontSize: 14,
                  color: '#000',
                }}>
                Date: {props.route.params.date}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: fontFamily.Avenir,
                fontSize: 16,
                color: '#000',
              }}>
              Mr. {props.route.params.name}
            </Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: 'black',
                }}>
                <Text
                  style={{
                    flex: 2,
                    borderRightWidth: 1,
                    borderRightColor: 'black',
                    textAlign: 'center',
                    fontFamily: fontFamily.AvenirHeavy,
                    fontWeight: '900',
                    color: '#000',
                  }}>
                  तपशील
                </Text>

                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fontFamily.AvenirHeavy,
                    fontWeight: '900',
                    color: '#000',
                  }}>
                  रक्कम
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    borderRightWidth: 1,
                    borderRightColor: 'black',
                    flex: 2,
                  }}>
                  <Text style={styles.categoryTitle}>Maintenance</Text>

                  <Text style={styles.categoryTitle}>Late Payment Charge</Text>

                  <Text style={styles.categoryTitle}>Balance</Text>

                  <Text style={[styles.categoryTitle, {marginBottom: 50}]}>
                    Other
                  </Text>
                </View>

                <View style={{flex: 1}}>
                  {maintainance > 0 && (
                    <Text style={styles.categoryTxt}>
                      Rs {maintainance > 0 ? maintainance : ' '}
                    </Text>
                  )}

                  {ltPaymentCharge > 0 && (
                    <Text style={styles.categoryTxt}>
                      Rs {ltPaymentCharge > 0 ? ltPaymentCharge : ' '}
                    </Text>
                  )}

                  {balance > 0 && (
                    <Text style={styles.categoryTxt}>
                      Rs {balance > 0 ? balance : ' '}
                    </Text>
                  )}

                  {extra > 0 && (
                    <Text style={[styles.categoryTxt, {marginBottom: 10}]}>
                      Rs {extra > 0 ? extra : ' '}
                    </Text>
                  )}
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderColor: 'black',
                  borderTopWidth: 1,
                }}>
                <Text
                  style={{
                    flex: 2,
                    borderRightWidth: 1,
                    borderRightColor: 'black',
                    textAlign: 'center',
                    fontFamily: fontFamily.Avenir,
                    fontSize: 16,
                    color: '#000',
                  }}>
                  Total
                </Text>

                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fontFamily.Avenir,
                    fontSize: 16,
                    color: '#000',
                  }}>
                  Rs {totalAmount}
                </Text>
              </View>
            </View>

            {/* <Text
              style={{
                fontStyle: 'italic',
                marginTop: 10,
                fontFamily: fontFamily.AvenirObliqueOrItalic,
              }}>
              Please make payment at cash counter.
            </Text>
            <Text
              style={{
                fontStyle: 'italic',
                fontFamily: fontFamily.AvenirObliqueOrItalic,
              }}>
              Also available fresh Paneer and Curd.
            </Text>
            <Text
              style={{
                fontStyle: 'italic',
                fontFamily: fontFamily.AvenirObliqueOrItalic,
              }}>
              Please make payment before 10th of current month.{' '}
            </Text>
            <Text style={{marginTop: 20, fontFamily: fontFamily.Avenir}}>
              Receiver's Sign
            </Text> */}
          </View>

          <View style={[styles.row, {marginTop: 100}]}>
            <TouchableOpacity style={styles.button} onPress={shareImage}>
              <Text style={styles.btnText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={downloadImage}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate('Reset', {reset: true})}>
              <Text style={styles.btnText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  categoryTitle: {
    textAlign: 'center',
    fontFamily: fontFamily.Avenir,
    marginTop: 5,
    fontSize: 16,
    color: '#000',
  },
  categoryTxt: {
    fontFamily: fontFamily.Avenir,
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: '#000',
  },
  btnText: {
    color: '#fff',
  },
  body: {
    marginTop: 100,
    alignItems: 'center',
  },
  savedComponent: {
    backgroundColor: 'white',
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: 252,
    height: 150,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 5,
  },
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '75%',
  },
  button: {
    backgroundColor: '#7B450E',
    padding: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
});

export default BillScreen;
