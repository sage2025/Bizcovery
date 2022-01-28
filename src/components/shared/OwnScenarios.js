import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, SectionList, SafeAreaView } from 'react-native';

import TopImg from './TopImg';
import SubTitle from './SubTitle';

export default class OwnScenarios extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      userId: this.props.route.params.userId,
      formid: this.props.route.params.formid,
      entries: this.props.route.params.entries,
      scenarios: [],
    }
    this.loadData();
  }

  loadData() {
    this.state.entries.map(entry => {
      this.state.scenarios.push({ title: entry['181'], data: [...entry['174'], ...entry['164']] });
    });
  }

  componentDidMount() {
    this.props.navigation.setOptions({title: this.props.route.params.parenttitle});
  }

  render() {
    const { urgentData, routineData, isLoading } = this.state;

    const FlatListItemSeparator = () => {
      return (
        <View style={styles.listItemSeparatorStyle} />
      );
    };

    return (
      <SafeAreaView style={ styles.container }>
        <TopImg image={ this.props.route.params.topimage } />
        <SubTitle subtitle={ this.props.route.params.subtitle }></SubTitle>
        { isLoading ? <ActivityIndicator style={styles.indicator} color='#ffffff' size='large'/> :
          (<View style={styles.listContainer}>
            <SectionList
              ItemSeparatorComponent={FlatListItemSeparator}
              sections={ this.state.scenarios }
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
          </View>)
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
    
  },
});