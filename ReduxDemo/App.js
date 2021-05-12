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

import AddView from './components/AddView';
import Counter from './components/Counter';
import TaskFlatList from './components/TaskFlatList';
import {createStore, combineReducers} from 'redux';
import {store} from './redux/store';

store.dispatch({
  type: 'ADD_TASK',
  payload: {title: 'add by dispatch', isFinished: true},
});

store.dispatch({
  type: 'REMOVE_TASK',
  payload: 0,
});

// // State
// let appState = {
//   result: {
//     number: 1,
//   },
//   message: {
//     error: '',
//   },
// };

// // Action
// const add = {
//   type: 'ADD',
//   value: 1,
// };

// const sub = {
//   type: 'SUB',
//   value: 1,
// };

// // Reducer
// const resultReducer = (result = appState.result, action) => {
//   switch (action.type) {
//     case 'ADD':
//       return {
//         number: result.number + 1,
//       };
//     case 'SUB':
//       return {
//         number: result.number - 1,
//       };
//     default:
//       return result;
//   }
// };

// const messageReducer = (message = appState.message, action) => {
//   switch (action.type) {
//     case 'LESS_THAN_ZERO':
//       return {
//         error: 'LESS_THAN_ZERO',
//       };
//     default:
//       return message;
//   }
// };

// const reducers = combineReducers({
//   result: resultReducer,
//   message: messageReducer,
// });

// // Store
// const store = createStore(reducers);

// store.subscribe(() => {
//   console.log(store.getState());
// });
// store.dispatch(add);
// store.dispatch({type: 'LESS_THAN_ZERO'});

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {title: 'Go to the office', isFinished: true},
        {title: 'Prepare tasks for today', isFinished: false},
        {title: 'Team meeting', isFinished: false},
        {title: 'Commit tasks changed', isFinished: false},
      ],
    };
  }

  onAddNewTask = taskName => {
    const newTask = {title: taskName, isFinished: false};
    const newTaskList = [...this.state.data, newTask];

    this.setState({data: newTaskList});
  };

  onFinishedItem = index => {
    let newTaskList = [...this.state.data];
    newTaskList[index] = {
      ...newTaskList[index],
      isFinished: true,
    };
    this.setState({data: newTaskList});
  };

  onDeleteItem = index => {
    let newTaskList = this.state.data.filter((item, i) => i !== index);
    this.setState({data: newTaskList});
  };

  render() {
    return (
      <View style={styles.container}>
        <AddView onAddNewTask={this.onAddNewTask} />
        <Counter />
        <TaskFlatList
          listData={this.state.data}
          onFinishedItem={this.onFinishedItem}
          onDeleteItem={this.onDeleteItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE',
  },
});
