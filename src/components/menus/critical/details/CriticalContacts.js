import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, SafeAreaView, Linking } from 'react-native';

import TopImg from '../../../shared/TopImg';
import SubTitle from '../../../shared/SubTitle';

export default class CriticalContacts extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      userId: this.props.route.params.userId,
      contacts: [],
      message: '',
      isLoading: true
    }
    this.loadDataFromEndpoint();
  }

  loadDataFromEndpoint() {
    const GLOBAL = require('../../../../Global');
    var URL_ENTRIES = 'https://bizcovery.canutemedia.com/wp-json/gf/v2/forms/1/entries?search={"field_filters": [{"key":"created_by","value":"' + this.state.userId + '","operator":"is"}]}';

    fetch(URL_ENTRIES, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GLOBAL.AUTH
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ message: json['message'] ? json['message'] : '' });
        if (json['total_count'] > 0) {
          this.setState({ contacts: json['entries'] });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { contacts, isLoading, message } = this.state;

    return (
      <SafeAreaView style={ styles.container }>
        <TopImg image={ require('../../../../../assets/critical.png') } />
        <SubTitle subtitle='EMERGENCY CONTACTS'></SubTitle>
        { isLoading ? <ActivityIndicator style={styles.indicator} color='#ffffff' size='large'/> :
          ( message != '' ? <Text style={ styles.message }>{ message }</Text> : <FlatList
          style={styles.textContainer}
          data={contacts}
          keyExtractor={({name}, index) => name}
          renderItem={({ item }) => (
            <View style={styles.contactContainer}>
              <Text style={styles.contactHeader}>{item['85']}</Text>
              <Text style={styles.contactCommon}>{item['86']}</Text>
              <Text style={styles.contactCommon}>{item['87.3']} {item['87.6']}</Text>
              <Text style={[styles.contactCommon, styles.phone]} onPress={() => { Linking.openURL(`tel:` + item['88']) }}>{item['88']}</Text>
              <Text style={[styles.contactCommon, styles.phone]} onPress={() => { Linking.openURL(`tel:` + item['89']) }}>{item['89']}</Text>
              <Text style={[styles.contactCommon, styles.mail]} onPress={() => { Linking.openURL(`mailto:` + item['90']) }}>{item['90']}</Text>
            </View>
          )}
          />)
        }
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
  indicator: {
    marginTop: 50
  },
  textContainer: {
    flex: 1,
  },
  contactContainer: {
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 10,
  },
  contactHeader: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactCommon: {
    fontSize: 14,
    marginLeft: 50,
  },
  phone: {
    color: '#e47c40',
  },
  mail: {
    color: '#e47c40'
  },
  message: {
    color: 'white'
  }
});