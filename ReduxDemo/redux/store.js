import {combineReducers, createStore} from 'redux';

const appState = {
  tasks: [
    {title: 'Go to the office', isFinished: true},
    {title: 'Prepare tasks for today', isFinished: false},
    {title: 'Team meeting', isFinished: false},
    {title: 'Commit tasks changed', isFinished: false},
  ],
};

const taskListReducer = (taskList = [], action) => {
  switch (action.key) {
    case 'ADD':
      return [...taskList, action.payload];
    case 'REMOVE':
      return taskList.filter((t, i) => i !== action.payload);
    case 'DONE':
      const newList = [...taskList];
      newList[action.payload] = {
        ...newList[action.payload],
        isFinished: true,
      };
      return newList;
    case 'UNDONE':
      const newList2 = [...taskList];
      newList2[action.payload] = {
        ...newList2[action.payload],
        isFinished: false,
      };
      return newList2;
    default:
      taskList;
  }
};

const reducers = combineReducers({tasks: taskListReducer});
export const store = createStore(reducers, appState);
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch({
  type: 'ADD',
  payload: {title: 'add by dispatch', isFinished: true},
});
