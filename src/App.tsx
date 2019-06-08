import React from 'react';
import { connect } from 'react-redux';

const actions = {
  increment: () => ({ type: 'increment' })
};

type AppProps = { count: number };
class App extends React.PureComponent<AppProps & typeof actions> {
  public render() {
    return (
      <div>
        Counter from React: {this.props.count}
        <button onClick={this.props.increment}>Increment from React</button>
      </div>
    );
  }
}

export default connect((state: any) => ({
  count: state.counter.count
}), actions)(App);
