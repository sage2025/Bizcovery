import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, AsyncStorage, SafeAreaView, ActivityIndicator, Image } from 'react-native';

import Header from '../shared/Header';
import { setUser } from '../../action/UserAction';

class Login extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      token: '',
    };
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync().then(token => {
      this.setState({ token: token });
    });
  }

  loginUser() {
    this.setState({ isLoading: true });
    var URL_ENTRIES = 'https://bizcovery.canutemedia.com/wp-json/bizcovery/login';

    fetch(URL_ENTRIES, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: this.state.username,
        password: this.state.password
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (json['success']) {
          this.saveUser(json['user']['data']['ID'], json['user']['data']['display_name']);
        } else {
          alert('Authentication Failed!');
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  async saveUser(userId, fullName) {
    try {

      await AsyncStorage.setItem('loggedIn', 'true');
      await AsyncStorage.setItem('user_id', userId);
      await AsyncStorage.setItem('full_name', fullName);
      await AsyncStorage.setItem('push_token', this.state.token);

      this.props.setUser({ loggedIn: 'true', userId: userId, fullName: fullName, pushToken: this.state.token });
      this.props.route.params.retrieveData();
      this.props.navigation.navigate('Home');
    } catch (error) {
      alert(error);
    }
  }

  async registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

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
    const { isLoading } = this.state;

    return (
      <SafeAreaView style={ styles.container }>
        <Header />
        <View style={ styles.labelWrapper }>
          <Image source={ require('../../../assets/ic_username.png') } style={ styles.labelIcon }></Image>
          <Text style={ styles.label }>Username</Text>
        </View>
        <TextInput
          style={styles.textinput}
          onChangeText={text => this.setUsername(text)}
        />
        <View style={styles.divider} />
        <View style={ styles.labelWrapper }>
          <Image source={ require('../../../assets/ic_password.png') } style={ styles.labelIcon }></Image>
          <Text style={ styles.label }>Password</Text>
        </View>
        <TextInput
          secureTextEntry={true}
          style={styles.textinput}
          onChangeText={text => this.setPassword(text)}
        />
        <View style={styles.divider} />
        { isLoading ? <ActivityIndicator style={styles.indicator} color='#000000' size='large'/> :
          (<TouchableOpacity style={ styles.button } onPress={()=>this.loginUser()}>
            <Text>Login</Text>
          </TouchableOpacity>)
        }
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
  list: {
    flexDirection: 'column',
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 20,
  },
  labelIcon: {
    width: 20,
    height: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  textinput: { 
    height: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginLeft: 20,
    marginRight: 20,
  },
  indicator: {
    marginTop: 20
  },
  button: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
