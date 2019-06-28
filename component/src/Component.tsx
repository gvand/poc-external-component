import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

interface MessageProps {
    message?: string;
}

interface IncrementDecrementProps {
    count?: number;
    increment?: () => void;
    decrement?: () => void;
}

const reducer = (state = { count: 0 }, action: Redux.Action) => {
    switch (action.type) {
        case 'INCREMENT': {
            return {
                ...state,
                count: state.count + 1
            }
        }
        case 'DECREMENT': {
            return {
                ...state,
                count: state.count - 1
            }
        }
    }
};

const store = Redux.createStore(reducer);

const IncrementDecrementComponent: React.FC<IncrementDecrementProps> = ({ increment, decrement, count }) => (
    <>
        <button onClick={decrement}>decrement</button>
        <button onClick={increment}>increment</button>
        <p>{ count }</p>
    </>
);

const increment = (): Redux.Action => ({ type: 'INCREMENT' });
const decrement = (): Redux.Action => ({ type: 'DECREMENT' });

// @ts-ignore
const mapStateToProps = (state, props) => ({
    ...state,
    ...props
});
const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement())
});

const ConnectedComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IncrementDecrementComponent);

const ProviderComponent: React.FC<MessageProps> = ({ message }) => {
    return (
        <ReactRedux.Provider store={store}>
            <h2>First Component with Message: "{ message }" and it's own redux store</h2>
            <ConnectedComponent/>
        </ReactRedux.Provider>
  );
};

export const FirstComponent = ProviderComponent;
export const SecondComponent: React.FC<MessageProps> = ({ message }) => (<h2>Second Component with Message: "{ message }"</h2>);