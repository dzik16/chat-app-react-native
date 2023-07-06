/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import database from '@react-native-firebase/database';

export default function CrudScreen() {
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [name, setName] = useState('');

  const readPokeBagData = () => {
    setLoading(true);
    const refrence = database().ref('/pokemonBag');
    refrence.on('value', snapshot => {
      const data = snapshot.val();
      GetData(data);
      console.log('data', data);
      setLoading(false);
    });
  };

  const savePokemon = () => {
    if (name === '') {
      Alert.alert('Error', 'Harap isi field');
      return false;
    }
    const refrence = database().ref('/pokemonBag');
    try {
      refrence.push({name: name});
      Alert.alert('Successfully Saved');
      setName('');
    } catch (error) {
      Alert.alert('Ops', error);
    }
  };

  const removePokemon = async id => {
    try {
      await database().ref(`/pokemonBag/${id}`).remove();
      Alert.alert('Successfully Removed');
    } catch (error) {
      Alert.alert('Ops', error);
    }
  };

  const updatePokemon = async id => {
    try {
      await database().ref(`/pokemonBag/${id}`).update({name: 'Updated'});
      Alert.alert('Successfully Removed');
    } catch (error) {
      Alert.alert('Ops', error);
    }
  };

  const GetData = data => {
    let keyFirebase = [];
    keyFirebase = Object.keys(data);
    setKey(keyFirebase);
    setPokemonData(data);
  };

  useEffect(() => {
    readPokeBagData();
  }, []);
  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Pokemon Bag</Text>
          </View>
          <FlatList
            data={key}
            ListHeaderComponent={() => (
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Pokemon Name"
                  onChangeText={value => {
                    setName(value);
                  }}
                  value={name}
                />
                <Button title="Save" onPress={() => savePokemon()} />
              </View>
            )}
            renderItem={({item, index}) => (
              <View style={styles.listPokemons}>
                <TouchableOpacity style={styles.pokeBagItem}>
                  <Text style={styles.pokeBagItemText}>
                    🔴 {pokemonData[item]?.name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => updatePokemon(item)}
                  style={styles.delete}>
                  <Text style={styles.pokeBagItemText}>📝</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removePokemon(item)}
                  style={styles.edit}>
                  <Text style={styles.pokeBagItemText}>❌</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  bodyContent: {
    flex: 5,
  },
  listPokemons: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pokeBag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pokeBagItem: {
    width: '50%',
    height: 50,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
  },
  delete: {
    width: '10%',
    height: 50,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
  },
  edit: {
    width: '10%',
    height: 50,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
  },
  pokeBagItemText: {
    color: '#fff',
    fontSize: 18,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#00BFFF',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#00BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
