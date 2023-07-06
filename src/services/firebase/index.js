import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const login = (email, pass) =>
  auth().signInWithEmailAndPassword(email, pass);

export const logout = () => auth().signOut();

export const register = (email, pass) =>
  auth().createUserWithEmailAndPassword(email, pass);

export const forgetPassword = email => auth().sendPasswordResetEmail(email);

export const addUser = (email, name, uid, bio) =>
  database()
    .ref(`/users/${uid}`)
    .set({
      id_user: uid,
      email: email,
      name: name,
      bio: bio || 'my bio',
      avatar: 'https://i.pravatar.cc/300',
    });

export const getProfile = email =>
  database().ref('users/').orderByChild('email').equalTo(email).once('value');

export const onRegisterWithRDB = async data =>
  database()
    .ref('/users/' + data.id)
    .set({
      id_user: data.uid,
      email: data.email,
      name: data.name,
    });

export const loginWithRDB = email =>
  database().ref('users/').orderByChild('emailId').equalTo(email).once('value');
