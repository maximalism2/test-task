import React, { Component } from 'react';
import { staticMapAPI, coordinatesAPI, testAppKey } from '../helpers/googleAPIs/'
import * as actionsData from '../actions/clientData';

class MainContainer extends Component {
  componentDidMount() {
    actionsData.createMapUrl('1a 2b 3c', 'ab cd ef', '123 45 6');
  }

  render() {

    let query = '1520+Zemlak+Cove,New+Devon,Guinea-Bissau';
    let staticMapUrl = `${staticMapAPI}?center=${query}&zoom=12&size=543x200&maptype=terrain
&key=${testAppKey}`;
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
                <a href="/clients.json" className="get-clients">
                  Load clients
                </a>
              </div>
              
              {/*
                  Here will be list of lients
              */}
            </div>
          </div>
          <div className="client-content">
            {/* Here will be all contact info */}
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
              <img src={staticMapUrl} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;

/*
  
let coordinatesApi = 'https://maps.googleapis.com/maps/api/geocode/json';
let query = 'Brooklyn+Bridge,New+York,NY';
let testAppKey = 'AIzaSyBuLN9nj6ZgpEPOQXV24aMaVaKrB_ahlME';
let coords = `${coordinatesApi}?address=${query}&key=${testAppKey}`;


*/