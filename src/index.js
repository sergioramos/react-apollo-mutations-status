import hoistNonReactStatic from 'hoist-non-react-statics';
import React, { Component } from 'react';

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

// See: https://facebook.github.io/react/docs/higher-order-components.html
export default (names = ['mutate']) => SourceComponent => {
  class MutationsStatus extends Component {
    constructor(...args) {
      super(...args);

      this.state = names.reduce(
        (sum, name) =>
          Object.assign(sum, {
            [name]: {
              loading: false,
              error: null,
              exec: variables => {
                this.setState({ [name]: { loading: true } });

                return this.props
                  [name]({ variables })
                  .then(res => {
                    this.setState({ [name]: { loading: false, error: null } });
                    return res;
                  })
                  .catch(err => {
                    this.setState({ [name]: { loading: false, error: err } });
                    return err;
                  });
              }
            }
          }),
        {}
      );
    }

    render() {
      return React.createElement(
        SourceComponent,
        Object.assign({}, this.props, this.state, {
          loading: Object.keys(this.state).some(
            name => this.state[name].loading
          ),
          error: Object.keys(this.state)
            .filter(name => this.state[name].error)
            .shift()
        })
      );
    }
  }

  const displayName = getDisplayName(SourceComponent);
  MutationsStatus.displayName = `MutationsStatus(${displayName})`;
  hoistNonReactStatic(MutationsStatus, SourceComponent);

  return MutationsStatus;
};
