import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import moment from 'moment';

import {ChatHeader, MessageComp} from '../../components/';
import {BackgroundChat} from '../../assets';
import {COLORS} from '../../themes';

export default function ChatScreen(props) {
  const userProfile = useSelector(state => state.UserReducer.userData);
  const {receiverData} = props.route.params;

  const [message, setmessage] = useState('');
  const [update, setUpdate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [allChat, setAllChat] = useState([]);

  useEffect(() => {
    let isMounted = true; // useEffect will be called only once
    const onChildAdd = database()
      .ref('/messages/' + receiverData.roomId)
      .on('child_added', snapshot => {
        // console.log('A new node has been added', snapshot.val());
        setAllChat(state => [snapshot.val(), ...state]);
      });

    // Stop listening for updates when no longer required
    return () => {
      database()
        .ref('/messages/' + receiverData.roomId)
        .off('child_added', onChildAdd);
      isMounted = false;
    };
  }, [receiverData.roomId]);

  // const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

  const sendMessage = () => {
    // if (message === '' || msgvalid(message) == 0) {
    //   alert('Enter something....');
    //   return false;
    // }

    setDisabled(true);

    let messageData = {
      roomId: receiverData.roomId,
      message: message,
      from: userProfile?.id_user,
      to: receiverData.id_user,
      sendTime: moment().format(),
      messageType: 'text',
    };

    const newReference = database()
      .ref('/messages/' + receiverData.roomId)
      .push();
    // console.log('Auto generated key: ', newReference.key);
    messageData.id = newReference.key;
    newReference.set(messageData).then(() => {
      let chatListUpdate = {
        lastMessage: message,
        sendTime: messageData.sendTime,
      };

      database()
        .ref('/chatlist/' + receiverData?.id_user + '/' + userProfile?.id_user)
        .update(chatListUpdate)
        .then(() => console.log('Data updated.'));

      database()
        .ref('/chatlist/' + userProfile?.id_user + '/' + receiverData?.id_user)
        .update(chatListUpdate)
        .then(() => console.log('Data updated.'));

      setmessage('');
      setDisabled(false);
    });
  };

  return (
    <View style={{position: 'relative', flex: 1}}>
      <ChatHeader data={receiverData} />
      <ImageBackground source={BackgroundChat} style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          data={allChat}
          inverted
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return (
              <MessageComp
                sender={item.from == userProfile.id_user}
                item={item}
              />
            );
          }}
        />
      </ImageBackground>
      <View style={styles.msgWrapper}>
        <TextInput
          style={styles.msgInput}
          placeholder="type a messages"
          multiline={true}
          onChangeText={text => setmessage(text)}
          value={message}
        />
        {message !== '' && (
          <TouchableOpacity onPress={sendMessage} style={styles.btnSend}>
            <Icon name="send" size={25} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  msgWrapper: {
    backgroundColor: COLORS.primary,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
  },
  msgInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#fff',
    paddingHorizontal: 15,
    color: '#000',
  },
  btnSend: {
    marginLeft: 15,
  },
});
