/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SearchBar} from '@rneui/base';
import {COLORS, FONTS} from '../../../themes';
import React, {useState, useEffect} from 'react';
import uuid from 'react-native-uuid';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';

const SearchUser = props => {
  const userProfile = useSelector(state => state.UserReducer.userData);

  const [search, setSearch] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [allUserBackUp, setAllUserBackUp] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    database()
      .ref('users')
      .once('value')
      .then(snapshot => {
        console.log('All User data: ', Object.values(snapshot.val()));
        setAllUser(
          Object.values(snapshot.val()).filter(
            it => it.id_user !== userProfile.id_user,
          ),
        );
        setAllUserBackUp(
          Object.values(snapshot.val()).filter(
            it => it.id_user !== userProfile.id_user,
          ),
        );
      });
  };

  const searchuser = val => {
    setSearch(val);
    setAllUser(
      allUserBackUp.filter(x =>
        x.name.toLowerCase().includes(val.toLowerCase()),
      ),
    );
  };

  const createChatList = data => {
    console.log('Data', data);
    database()
      .ref('/chatlist/' + userProfile.id_user + '/' + data.id_user)
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());

        if (snapshot.val() == null) {
          let roomId = uuid.v4();
          const newData = {
            roomId,
            id_user: userProfile.id_user,
            name: userProfile.name,
            avatar: userProfile.avatar,
            emailId: userProfile.emailId,
            bio: userProfile.bio,
            lastMessage: '',
          };

          database()
            .ref('/chatlist/' + data.id_user + '/' + userProfile.id_user)
            .update(newData)
            .then(() => console.log('Data updated.'));

          data.lastMessage = '';
          data.roomId = roomId;

          database()
            .ref('/chatlist/' + userProfile.id_user + '/' + data.id_user)
            .update(data)
            .then(() => console.log('Data updated.'));

          props.navigation.navigate('ChatScreen', {receiverData: data});
        } else {
          props.navigation.navigate('ChatScreen', {
            receiverData: snapshot.val(),
          });
        }
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.listUser}
      onPress={() => createChatList(item)}>
      <Image
        source={{
          uri: item.avatar,
        }}
        style={styles.avatar}
      />
      <View style={styles.infoUser}>
        <Text style={styles.nameContact}> {item.name} </Text>
        <Text style={styles.textMassage}> {item.bio} </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <SearchBar
        theme={'light'}
        placeholder="Search by name..."
        onChangeText={val => searchuser(val)}
        value={search}
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SearchUser;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
  },
  searchInput: {
    ...FONTS.body3,
    color: COLORS.black,
    opacity: 0.7,
  },
  listUser: {
    flexDirection: 'row',
    marginTop: 12,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  infoUser: {
    flexDirection: 'column',
    marginTop: 5,
    marginLeft: 15,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  nameContact: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  textMassage: {
    fontSize: 13,
  },
});
