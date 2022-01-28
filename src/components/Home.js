import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, StyleSheet, View, AsyncStorage } from 'react-native';

import Header from './shared/Header';
import HomeItem from './shared/HomeItem';
import Topbar from './shared/Topbar';
import { setUser } from '../action/UserAction';

class Home extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      userId: this.props.user.userInfo.userId,
    }
    this._keyExtractor = (item, index) => item.id.toString();
    this.loadUserId();
  }

  loadUserId() {
    try {
      AsyncStorage.getItem('user_id').then(res => {
        if (res != null) {
          this.setState({userId: res});
          this.props.setUser({loggedIn: 'true', userId: res, fullName: ''});
        } else {
          this.setState({userId: ''});
          this.props.setUser({loggedIn: 'false', userId: '', fullName: ''});
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const userId = this.props.user.userInfo.userId;
    const loggedIn = this.props.user.userInfo.loggedIn;

    return (
      <SafeAreaView style={ styles.container }>
        <Topbar title="BIZCOVERY" navigation={this.props.navigation}/>
        <View style={ styles.main }>
          <Header />
          <View style={ styles.list }>
            <View style={ styles.row }>
              <HomeItem
                navigate = { this.props.navigation.navigate }
                image={ require('../../assets/critical.png') }
                title={ 'CRITICAL\nINFORMATION' }
                action='Critical'
                userId={ userId }
                loggedIn={ loggedIn }
              ></HomeItem>
              <HomeItem
                navigate = { this.props.navigation.navigate }
                image={ require('../../assets/people.png') }
                title={ 'PEOPLE\nACTION CARDS' }
                action='People'
                userId={ userId }
                loggedIn={ loggedIn }
              ></HomeItem>
            </View>
            <View style={ styles.row }>
              <HomeItem
                navigate = { this.props.navigation.navigate }
                image={ require('../../assets/premises.png') }
                title={ 'PREMISES\nACTION CARDS' }
                action='Premises'
                userId={ userId }
                loggedIn={ loggedIn }
              ></HomeItem>
              <HomeItem
                navigate = { this.props.navigation.navigate }
                image={ require('../../assets/processes.png') }
                title={ 'PROCESSES\nACTION CARDS' }
                action='Processes'
                userId={ userId }
                loggedIn={ loggedIn }
              ></HomeItem>
            </View>
            <View style={ styles.row }>
              <HomeItem
                navigate = { this.props.navigation.navigate }
                image={ require('../../assets/providers.png') }
                title={ 'PROVIDERS\nACTION CARDS' }
                action='Providers'
                userId={ userId }
                loggedIn={ loggedIn }
              ></HomeItem>
              <HomeItem
                navigate = { this.props.navigation.navigate }
                image={ require('../../assets/profile.png') }
                title={ 'PROFILE\nACTION CARDS' }
                action='Profile'
                userId={ userId }
                loggedIn={ loggedIn }
              ></HomeItem>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e36f2c',
  },
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: '#36454f',
    alignItems: 'stretch',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

const mapStateToProps = (state) => {
  const { user } = state
  return { user }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setUser,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);