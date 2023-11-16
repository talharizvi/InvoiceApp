import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  PixelRatio,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
//import { color } from './Constants';
//import StatusBarGradient from './StatusBarGradient';
const screen = Dimensions.get('window');
// status bar height
const StatusBarHeight = Platform.OS === 'ios' ? 25 : StatusBar.currentHeight;
let scale = PixelRatio.getFontScale();
export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
      title: this.props.title,
      left: this.props.leftElement ? true : false,
      right: this.props.rightElement ? true : false,
    };
  }

  UNSAFE_componentWillReceiveProps(props) {
    const {navigation, title, leftElement, rightElement} = props;

    this.setState({
      navigation: navigation,
      title: title,
      left: leftElement ? true : false,
      right: rightElement ? true : false,
    });
  }

  // default Header left icon
  // leftIcon     =   () => {
  //     return (
  //         <View style={CommonStyle.leftIconClass} >
  //             <Image source={require('../images/user.png')}
  //                    style={{height:40, width: 40, borderRadius:20}}/>
  //         </View>
  //     );
  // }

  // default Header right icon
  // rightIcon     =   () => {
  //     return (
  //         <View style={CommonStyle.leftIconClass} >
  //             <SvgIcon icon={"LogoWhiteIcon"} width={"100%"} height={"100%"} />
  //         </View>
  //     );
  // }

  render() {
    return (
      <View>
        <View style={styles.header}>
          {/* <View style={CommonStyle.leftElement}>
                        {
                            this.state.left ? (
                                this.props.leftElement
                            ) : this.leftIcon()
                        }
                    </View> */}
          <View style={styles.centerElement}>
            <Text numberOfLines={1} style={styles.headerText}>
              {this.state.title}
            </Text>
          </View>
          {/* <View style={CommonStyle.rightElement}>
                        {
                            this.state.right ? (
                                this.props.rightElement
                            ) : this.rightIcon()
                        }
                    </View> */}
        </View>
      </View>
    );
  }
}
// Font Family Constant
const fontFamily = {
  Avenir: 'Avenir',
  AvenirHeavy: 'Avenir_Heavy',
  AvenirObliqueOrItalic: 'Avenir_Italic',
  AvenirBook: 'Avenir_Book',
  AvenirMedium: 'Avenir_Medium',
};

const styles = StyleSheet.create({
  centerElement: {
    width: scale > 1.15 ? screen.width * 0.6 : screen.width * 0.7,
    alignItems: 'center',
    paddingTop: StatusBarHeight,
    justifyContent: 'center',
    paddingBottom: 0,
  },
  header: {
    height: 30 + StatusBarHeight,
    justifyContent: 'center',
    paddingBottom: 0,
    flexDirection: 'row',
    backgroundColor: '#7B450E',
    alignItems: 'center',
  },
  headerText: {
    //fontSize : 14,
    color: '#FFFFFF',
    fontWeight: '900',
    fontFamily: fontFamily.Avenir,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
});
