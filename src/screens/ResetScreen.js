import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Platform,
  PixelRatio,
  TextInput,
} from 'react-native';
import HeaderBar from './HeaderBar';
let scale = PixelRatio.getFontScale();
let inputHeight = scale > 1.15 ? 55 : 45;

const ResetScreen = props => {
  console.log({props});
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState(0);
  const [date, setDate] = useState('');
  const [maintainance, setMaintainance] = useState(0);
  const [bal, setBal] = useState(0);
  const [ltPaymnt, setLtPaymnt] = useState(0);
  const [extra, setExtra] = useState(0);
  useEffect(() => {
    if (props.route.params) {
      setName('');
      setDate('');
      setMaintainance(0);
      setLtPaymnt(0);
      setBal(0);
      setExtra(0);
      setSerialNumber(0);
    }
  }, [props.route.params]);

  return (
    <ScrollView style={{flex: 1}}>
      {/* <HeaderBar title={'Home'}  /> */}
      <View style={{marginHorizontal: 15, marginTop: 60}}>
        <View style={styles.inputLayout}>
          <Text style={styles.inputLabel}>Customer Name</Text>
          <TextInput
            style={[
              styles.inputStyle,
              name != ''
                ? {borderBottomColor: '#7B450E'}
                : {borderBottomColor: '#C1C6C8'},
            ]}
            placeholder="Enter Name"
            autoCapitalize="words"
            placeholderTextColor="#B0B0B0"
            value={name}
            onChangeText={name => setName(name)}
          />
        </View>

        <View style={styles.inputLayout}>
          <Text style={styles.inputLabel}>Serial Number</Text>
          <TextInput
            style={[
              styles.inputStyle,
              serialNumber != ''
                ? {borderBottomColor: '#7B450E'}
                : {borderBottomColor: '#C1C6C8'},
            ]}
            placeholder="Enter serial number"
            placeholderTextColor="#B0B0B0"
            value={serialNumber != 0 ? String(serialNumber) : null}
            keyboardType="numeric"
            onChangeText={text => setSerialNumber(text)}
          />
        </View>

        <View style={styles.inputLayout}>
          <Text style={styles.inputLabel}>Date</Text>
          <TextInput
            style={[
              styles.inputStyle,
              name != ''
                ? {borderBottomColor: '#7B450E'}
                : {borderBottomColor: '#C1C6C8'},
            ]}
            placeholder="Enter Date"
            placeholderTextColor="#B0B0B0"
            value={date}
            onChangeText={date => setDate(date)}
          />
        </View>

        <View style={styles.inputLayout}>
          <Text style={styles.inputLabel}>Maintainance</Text>
          <TextInput
            style={[
              styles.inputStyle,
              maintainance != ''
                ? {borderBottomColor: '#7B450E'}
                : {borderBottomColor: '#C1C6C8'},
            ]}
            placeholder="Enter Maintanance"
            placeholderTextColor="#B0B0B0"
            value={maintainance != 0 ? String(maintainance) : null}
            keyboardType="numeric"
            onChangeText={text => setMaintainance(text)}
          />
        </View>

        <View style={styles.inputLayout}>
          <Text style={styles.inputLabel}>Balance</Text>
          <TextInput
            style={[
              styles.inputStyle,
              bal != ''
                ? {borderBottomColor: '#7B450E'}
                : {borderBottomColor: '#C1C6C8'},
            ]}
            placeholder="Enter Balance"
            autoCapitalize="words"
            placeholderTextColor="#B0B0B0"
            value={bal != 0 ? String(bal) : null}
            keyboardType="numeric"
            onChangeText={bal => setBal(bal)}
          />
        </View>

        <View style={styles.inputLayout}>
          <Text style={styles.inputLabel}>Late Payment Charge</Text>
          <TextInput
            style={[
              styles.inputStyle,
              ltPaymnt != ''
                ? {borderBottomColor: '#7B450E'}
                : {borderBottomColor: '#C1C6C8'},
            ]}
            placeholder="Enter charge"
            autoCapitalize="words"
            placeholderTextColor="#B0B0B0"
            value={ltPaymnt != 0 ? String(ltPaymnt) : null}
            keyboardType="numeric"
            onChangeText={text => setLtPaymnt(text)}
          />
        </View>

        <View style={styles.inputLayout}>
          <Text style={styles.inputLabel}>Other amount</Text>
          <TextInput
            style={[
              styles.inputStyle,
              extra != ''
                ? {borderBottomColor: '#7B450E'}
                : {borderBottomColor: '#C1C6C8'},
            ]}
            placeholder="Enter other"
            autoCapitalize="words"
            placeholderTextColor="#B0B0B0"
            value={extra != 0 ? String(extra) : null}
            keyboardType="numeric"
            onChangeText={extra => setExtra(extra)}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{alignItems: 'center', marginBottom: 20}}
        onPress={() =>
          props.navigation.navigate('Bill', {
            name,
            date,
            ltPaymnt,
            bal,
            extra,
            maintainance,
            serialNumber,
          })
        }>
        <Text
          style={{
            textAlign: 'center',
            color: '#FFFFFF',
            paddingHorizontal: 10,
            backgroundColor: '#7B450E',
            width: '50%',
            paddingVertical: 20,
            borderRadius: 8,
          }}>
          Generate Bill
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputLayout: {
    marginBottom: 25,
  },
  inputLabel: {
    color: '#7B450E',
    //fontFamily: fontFamily.Avenir,
    fontSize: 14,
    fontWeight: '300',
  },
  inputStyle: {
    height: inputHeight,
    color: '#382A0E',
    //fontFamily: fontFamily.Avenir,
    fontSize: 16,
    fontWeight: '300',
    borderBottomWidth: 1,
    paddingLeft: 0,
  },
});

export default ResetScreen;
