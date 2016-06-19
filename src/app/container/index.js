import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ClientData, ListOfClients } from '../components/';
import * as actionsData from '../actions/clientData';
import * as actionsList from '../actions/list';
import cnames from 'classnames';

class MainContainer extends Component {
  constructor() {
    super();

    this.state = {
      showed: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showed: true
      });
    }, 50);
  }

  render() {
    let { clientData, list, dispatch } = this.props;

    const boundDataActions = bindActionCreators(actionsData, dispatch);
    const boundListActions = bindActionCreators(actionsList, dispatch);

    let cardCNames = cnames({
      "card": 1,
      "fade-out": !this.state.showed
    });

    return (
      <div className="wrapper">
        <div className={cardCNames}>
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
