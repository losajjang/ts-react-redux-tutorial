import {createAction, ActionType, createReducer} from 'typesafe-actions';
import * as actions from './actions';

/* 모든 액션 객체들에 대한 타입 준비 */
// type TodosAction =
//   | ReturnType<typeof addTodo>
//   | ReturnType<typeof toggleTodo>
//   | ReturnType<typeof removeTodo>;

/* 모든 액션 객체들에 대한 타입 준비(typesafe-actions) */
// 한번에 모두 import 해와서 actions 에 담았기 때문에
// 이 부분이 액션의 종류가 많아져도 한 줄로 작성할 수 있어서 매우 간편합니다.
export type TodosAction = ActionType<typeof actions>;

/* 상태에서 사용할 할 일 항목 데이터 타입 정의 */
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

/* 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열 */
export type TodosState = Todo[];
