import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {LogoSplash} from '../../assets';
import {COLORS, FONTS, SIZES} from '../../themes';

export default function Splash({navigation}) {
  const {isLogin} = useSelector(state => state.UserReducer);
  return (
    <View style={styles.container}>
      <LottieView
        source={LogoSplash}
        style={styles.logoImage}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          isLogin
            ? navigation.replace('DashboardUserScreen')
            : navigation.replace('LoginScreen');
        }}
      />
      <Text style={styles.copyright}>Made by ❤️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyright: {
    ...FONTS.body4,
    color: COLORS.lightGray,
    position: 'absolute',
    bottom: 19,
    letterSpacing: 7,
  },
  logoImage: {
    height: SIZES.width * 0.7,
    width: SIZES.width * 0.7,
    alignSelf: 'center',
  },
});
