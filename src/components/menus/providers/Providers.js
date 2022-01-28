import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, View, Text, ActivityIndicator } from 'react-native';

import TopImg from '../../shared/TopImg';
import Menu from '../../shared/Menu';

export default class Providers extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      menus: [{
        id: 1, title: 'LACK OF KEY SERVICES', action: 'GeneralDetail', formid: '24', urgent: '147.', urgentLen: 7, routine: '193.', routineLen: 7, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 2, title: 'LACK OF KEY SUPPLIES', action: 'GeneralDetail', formid: '25', urgent: '147.', urgentLen: 6, routine: '195.', routineLen: 6, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 3, title: 'LOSS OF KEY SERVICES', action: 'GeneralDetail', formid: '27', urgent: '147.', urgentLen: 6, routine: '199.', routineLen: 6, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 4, title: 'LOSS OF KEY SUPPLIER', action: 'GeneralDetail', formid: '28', urgent: '147.', urgentLen: 6, routine: '168.', routineLen: 6, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 5, title: 'LOSS OF MUTUAL AID AGREEMENT', action: 'GeneralDetail', formid: '26', urgent: '147.', urgentLen: 6, routine: '197.', routineLen: 6, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 6, title: 'LOSS OF SERVICE LEVEL AGREEMENT', action: 'GeneralDetail', formid: '29', urgent: '147.', urgentLen: 6, routine: '170.', routineLen: 6, urgentBatch: '158', routineBatch: '164', entries: []
      }, {
        id: 7, title: 'OWN SCENARIOS', action: 'OwnScenarios', formid: '59', entries: []
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
    
    for (let i = 0; i < 7; i++) {
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
            parenttitle={ 'Providers - Action Cards' }
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
            topimage={ require('../../../../assets/providers.png') }
          ></Menu>
        )}
      />;
    }

    return (
      <SafeAreaView style={ styles.container }>
        <TopImg image={ require('../../../../assets/providers.png') } />
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