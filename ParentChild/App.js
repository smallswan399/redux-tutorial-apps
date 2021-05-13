/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import Time from './components/Time';

export default class App extends Component {
  state = {
    index: 1,
  };
  constructor(props) {
    super(props);
  }

  onPress = e => {
    this.setState({
      index: this.state.index + 1,
    });
    console.log('onPress ' + this.index);
  };

  render() {
    return (
      <View>
        <View>
          <Button title="click me" onPress={this.onPress} />
        </View>
        <Text>What is this?</Text>
        <Time index={this.state.index} />
      </View>
    );
  }
}
