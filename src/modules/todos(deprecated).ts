import {createAction, ActionType, createReducer} from 'typesafe-actions';

/* 액션 타입 선언 */
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

let nextId = 1; // 새로운 항목을 추가할 때 사용할 고유 ID 값

/* 액션 생성 함수 선언 */
// export const addTodo = (text: string) => ({
//   type: ADD_TODO,
//   payload: {id: nextId++, text},
// });
// export const toggleTodo = (id: number) => ({
//   type: TOGGLE_TODO,
//   payload: id,
// });
// export const removeTodo = (id: number) => ({
//   type: REMOVE_TODO,
//   payload: id,
// });

/* 액션 생성 함수 선언(typesafe-actions) */
export const addTodo = createAction(ADD_TODO, (text: string) => ({
  id: nextId++,
  text: text,
}))();
export const toggleTodo = createAction(TOGGLE_TODO)<number>();
export const removeTodo = createAction(REMOVE_TODO)<number>();

/* 모든 액션 객체들에 대한 타입 준비 */
// type TodosAction =
//   | ReturnType<typeof addTodo>
//   | ReturnType<typeof toggleTodo>
//   | ReturnType<typeof removeTodo>;

/* 모든 액션 객체들에 대한 타입 준비(typesafe-actions) */
const actions = {addTodo, toggleTodo, removeTodo};
type TodosAction = ActionType<typeof actions>;

/* 상태에서 사용할 할 일 항목 데이터 타입 정의 */
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

/* 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열 */
export type TodosState = Todo[];

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
