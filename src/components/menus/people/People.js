import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, View, Text, ActivityIndicator } from 'react-native';

import TopImg from '../../shared/TopImg';
import Menu from '../../shared/Menu';

export default class People extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      menus: [{
        id: 1, title: 'CEO / DIRECTOR ABSENT', action: 'GeneralDetail', formid: '43', urgent: '173.', urgentLen: 13, routine: '180.', routineLen: 13, urgentBatch: '174', routineBatch: '164', entries: []
      }, {
        id: 2, title: 'INDUSTRIAL ACTION', action: 'GeneralDetail', formid: '3', urgent: '177.', urgentLen: 8, routine: '166.', routineLen: 8, urgentBatch: '178', routineBatch: '164', entries: []
      }, {
        id: 3, title: 'INFECTIOUS DISEASE', action: 'GeneralDetail', formid: '4', urgent: '173.', urgentLen: 6, routine: '168.', routineLen: 6, urgentBatch: '174', routineBatch: '164', entries: []
      }, {
        id: 4, title: 'MANAGEMENT ABSENT', action: 'GeneralDetail', formid: '5', urgent: '176.', urgentLen: 12, routine: '168.', routineLen: 12, urgentBatch: '174', routineBatch: '164', entries: []
      }, {
        id: 5, title: 'MANAGEMENT TURNOVER', action: 'GeneralDetail', formid: '6', urgent: '173.', urgentLen: 7, routine: '168.', routineLen: 7, urgentBatch: '185', routineBatch: '184', entries: []
      }, {
        id: 6, title: 'SERIOUS INJURY OR FATALITY', action: 'GeneralDetail', formid: '7', urgent: '173.', urgentLen: 8, routine: '168.', routineLen: 8, urgentBatch: '174', routineBatch: '164', entries: []
      }, {
        id: 7, title: 'STAFF TURNOVER', action: 'GeneralDetail', formid: '8', urgent: '174.', urgentLen: 6, routine: '169.', routineLen: 6, urgentBatch: '175', routineBatch: '164', entries: []
      }, {
        id: 8, title: 'OWN SCENARIOS', action: 'OwnScenarios', formid: '53', entries: []
      }],
      activeForms: [],
      formCount: 0,
      userId: this.props.route.params.userId,
      isLoading: true
    }
    this._keyExtractor = (item, index) => item.id.toString();
    this.getForms();
  }

  getForms() {
    const GLOBAL = require('../../../Global');
    var URL_ENTRIES = 'https://bizcovery.canutemedia.com/wp-json/gf/v2/entries?search={"field_filters": [{"key":"created_by","value":"' + this.state.userId + '","operator":"is"}]}';
    
    for (let i = 0; i < 8; i++) {
      URL_ENTRIES += '&form_ids[' + i + ']=' + this.state.menus[i]['formid'];
    }
    console.log(URL_ENTRIES);

    fetch(URL_ENTRIES, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': GLOBAL.AUTH
      },
    })
      .then((response) => response.json())
      .then((json_) => {
        if (json_['total_count'] > 0) {
          json_['entries'].map(entry => {
            this.state.activeForms.push(entry['form_id']);
            this.state.menus
            .filter((menu) => menu['formid'] == entry['form_id'])
            .map(menu => {
              menu['entries'].push(entry);
            });
          });
        }
        this.setState({ formCount: json_['total_count'] });
        console.log(this.state.activeForms);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading } = this.state;

    var Items = <View style={styles.list}><Text style={ styles.message }></Text></View>;

    if (this.state.formCount != 0) {
      Items = <FlatList contentContainerStyle={styles.list} numColumns={1}
        data={this.state.menus || []}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => (this.state.activeForms.indexOf(item.formid) >= 0 &&
          <Menu
            navigation = { this.props.navigation }
            parenttitle={ 'People - Action Cards' }
            title={ item.title }
            action={ item.action }
            formid={ item.formid }
            urgent={ item.urgent }
            urgentLen={ item.urgentLen }
            routine={ item.routine }
            routineLen={ item.routineLen }
            urgentBatch={ item.urgentBatch }
            routineBatch={ item.routineBatch }
            entries={ item.entries }
            topimage={ require('../../../../assets/people.png') }
          ></Menu>
        )}
      />;
    }

    return (
      <SafeAreaView style={ styles.container }>
        <TopImg image={ require('../../../../assets/people.png') } />
        { isLoading ? <ActivityIndicator style={styles.indicator} color='#ffffff' size='large'/> : Items }
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
  message: {
    color: 'white'
  }
});