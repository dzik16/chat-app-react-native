import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../themes';

export default function index({source, title, message}) {
  return (
    <View style={styles.container}>
      <Image source={source} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SIZES.height / 4,
  },
  title: {...FONTS.h2, color: COLORS.black, marginTop: 10},
  message: {...FONTS.body3, color: COLORS.lightGray4, marginTop: 10},
});
