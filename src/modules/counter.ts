import {createAction, ActionType, createReducer} from 'typesafe-actions';

/* 액션 타입 선언 */
// 뒤에 as const 를 붙여줌으로서 나중에 액션 객체를 만들때 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론되도록 해줍니다.
// const INCREASE = 'counter/INCREASE' as const;
// const DECREASE = 'counter/DECREASE' as const;
// const INCREASE_BY = 'counter/INCREASE_BY' as const;

/* 액션 생성 함수 */
// export const increase = () => ({
//   type: INCREASE,
// });

// export const decrease = () => ({
//   type: DECREASE,
// });

// export const increase_by = (diff: number) => ({
//   type: INCREASE_BY,
//   // 액션에 부가적으로 필요한 값을 payload 라는 이름으로 통일합니다.
//   // 이는 FSA 라는 규칙인데
//   // 이 규칙을 적용하면 액션들이 모두 비슷한 구조로 이루어져 있게 되어 추 후 다룰때도  편하고
//   // 읽기 쉽고, 액션 구조를 일반화함으로서 액션에 관련된 라이브러리를 사용할 수 있게 해줍니다.
//   // 다만 무조건 꼭 따를 필요는 없습니다.
//   payload: diff,
// });

/* 액션 생성 함수(typesafe-actions) */
export const increase = createAction('counter/INCREASE')();
export const decrease = createAction('counter/DECREASE')();
export const increaseBy = createAction('counter/INCREASE_BY')<number>(); // payload 타입을 Generics 로 설정해 주세요.

/* 액션 객체 타입 선언 */
// 모든 액션 객체들에 대한 타입을 준비해 줍니다.
// ReturnType<typeof______> 는 특정 함수의 반환값을 추론해 줍니다.
// 상단부에서 액션 타입을 선언할 때 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
// type CounterAction =
//   | ReturnType<typeof increase>
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy>;

/* 액션 객체 타입 선언(typesafe-actions) */
const actions = {increase, decrease, increaseBy}; // 모든 액션 생성 함수들을 actions 객체에 넣습니다.
type CounterAction = ActionType<typeof actions>; // ActionType 을 사용하여 모든 액션 객체들의 타입을 준비해 줄 수 있습니다.

// 이 리덕스 모듈에서 관리할 상태의 타입을 선언합니다.
type CounterState = {
  count: number;
};

/* 초기값 */
const initialState: CounterState = {
  count: 0,
};

/* 리듀서 */
// 리듀서를 작성합니다.
// 리듀서에서는 state 와 함수의 반환값이 일치하도록 작성하세요.
// 액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정합니다.
// function counter(
//   state: CounterState = initialState,
//   action: CounterAction,
// ): CounterState {
//   switch (action.type) {
//     case INCREASE: // case 라고 입력하고 command + i 를 누르면 어떤 종류의 action.type 들이 있는지 확인할 수 있습니다.
//       return {
//         count: state.count + 1,
//       };
//     case DECREASE:
//       return {
//         count: state.count - 1,
//       };
//     case INCREASE_BY:
//       return {
//         count: state.count + action.payload,
//       };
//     default:
//       return state;
//   }
// }

/* 리듀서(typesafe-actions) */
// createReducer 는 리듀서를 쉽게 만들 수 있게 해주는 함수입니다.
// Generics 로 리듀서에서 관리할 상태, 그리고 리듀서에서 처리할 모든 액션 객체들의 타입을 넣어야 합니다.
//const counter = createReducer<CounterState, CounterAction>(initialState, {
//   [INCREASE]: state => ({count: state.count + 1}), // 액션을 참조할 필요가 없으면 파라미터로 state 만 받아 와도 됩니다.
//   [DECREASE]: state => ({count: state.count - 1}),
//   [INCREASE_BY]: (state, action) => ({count: state.count + action.payload}), // 액션의 타입을 유추할 수 있습니다.
// });

/* 리듀서(typesafe-actions) 메소드 체이닝 방식 */
const counter = createReducer<CounterState, CounterAction>(initialState)
  .handleAction(increase, state => ({count: state.count + 1}))
  .handleAction(decrease, state => ({count: state.count - 1}))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload,
  }));

export default counter;
