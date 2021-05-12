import {combineReducers, createStore} from 'redux';

const appState = {
  tasks: [
    {title: 'Go to the office', isFinished: true},
    {title: 'Prepare tasks for today', isFinished: false},
    {title: 'Team meeting', isFinished: false},
    {title: 'Commit tasks changed', isFinished: false},
  ],
};

const tasksReducer = (taskList = appState.tasks, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...taskList, action.payload];
    case 'REMOVE_TASK':
      return taskList.filter((t, i) => i !== action.payload);
    case 'DONE_TASK':
      const newList = [...taskList];
      newList[action.payload] = {
        ...newList[action.payload],
        isFinished: true,
      };
      return newList;
    case 'UNDONE_TASK':
      const newList2 = [...taskList];
      newList2[action.payload] = {
        ...newList2[action.payload],
        isFinished: false,
      };
      return newList2;
    default:
      return taskList;
  }
};

const reducers = combineReducers({tasks: tasksReducer});
export const store = createStore(reducers);
store.subscribe(() => {
  console.log(store.getState());
});
// store.dispatch({
//   type: 'ADD',
//   payload: {title: 'add by dispatch', isFinished: true},
// });
