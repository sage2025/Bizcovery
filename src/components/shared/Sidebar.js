import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity, Platform, AsyncStorage, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class Sidebar extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      routes:[{
        name: "Home",
        screen: "Home",
        icon: require("../../../assets/home.png")
      }, {
        name: "Critical Information",
        screen: "Critical",
        icon: require("../../../assets/critical.png")
      }, {
        name: "People Action Cards",
        screen: "People",
        icon: require("../../../assets/people.png")
      }, {
        name: "Premises Action Cards",
        screen: "Premises",
        icon: require("../../../assets/premises.png")
      }, {
        name: "Processes Action Cards",
        screen: "Processes",
        icon: require("../../../assets/processes.png")
      }, {
        name: "Providers Action Cards",
        screen: "Providers",
        icon: require("../../../assets/providers.png")
      }, {
        name: "Profile Action Cards",
        screen: "Profile",
        icon: require("../../../assets/profile.png")
      }],
      name: '',
    }
    this.retrieveData = this.retrieveData.bind(this);
  }

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      AsyncStorage.getItem('full_name').then(res => {
        if (res != null) {
          this.setState({name: res});
        } else {
          this.setState({name: ''});
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  render() {
    const { userId, loggedIn } = this.props.user.userInfo;
    
    function Item({ item, navigation }) {
      return (
        <TouchableOpacity style={styles.listItem} onPress={()=> (loggedIn == 'true') ? navigation.navigate(item.screen, { userId: userId }) : {}}>
          <Image source={item.icon} style={styles.icon}></Image>
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <SafeAreaView style={[ styles.container, styles.statusBarMargin ]}>
        <Image source={require("../../../assets/avatar.png")} style={styles.profileImg}/>
        {(this.state.name != null && this.state.name != '') &&
        <Text style={{fontWeight:"bold", fontSize:16, marginTop:10}}>Welcome back, { this.state.name }</Text>
        }
        <View style={styles.sidebarDivider}></View>
        <FlatList
          style={{width:"100%",marginLeft:30}}
          data={this.state.routes}
          renderItem={({ item }) => <Item item={item} navigation={this.props.navigation}/>}
          keyExtractor={item => item.name}
        />
        {
          (loggedIn == 'false') && 
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Login', {retrieveData: this.retrieveData})}>
            <AntDesign name='login' size={24} style={{ color: 'white', marginRight: 10 }} />
            <Text style={styles.buttonTitle}>Login</Text>
          </TouchableOpacity>
        }
        {
          (loggedIn == 'true') && 
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Logout', {retrieveData: this.retrieveData})}>
            <AntDesign name='logout' size={24} style={{ color: 'white', marginRight: 10 }}/>
            <Text style={styles.buttonTitle}>Logout</Text>
          </TouchableOpacity>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#dadcdb'
  },
  statusBarMargin: {
    marginTop: (Platform.OS === 'ios') ? 0 : 24,
  },
  profileImg:{
    width:80,
    height:80,
    borderRadius:40,
    marginTop:40
  },
  sidebarDivider:{
    height:1,
    width:"100%",
    backgroundColor:'#075641',
    marginVertical:20
  },
  icon: {
    width: 30,
    height: 30
  },
  listItem:{
    height:60,
    alignItems:"center",
    flexDirection:"row",
  },
  title:{
    fontSize:16,
    marginLeft:20,
  },
  button: {
    flexDirection:"row",
    alignSelf: 'stretch',
    borderRadius: 4,
    backgroundColor: '#e36f2c',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 18,
  }
});

const mapStateToProps = (state) => {
  const { user } = state
  return { user }
};

export default connect(mapStateToProps)(Sidebar);