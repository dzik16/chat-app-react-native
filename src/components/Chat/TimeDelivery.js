import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import moment from 'moment';

const TimeDelivery = props => {
  const {item, sender} = props;

  return (
    <View
      style={[
        styles.mainView,
        {
          justifyContent: 'flex-end',
        },
      ]}>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 7,
          color: sender ? '#fff' : '#000',
        }}>
        {moment(item.sendTime).format('LLL')}
      </Text>
      <Icon
        name={'check-all'}
        style={{
          color: item.seen ? '#000': '#fff',
          fontSize: 15,
          marginLeft: 5,
        }}
      />
    </View>
  );
};

export default TimeDelivery;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
});
