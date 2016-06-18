import React, { Component, PropTypes } from 'react';
import * as actionsData from '../actions/clientData';
import * as actionsList from '../actions/list';

class DataContainer extends Component {
  mapLoadingError(e) {
    console.log('map erorr', e);
  }

  render() {
    let { data } = this.props;
    if (data.mapUrl === null) {
      this.mapLoadingError('map cannot be loaded');
    }

    return (
      <div className="general-info">
        <img
          src="https://s3.amazonaws.com/uifaces/faces/twitter/kevinoh/128.jpg"
          className="avatar"
        />
        <h1 className="client-name">Liana Crooks</h1>

        <div className="company-info">
          <p className="job-title">
            <span className="desc">Job position: </span>
            {"Investor Functionality Coordinator"}
          </p>
          <p className="company">
            <span className="desc">Company: </span>
            {"Ledner, Johnson and Predovic"}
          </p>
        </div>
      </div>

      <div className="contacts">
        <p className="section-title">Contacts</p>
        <p>
          <span className="desc">Email: </span>
          <a
            href="mailto://Gerry_Hackett77@gmail.com"
            target="_blank"
            className="desc-value mail"
          >Gerry_Hackett77@gmail.com</a>
        </p>
        <p>
          <span className="desc">Phone: </span>
          <a
            href="tel: (895) 984-0132"
            className="desc-value phone-number"
          >(895) 984-0132
          </a>
        </p>
      </div>
      <div className="address">
        <p className="section-title">Address</p>

        <div className="col">
          <p className="street">
            <span className="desc">Street: </span>
            <span className="desc-value">1520 Zemlak Cove</span>
          </p>
          <p className="city">
            <span className="desc">City: </span>
            <span className="desc-value">New Devon</span>
          </p>
        </div>

        <div className="col">
          <p className="country">
            <span className="desc">Country: </span>
            <span className="desc-value">Guinea-Bissau</span>
          </p>
          <p className="zip-code">
            <span className="desc">Zip-code: </span>
            <span className="desc-value">42586-7898</span>
          </p>
        </div>
        <img
          src={data.mapUrl}
          className="client-location-map"
        />
      </div>
    );
  }
}