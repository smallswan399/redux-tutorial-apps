import {combineReducers, createStore} from 'redux';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const appState = {
  tasks: [
    {title: '0 Go to the office', isFinished: true},
    {title: '1 Prepare tasks for today', isFinished: false},
    {title: '2 Team meeting', isFinished: false},
    {title: '3 Commit tasks changed', isFinished: false},
  ],
};

const tasksReducer = (tasks = appState.tasks, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...tasks, action.payload];
    case 'REMOVE_TASK':
      return tasks.filter((t, i) => i !== action.payload);
    case 'DONE_TASK':
      const newList = [...tasks];
      newList[action.payload] = {
        ...newList[action.payload],
        isFinished: true,
      };
      return newList;
    case 'UNDONE_TASK':
      const newList2 = [...tasks];
      newList2[action.payload] = {
        ...newList2[action.payload],
        isFinished: false,
      };
      return newList2;
    default:
      return tasks;
  }
};

const reducers = combineReducers({tasks: tasksReducer});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  reducers,
);

export const store = createStore(persistedReducer);
store.subscribe(() => {
  console.log(store.getState());
});
export const persistor = persistStore(store);
