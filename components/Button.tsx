import React from 'react';

type State = 'loading' | 'error' | 'completed' | 'search';

type ButtonProps = {
  state: State;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ state, onClick }: ButtonProps) {
  return (
    <button type="button" className={`btn-${state}`} onClick={onClick}>
      {state === 'loading'
        ? 'Loading'
        : state === 'completed'
        ? 'Completed'
        : state === 'error'
        ? 'Error'
        : 'Search'}
    </button>
  );
}
