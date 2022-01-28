import React from 'react';
import { View, StyleSheet, Text, SectionList, SafeAreaView } from 'react-native';

import TopImg from './TopImg';
import SubTitle from './SubTitle';

export default class GeneralDetail extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      userId: this.props.route.params.userId,
      formid: this.props.route.params.formid,
      urgent: this.props.route.params.urgent,
      urgentLen: this.props.route.params.urgentLen,
      routine: this.props.route.params.routine,
      routineLen: this.props.route.params.routineLen,
      urgentBatch: this.props.route.params.urgentBatch,
      routineBatch: this.props.route.params.routineBatch,
      entries: this.props.route.params.entries,
      urgentData: [],
      routineData: [],
    }
    this.loadData();
  }

  loadData() {
    if (this.state.entries.length > 0) {
      let json = this.state.entries[0];
      for (let i = 1; i <= this.state.urgentLen; i ++) {
        let urgentIndex = this.state.urgent + i;
        if (json[urgentIndex] != null && String(json[urgentIndex]).trim() != '')
          this.state.urgentData.push(json[urgentIndex]);
      }
      for (let j = 1; j <= this.state.routineLen; j ++) {
        let routineIndex = this.state.routine + j;
        if (json[routineIndex] != null && String(json[routineIndex]).trim() != '')
          this.state.routineData.push(json[routineIndex]);
      }
      if (this.state.urgentBatch != '') {
        let urgentBatch = json[this.state.urgentBatch];
        this.state.urgentData.push(...urgentBatch);
      }
      if (this.state.routineBatch != '') {
        let routineBatch = json[this.state.routineBatch];
        this.state.routineData.push(...routineBatch);
      }
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({title: this.props.route.params.parenttitle});
  }

  render() {
    const FlatListItemSeparator = () => {
      return (
        <View style={styles.listItemSeparatorStyle} />
      );
    };

    return (
      <SafeAreaView style={ styles.container }>
        <TopImg image={ this.props.route.params.topimage } />
        <SubTitle subtitle={ this.props.route.params.subtitle }></SubTitle>
        <View style={styles.listContainer}>
          <SectionList
            ItemSeparatorComponent={FlatListItemSeparator}
            sections={[
              {title: 'URGENT ACTIONS', data: this.state.urgentData},
              {title: 'ROUTINE ACTIONS', data: this.state.routineData},
            ]}
            renderSectionHeader={({section}) => (
              <Text style={styles.sectionHeaderStyle}>
                {section.title}
              </Text>
            )}
            renderItem={({item}) => (
              <Text
                style={styles.sectionListItemStyle}>
                - {item}
              </Text>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
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
  listContainer: {
    flex: 1,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#eeeeee',
    padding: 10,
    margin: 10
  },
  sectionHeaderStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#eeeeee'
  },
  sectionListItemStyle: {
    marginLeft: 20,
    padding: 10,
  },
  listItemSeparatorStyle: {
    height: 1,
  },
});