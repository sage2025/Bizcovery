import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, View, Text, ActivityIndicator } from 'react-native';

import TopImg from '../../shared/TopImg';
import Menu from '../../shared/Menu';

export default class Premises extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      menus: [{
        id: 1, title: 'BURGLARY', action: 'GeneralDetail', formid: '9', urgent: '174.', urgentLen: 6, routine: '169.', routineLen: 6, urgentBatch: '175', routineBatch: '164', entries: []
      }, {
        id: 2, title: 'CONTAMINATION', action: 'GeneralDetail', formid: '10', urgent: '147.', urgentLen: 13, routine: '168.', routineLen: 13, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 3, title: 'FIRE / SMOKE DAMAGE', action: 'GeneralDetail', formid: '11', urgent: '147.', urgentLen: 7, routine: '171.', routineLen: 7, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 4, title: 'INTERIOR DAMAGE', action: 'GeneralDetail', formid: '12', urgent: '147.', urgentLen: 7, routine: '171.', routineLen: 7, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 5, title: 'PREMISES INACCESSIBLE', action: 'GeneralDetail', formid: '13', urgent: '147.', urgentLen: 7, routine: '171.', routineLen: 7, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 6, title: 'STRUCTURAL DAMAGE', action: 'GeneralDetail', formid: '14', urgent: '147.', urgentLen: 9, routine: '173.', routineLen: 9, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 7, title: 'WATER DAMAGE', action: 'GeneralDetail', formid: '15', urgent: '147.', urgentLen: 7, routine: '175.', routineLen: 7, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 8, title: 'OWN SCENARIOS', action: 'OwnScenarios', formid: '54', entries: []
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
            parenttitle={ 'Premises - Action Cards' }
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
            topimage={ require('../../../../assets/premises.png') }
          ></Menu>
        )}
      />;
    }

    return (
      <SafeAreaView style={ styles.container }>
        <TopImg image={ require('../../../../assets/premises.png') } />
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