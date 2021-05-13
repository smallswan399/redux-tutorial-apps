import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';

import {connect} from 'react-redux';

class TaskFlatList extends Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({item, index}) => {
    const {onFinishedItem, onDeleteItem, onUnFinishedItem} = this.props;

    return (
      <View style={styles.itemContainer}>
        <View>
          <TouchableOpacity
            style={{marginTop: -2}}
            onPress={() =>
              item.isFinished ? onUnFinishedItem(index) : onFinishedItem(index)
            }>
            <Text> {item.isFinished ? '✅' : '🕘'} </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text style={{color: 'black'}}>{item.title}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={{marginTop: -2}}
            onPress={() => onDeleteItem(index)}>
            <Text>{'❌'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    console.log(this.props);
    return (
      <FlatList
        data={this.props.listData}
        extraData={this.props}
        keyExtractor={(item, index) => index}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    borderColor: 'gray',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowColor: 'gray',
    elevation: 2,
  },
});

export default connect(
  state => {
    return {
      listData: state.tasks,
    };
  },
  dispatch => {
    return {
      onFinishedItem: index => dispatch({type: 'DONE_TASK', payload: index}),
      onDeleteItem: index => dispatch({type: 'REMOVE_TASK', payload: index}),
      onUnFinishedItem: index =>
        dispatch({type: 'UNDONE_TASK', payload: index}),
    };
  },
)(TaskFlatList);
