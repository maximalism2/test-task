import React, { Component, PropTypes } from 'react';
import cnames from 'classnames';

class ClientData extends Component {
  mapLoadingError(e) {
    console.log('map erorr', e);
  }

  componentWillReceiveProps(nextProps) {
    let currentId = this.props.clientData.data.id;
    let nextId = nextProps.clientData.data.id;
    if (nextId !== currentId && nextId !== null) {
      let { address } = nextProps.clientData.data;
      this.props.createMapUrl(address.street, address.city, address.country);
    }
  }

  renderData() {
    let { clientData } = this.props;
    let { general, job, address, contact } = clientData.data;

    let mapCNames = cnames({
      "client-location-map": 1,
      "map-error": clientData.mapUrlError
    });

    return (
      <div>
        <div className="general-info">
          <img
            src={general.avatar}
            className="avatar"
          />
          <h1 className="client-name">
            {`${general.firstName} ${general.lastName}`}
          </h1>

          <div className="company-info">
            <p className="job-title">
              <span className="desc">Job position: </span>
              <span className="desc-value">{job.title}</span>
            </p>
            <p className="company">
              <span className="desc">Company: </span>
              <span className="desc-value">{job.company}</span>
            </p>
          </div>
        </div>

        <div className="contacts">
          <p className="section-title">Contacts</p>
          <p>
            <span className="desc">Email: </span>
            <a
              href={`mailto://${contact.email}`}
              target="_blank"
              className="desc-value mail"
            >{contact.email}</a>
          </p>
          <p>
            <span className="desc">Phone: </span>
            <a
              href={`tel: ${contact.phone}`}
              className="desc-value phone-number"
            >{contact.phone}</a>
          </p>
        </div>
        <div className="address">
          <p className="section-title">Address</p>

          <div className="col">
            <p className="street">
              <span className="desc">Street: </span>
              <span className="desc-value">{address.street}</span>
            </p>
            <p className="city">
              <span className="desc">City: </span>
              <span className="desc-value">{address.city}</span>
            </p>
          </div>

          <div className="col">
            <p className="country">
              <span className="desc">Country: </span>
              <span className="desc-value">{address.country}</span>
            </p>
            <p className="zip-code">
              <span className="desc">Zip-code: </span>
              <span className="desc-value">{address.zipCode}</span>
            </p>
          </div>
          {clientData.mapUrlError &&
            <p className="error">
              Cannot load the map
            </p>
          }
          <img
            src={clientData.mapUrl}
            className={mapCNames}
          />
        </div>
      </div>
    );
  }

  render() {
    let { clientData } = this.props;
    if (clientData.mapUrl === null) {
      this.mapLoadingError('map cannot be loaded');
    }

    if (clientData.data.id === null) { // If client is not choosed
      return (
        <p className="hint">Please choose some client</p>
      );
    } else {
      return this.renderData()
    }
  }
}

ClientData.propTypes = {
  clientData: PropTypes.object.isRequired,
  createMapUrl: PropTypes.func.isRequired
}

export default ClientData;