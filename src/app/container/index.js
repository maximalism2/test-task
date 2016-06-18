import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ClientData, ListOfClients } from '../components/';

import * as actionsData from '../actions/clientData';
import * as actionsList from '../actions/list';

class MainContainer extends Component {
  render() {
    let { clientData, list, dispatch } = this.props;

    const boundDataActions = bindActionCreators(actionsData, dispatch);
    const boundListActions = bindActionCreators(actionsList, dispatch);

    return (
      <div className="wrapper">
        <div className="card">
          <div className="clients-list">
            <ListOfClients
              {...boundListActions}
              list={list}
            />
          </div>
          <div className="client-content">
            <ClientData
              {...boundDataActions}
              clientData={clientData}
            />
          </div>
        </div>
      </div>
    );
  }
}

const select = state => ({
  clientData: state.clientData,
  list: state.list
});

export default connect(select)(MainContainer);
