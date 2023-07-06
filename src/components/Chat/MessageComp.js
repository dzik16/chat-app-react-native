import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import TimeDelivery from './TimeDelivery';
import { COLORS } from '../../themes';

const MessageComp = ({item, sender}) => {

  console.log('item', item);
  console.log('sender', sender);

  return (
    <TouchableOpacity style={{marginVertical: 0}}>
      <View
        style={[(styles.triangleCSS, sender ? styles.right : [styles.left])]}
      />
      <View
        style={[
          styles.msgBox,
          {
            alignSelf: sender ? 'flex-end' : 'flex-start',
            // borderWidth:1,
            backgroundColor: sender ? COLORS.primary : '#fff',
          },
        ]}>
        <Text style={{color:  sender ? '#fff': '#000',fontSize:13 }}>{item.message}</Text>
        <TimeDelivery sender={sender} item={item}/>
      </View>
    </TouchableOpacity>
  );
};

export default MessageComp;

const styles = StyleSheet.create({
  msgBox: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    minWidth: 80,
    maxWidth: '80%',
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingTop: 5,
    borderRadius: 8,
  },
  triangleCSS: {
    position: 'absolute',
    // top: -3,
    width: 0,
    height: 0,
    // borderBottomLeftRadius:5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 5,
    borderBottomWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    right: 2,
    // top:0,
    bottom: 5,
    transform: [{rotate: '103deg'}],
  },
  left: {
    borderBottomColor:'#fff',
    left: 2,
    bottom: 10,
    transform: [{rotate: '0deg'}],
  },
  right: {
    borderBottomColor:'#0a2141',
    right: 2,
    // top:0,
    bottom: 5,
    transform: [{rotate: '103deg'}],
  },
});
