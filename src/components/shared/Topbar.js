import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default class Topbar extends React.Component {
  render() {
    return (
      <View style={[styles.container, styles.statusBarMargin]} >
        <Text style={{ width:50 }}></Text>
        <Text style={ styles.title }>{ this.props.title }</Text>
        <TouchableOpacity onPress={()=>{ this.props.navigation.dispatch(DrawerActions.openDrawer()) }}>
          <Ionicons name="ios-menu" size={32} style={{ color: 'white' }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height: (Platform.OS === 'ios') ? 44 : 60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal: 20,
    backgroundColor: '#e36f2c'
  },
  statusBarMargin: {
    marginTop: (Platform.OS === 'ios') ? 0 : 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
});