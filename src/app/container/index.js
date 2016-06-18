import React, { Component } from 'react';
import { connect } from 'react-redux';
import listContainer from './list';
import DataContainer from './clientData';

class MainContainer extends Component {
  loadHanlder(e) {
    e.preventDefault();

    this.props.dispatch(actionsList.getList());
  }

  render() {
    let { clientData } = this.props;

    return (
      <div className="wrapper">
        <div className="card">
          <div className="clients-list">
            <div className="search-box">
              <input
                type="text"
                placeholder="search"
                className="client-search"
              />
            </div>
            <div className="list-of-clients">
              <div className="centered">
                <p>No clients to show</p>
                <a
                  href="/clients.json"
                  onClick={e => this.loadHanlder(e)}
                  className="get-clients"
                >
                  Load clients
                </a>
              </div>
            </div>
          </div>
          <div className="client-content">
            <DataContainer data={clientData}/>
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
