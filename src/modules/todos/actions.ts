import {createAction} from 'typesafe-actions';

/* 액션 타입 선언 */
export const ADD_TODO = 'todos/ADD_TODO' as const;
export const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
export const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

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
