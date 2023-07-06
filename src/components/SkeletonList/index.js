import {ListItem, Skeleton} from '@rneui/base';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function index() {
  return (
    <>
      <ListItem containerStyle={styles.container}>
        <Skeleton circle width={40} height={40} />
        <Skeleton variant="circular" width={300} height={40} />
      </ListItem>
      <ListItem containerStyle={styles.container}>
        <Skeleton circle width={40} height={40} />
        <Skeleton variant="circular" width={300} height={40} />
      </ListItem>
      <ListItem containerStyle={styles.container}>
        <Skeleton circle width={40} height={40} />
        <Skeleton variant="circular" width={300} height={40} />
      </ListItem>
      <ListItem containerStyle={styles.container}>
        <Skeleton circle width={40} height={40} />
        <Skeleton variant="circular" width={300} height={40} />
      </ListItem>
      <ListItem containerStyle={styles.container}>
        <Skeleton circle width={40} height={40} />
        <Skeleton variant="circular" width={300} height={40} />
      </ListItem>
      <ListItem containerStyle={styles.container}>
        <Skeleton circle width={40} height={40} />
        <Skeleton variant="circular" width={300} height={40} />
      </ListItem>
      <ListItem containerStyle={styles.container}>
        <Skeleton circle width={40} height={40} />
        <Skeleton variant="circular" width={300} height={40} />
      </ListItem>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginVertical: 0,
  },
});
