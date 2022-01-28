import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';

import LocationCard, { SLIDER_WIDTH, ITEM_WIDTH } from '../../../shared/LocationCard';
import TopImg from '../../../shared/TopImg';
import SubTitle from '../../../shared/SubTitle';

export default class CriticalLocation extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      userId: this.props.route.params.userId,
      locations: [],
      message: '',
      isLoading: true,
    }
    this.loadDataFromEndpoint();
  }

  loadDataFromEndpoint() {
    const GLOBAL = require('../../../../Global');
    var URL_ENTRIES = 'https://bizcovery.canutemedia.com/wp-json/gf/v2/forms/61/entries?search={"field_filters": [{"key":"created_by","value":"' + this.state.userId + '","operator":"is"}]}';

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
          this.setState({ locations: json['entries'] });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  renderMarkers() {
    return this.state.locations.map(location =>
      <Marker
        coordinate={{ latitude: Number(location.gvmaps_lat_3), longitude: Number(location.gvmaps_long_3) }}
        title={ location['3.1'] }
      />
    );
  }

  render() {
    const { locations, isLoading, message } = this.state;
    const mapRef = React.createRef();

    return (
      <SafeAreaView style={ styles.container }>
        <TopImg image={ require('../../../../../assets/critical.png') } />
        <SubTitle subtitle='CONTINGENCY LOCATION'></SubTitle>
        { isLoading ? <ActivityIndicator style={styles.indicator} color='#ffffff' size='large'/> :
          ( message != '' ? <Text style={ styles.message }>{ message }</Text> : <MapView
          ref={ mapRef }
          initialRegion={ (locations.length == 0) ? {
            latitude: 51.729881,
            longitude: -1.230491,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          } : {
            latitude: Number(locations[0].gvmaps_lat_3), 
            longitude: Number(locations[0].gvmaps_long_3),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={ styles.map }
          provider={ PROVIDER_GOOGLE }
        >
          {this.renderMarkers()}
        </MapView>)
        }
        <View style={ styles.carousel }>
          <Carousel
            layout="default"
            layoutCardOffset={ 9 }
            ref={ ref => this.carousel = ref }
            data={ locations }
            renderItem={ LocationCard }
            sliderWidth={ SLIDER_WIDTH }
            itemWidth={ ITEM_WIDTH }
            inactiveSlideShift={ 0 }
            useScrollView={ true }
            onSnapToItem={(slideIndex) => {
              locations.map((location, index) => {
                if (index == slideIndex) {
                  mapRef.current.animateToRegion({
                    latitude: Number(location.gvmaps_lat_3), 
                    longitude: Number(location.gvmaps_long_3),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  });
                }
              })
            }}
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
    padding: 10
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#eeeeee',
    padding: 10,
    margin: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    
  },
  map: {
    flex: 1,
    margin: 10,
  },
  carousel: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 40,
    bottom: 40,
  }
});