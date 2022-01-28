import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';

import TopImg from '../../shared/TopImg';
import Menu from '../../shared/Menu';

export default class Critical extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      menus: [{
        id: 1, title: 'CRITICAL BUSINESS INFO', action: 'CriticalInfo'    
      }, {
        id: 2, title: 'EMERGENCY CONTACTS', action: 'CriticalContacts'
      }, {
        id: 3, title: 'CONTINGENCY LOCATION', action: 'CriticalLocation'
      }],
    }
    this._keyExtractor = (item, index) => item.id.toString();
  }

  render() {
    const { navigate } = this.props.navigation;
    const Items = <FlatList contentContainerStyle={styles.list} numColumns={1}
      data={this.state.menus || []}
      keyExtractor={this._keyExtractor}
      renderItem={({ item }) => 
        <Menu
          navigation = { this.props.navigation }
          title={ item.title }
          action={ item.action }
        ></Menu>
      }
    />;

    return (
      <SafeAreaView style={ styles.container }>
        <TopImg image={ require('../../../../assets/critical.png') } />
        { Items }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36454f',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10
  },
  list: {
    flexDirection: 'column',
  },
});