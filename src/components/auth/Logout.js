import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, TouchableOpacity, AsyncStorage, SafeAreaView } from 'react-native';

import Header from '../shared/Header';
import { setUser } from '../../action/UserAction';

class Logout extends React.Component {

  constructor (props) {
    super (props);
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('loggedIn', 'false');
      await AsyncStorage.setItem('user_id', '');
      await AsyncStorage.setItem('full_name', '');
      await AsyncStorage.setItem('push_token', '');

      this.props.setUser({ loggedIn: 'false', userId: '', fullName: '', pushToken: '' });
      this.props.route.params.retrieveData();
      this.props.navigation.navigate('Home');
    } catch (error) {
      alert(error);
    }
  };

  _back() {
    this.props.navigation.goBack();
  }

  setUsername(text) {
    this.setState({username: text});
  }

  setPassword(text) {
    this.setState({password: text});
  }

  render() {
    return (
      <SafeAreaView style={ styles.container }>
        <Header />
        <TouchableOpacity style={ styles.button } onPress={()=>this._storeData()}>
          <Text>Click here to Logout.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.backButton } onPress={()=>this._back()}>
          <Text style={{ color: 'white' }}>Click here to go back.</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cecece',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  button: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  backButton: {
    backgroundColor: 'gray',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(Logout);