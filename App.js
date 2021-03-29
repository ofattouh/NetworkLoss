/**
 * NetworkLoss React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

export default class App extends Component {
  state = {
    online: null,
    offline: null,
  };

  constructor(props) {
    super(props);

    this.unsubscribe = NetInfo.addEventListener(connectionInfo => {
      // console.log("\n\nconnectionInfo: ", connectionInfo);

      if (Platform.OS === 'ios'){
        this.setState({
          online: connectionInfo.type !== 'none',
          offline: connectionInfo.type === 'none',
        });
      } else {
        this.setState({ 
          // Android only
          online: connectionInfo.isWifiEnabled,
          offline: !connectionInfo.isWifiEnabled,
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Updating the state rerenders the DOM
  renderMask() {
    if (this.state.offline) {
      return (
        <View style={styles.mask}>
          <View style={styles.msg}>
            <Text style={styles.alert}>No network connection!</Text>
            <Text style={styles.alert}>{"\n"}Try back later...</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.toolbar}>Detect network connection</Text>
        <Text style={styles.text}>You are connected to the internet!</Text>
        {this.renderMask()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    backgroundColor: '#3498db',
    padding: 20,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    padding: 30,
    fontSize: 15,
  },
  mask: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  msg: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    height: 230,
    justifyContent: 'center',
    padding: 15,
    width: 300,
  },
  alert: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  }
});

// npx react-native init MyApp
// npm install --save @react-native-community/netinfo
// pod install  // cd ios (autolink @react-native-community/netinfo)
