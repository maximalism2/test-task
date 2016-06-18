import React, { Component, PropTypes } from 'react';
import cnames from 'classnames';

class ListOfClients extends Component {
  loadHanlder(e) {
    e.preventDefault();

    this.props.getList();
  }

  renderList() {
    let { list } = this.props;
    let { data, search, view } = list;

    let isError = view.loadingError;
    let isLoading = view.loading;
    let isEmptyList = !data.length && !view.loading && !view.loadingError;
    
    if (isError) {
      return (
        <div className="centered error">
          <p>Some error...</p>
          <p>Try to reload.</p>
        </div>
      );
    } else if (isLoading) {
      return (
        <div className="centered">
          <div className="spinner"></div>
        </div>
      );
    } else if (isEmptyList) {
      return (
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
      );
    } else {
      return list.data.map(client => {
        let itemCName = cnames({
          "client-item": 1,
          "choosed": client.id === view.choosedClient
        });
        return (
          <div
            key={client.id}
            className={itemCName}
            onClick={() => this.props.chooseClient(client)}
          >
            <div className="photo-box">
              <img
                src={client.general.avatar}
                className="small-avatar"
              />
            </div>
            <div className="text-box">
              <p className="client-name">
                {`${client.general.firstName} ${client.general.lastName}`}
              </p>
              <p className="job-title">
                {client.job.title}
              </p>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <div className="search-box">
          <input
            type="text"
            placeholder="search"
            className="client-search"
          />
        </div>
        <div className="list-of-clients">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

ListOfClients.propTypes = {
  list: PropTypes.object.isRequired,
  getList: PropTypes.func.isRequired,
}

export default ListOfClients;