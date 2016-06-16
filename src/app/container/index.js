import React, { Component } from 'react';

class MainContainer extends Component {
  render() {
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
              {/*
                  Here will be list of lients
              */}
            </div>
          </div>
          <div className="client-content">
            <h1>Super text</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;