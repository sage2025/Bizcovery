import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import TopImg from '../../../shared/TopImg';
import SubTitle from '../../../shared/SubTitle';

export default class CriticalInfo extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      content: 'CRITICAL BUSINESS INFORMATION',
      userId: this.props.route.params.userId,
      data: [],
      message: '',
      isLoading: true
    }
    this.loadDataFromEndpoint();
  }

  loadDataFromEndpoint() {
    const GLOBAL = require('../../../../Global');
    var URL_ENTRIES = 'https://bizcovery.canutemedia.com/wp-json/gf/v2/forms/48/entries?search={"field_filters": [{"key":"created_by","value":"' + this.state.userId + '","operator":"is"}]}';

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
          this.setState({ data: [...this.state.data, json['entries'][0]['79'], ...json['entries'][0]['73']] });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading, message } = this.state;

    return (
      <SafeAreaView style={ styles.container }>
        <TopImg image={ require('../../../../../assets/critical.png') } />
        <SubTitle subtitle='CRITICAL BUSINESS INFO'></SubTitle>
        { isLoading ? <ActivityIndicator style={styles.indicator} color='#ffffff' size='large'/> :
          ( message != '' ? <Text style={styles.message}>{ message }</Text> : <FlatList
          style={styles.textContainer}
          data={data}
          keyExtractor={({name}, index) => name}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Ionicons name="information-circle-outline" size={20} style={styles.icon} />
              <Text style={styles.content}>{item}</Text>
            </View>
          )}
          /> )
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
    padding: 20
  },
  indicator: {
    marginTop: 50
  },
  textContainer: {
    flex: 1,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#eeeeee',
    padding: 10
  },
  row: {
    flexDirection: 'row'
  },
  icon: {
    marginTop: 10
  },
  content: {
    flex: 1,
    fontSize: 14,
    margin: 10
  },
  message: {
    color: 'white'
  }
});