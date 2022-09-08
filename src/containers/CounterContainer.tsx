import React from 'react';
import {RootState} from '../modules';
import {useSelector} from 'react-redux';
import Counter from '../components/Counter';
import {useDispatch} from 'react-redux';
import {decrease, increase, increaseBy} from '../modules/counter';

function CounterContainer() {
  // 상태를 조회합니다. 상태를 조회할 때에는 state 의 타입을 RootState 로 지정해야 합니다.
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다.

  // 각 액션들을 디스패치하는 함수들을 만들어 줍니다.
  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decrease());
  };
  const onIncreaseBy = (diff: number) => {
    dispatch(increaseBy(diff));
  };

  return (
    <Counter
      count={count}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
}

export default CounterContainer;
