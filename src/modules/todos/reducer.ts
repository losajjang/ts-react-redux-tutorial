import {TodosState, TodosAction} from './types';
import {createReducer} from 'typesafe-actions';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actions';

/* 초기 상태 선언 */
const initialState: TodosState = [];

/* 리듀서 작성 */
// function todos(state: TodosState = initialState, action: TodosAction) {
//   switch (action.type) {
//     case ADD_TODO:
//       // action.payload 객체 안의 값이 모두 유추됩니다.
//       return state.concat({
//         id: action.payload.id,
//         text: action.payload.text,
//         done: false,
//       });
//     case TOGGLE_TODO:
//       return state.map(todo =>
//         // payload 가 number 인 것이 유추됩니다.
//         todo.id === action.payload ? {...todo, done: !todo.done} : todo,
//       );
//     case REMOVE_TODO:
//       // payload 가 number 인 것이 유추됩니다.
//       return state.filter(todo => todo.id !== action.payload);
//     default:
//       return state;
//   }
// }

/* 리듀서 작성(typesafe-actions) */
const todos = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, action) =>
    state.concat({
      ...action.payload, // id, text 를 이 안에 넣기
      done: false,
    }),
  // 비구조화 할당을 활용하여 payload 값의 이름을 바꿀 수 있음
  [TOGGLE_TODO]: (state, {payload: id}) =>
    state.map(todo => (todo.id === id ? {...todo, done: !todo.done} : todo)),
  [REMOVE_TODO]: (state, {payload: id}) => state.filter(todo => todo.id !== id),
});

export default todos;