import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../themes';
import Icon from 'react-native-vector-icons/dist/Feather';

const ChatHeader = props => {
  const {data} = props;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={{
            uri: data.avatar,
          }}
          style={styles.photoProfile}
        />
        <View>
          <Text style={styles.nameUser}>{data.name}</Text>
          <Text style={{color: '#fff'}}>online</Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={{marginRight: 20}}>
          <Icon name="video" size={21} color="#fbfbfb" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="phone-call" size={21} color="#fbfbfb" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameUser: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 3,
  },
  photoProfile: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginRight: 20,
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    marginTop: 10,
    flexDirection: 'row',
  },
});
