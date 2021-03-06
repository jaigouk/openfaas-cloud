import React, { Component } from 'react';
import { FunctionTable } from '../components/FunctionTable';
import { functionsApi } from '../api/functionsApi';

export class FunctionsOverviewPage extends Component {
  constructor(props) {
    super(props);

    const { user } = props.match.params;
    this.state = {
      isLoading: true,
      fns: [],
      user,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    functionsApi.fetchFunctions(this.state.user).then(res => {
      this.setState({ isLoading: false, fns: res });
    });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="panel panel-success">
        <div className="panel-heading">Functions for <span id="username">{user}</span></div>
        <div className="panel-body">
          <p>
            Welcome to the OpenFaaS Cloud Dashboard! Click on a function for more details.
          </p>
          <FunctionTable
            isLoading={this.state.isLoading}
            fns={this.state.fns}
            user={this.state.user}
          />
        </div>
      </div>
    );
  }
}
