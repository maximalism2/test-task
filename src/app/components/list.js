import React, { Component, PropTypes } from 'react';
import cnames from 'classnames';

class ListOfClients extends Component {
  constructor() {
    super();

    this.loadHanlder = this.loadHanlder.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
  }

  loadHanlder(e) {
    e.preventDefault();
    this.props.getList();
  }

  keydownHandler(e) {
    if (e.which === 27) {
      this.props.resetChoosedClient();
    }

    if (e.which === 40 || e.which === 38) {
      let { data, view } = this.props.list;
      if (!data.searchQuery.length) {
        if (e.which === 40) {
          if (view.focused === null) {
            this.props.makeFocused(data.all[0].id);
            return;
          }
          data.all.forEach((item, index) => {
             if (item.id === view.focused && index + 1 < data.all.length) {
              this.props.makeFocused(data.all[index + 1].id);
              return;
            }
          });
        } else if (e.which === 38) {
          data.all.forEach((item, index) => {
            if (item.id === view.focused && index - 1 >= 0 && view.focused !== null) {
              this.props.makeFocused(data.all[index - 1].id);
              return;
            }
          });
        }
      } else {
        if (e.which === 40) {
          if (view.focused === null) {
            this.props.makeFocused(data.all[0].id);
            return;
          }
          data.searchData.forEach((item, index) => {
             if (item.id === view.focused && index + 1 < data.all.length) {
              this.props.makeFocused(data.all[index + 1].id);
              return;
            }
          });
        } else if (e.which === 38) {
          data.searchData.forEach((item, index) => {
            if (item.id === view.focused && index - 1 >= 0 && view.focused !== null) {
              this.props.makeFocused(data.all[index - 1].id);
              return;
            }
          });
        }
      }
    }

    if (e.which === 13) {
      let { data, view } = this.props.list;
      if (view.focused !== null) {
        if (!data.searchQuery.length) {
          let focusedItem = data.all.filter(item => item.id === view.focused)[0];
          this.props.chooseClient(focusedItem);
        } else {
          let focusedItem = data.searchData.filter(item => item.id === view.focused)[0];
          this.props.chooseClient(focusedItem);
        }
      }
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keydownHandler, false)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownHandler);
  }

  renderList() {
    let { list } = this.props;
    let { data, view } = list;

    let isError = view.loadingError;
    let isLoading = view.loading;
    let isEmptyList = !data.all.length && !view.loading && !view.loadingError;
    
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
      if (!list.data.searchQuery.length) { // If user is not searching anything
        return list.data.all.map(client => {
          let itemCName = cnames({
            "client-item": 1,
            "focused": client.id === view.focused,
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
      } else {
        return list.data.searchData.map(client => {
          let itemCName = cnames({
            "client-item": 1,
            "focused": client.id === view.focused,
            "choosed": client.id === view.choosedClient
          });

          let queryInName = client.inField === 'firstName';
          let queryInSurname = client.inField === 'lastName';

          let foundAt = client.includingQuery.index;
          let matches = client.includingQuery[0];
          let queryLength = matches.length;

          let nameString = (
            <span>
              {(queryInName || queryInSurname) ?
                (() => {
                  let nameWithSurname = client.general.firstName + " " + client.general.lastName;
                  return (
                    <span>
                      {nameWithSurname.slice(0, foundAt)}
                      <span className="matches">
                        {nameWithSurname.slice(foundAt, foundAt + queryLength)}
                      </span>
                      {nameWithSurname.slice(foundAt + queryLength)}
                    </span>
                  );
                })()
               : `${client.general.firstName} ${client.general.lastName}`
              }
            </span>
          );

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
                  {nameString}
                </p>
                {(queryInName || queryInSurname) &&
                  <p className="job-title">
                    {client.job.title}
                  </p>
                }
                {!(queryInName || queryInSurname) &&
                  <p className="search-result">
                    <span className="in-field">{client.inField}: </span>
                    {client.includingQuery.input.slice(0, foundAt)}
                    <span className="matches">
                      {client.includingQuery.input.slice(foundAt, foundAt + queryLength)}
                    </span>
                    {client.includingQuery.input.slice(foundAt + queryLength)}
                  </p>
                }
              </div>
            </div>
          );
        });
      }
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
            onChange={e => this.props.search(e.target.value)}
            value={this.props.list.data.searchQuery}
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