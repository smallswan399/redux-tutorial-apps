import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Time extends Component {
  state = {
    time: new Date(),
  };

  constructor(props) {
    super(props);
    setInterval(() => {
      this.setState({
        time: new Date(),
      });
    }, 1000);
  }

  render() {
    return (
      <View>
        <Text>{this.state.time.toString()}</Text>
        <Text>{this.props.index}</Text>
      </View>
    );
  }
}
