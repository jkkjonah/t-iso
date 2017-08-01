/* Just a generic top level object that can be used as a boundary layer betwen
the pure components and external services they bind */
import React from 'react';
import ReactDOM from 'react-dom';
import ProfileCreator from './profile-creator.js';
import DefaultView from './default-view.js';
import NewIsoView from './new-iso-view.js';

class Main {

    constructor(rootElementId) {
      this.rootElementId = rootElementId;

      this.profile = {};
      this.isos = [
        {
          id: 1234,
          isoType: 1,
          isoTypeLabel: "Wedding Venue",
          city: "San Francisco",
          state: "CA",
          exact: true,
          startDate: new Date(2017, 8, 4),
          endDate: new Date(2017, 8, 6),
          budgetLow: 10000,
          budgetHigh: 15000,
        },
        {
          id: 1235,
          isoType: 2,
          isoTypeLabel: "Wedding Photographer",
          city: "San Francisco",
          state: "CA",
          exact: true,
          startDate: new Date(2017, 8, 4),
          endDate: new Date(2017, 8, 6),
          budgetLow: 500,
          budgetHigh: 1000,
        },
        {
          id: 1236,
          isoType: 3,
          isoTypeLabel: "DJ",
          city: "San Francisco",
          state: "CA",
          exact: true,
          startDate: new Date(2017, 8, 4),
          endDate: new Date(2017, 8, 6),
          budgetLow: 100,
          budgetHigh: 500,
        }
      ];
      this.isoMatches = [];
      this.isoMatchCounts = {
        1234: 15,
        1235: 10,
        1236: 5
      };
      this.isoMessages = {};
      this.vendorProfiles = {};

      this.getMyProfile = this.getMyProfile.bind(this);
      this.createProfile = this.createProfile.bind(this);
      this.createProfileAndPaintDeafult = this.createProfileAndPaintDeafult.bind(this);
      this.getIsos = this.getIsos.bind(this);
      this.createIso = this.createIso.bind(this);
      this.createIsoAndPaintDefaultView = this.createIsoAndPaintDefaultView.bind(this);
      this.getMatchCounts = this.getMatchCounts.bind(this);
      this.getMatches = this.getMatches.bind(this);
      this.getMessages = this.getMessages.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
      this.getVendorProfile = this.getVendorProfile.bind(this);

      this.paint = this.paint.bind(this);
      this.paintLoggedInView = this.paintLoggedInView.bind(this);
      this.paintCreateIsoForm = this.paintCreateIsoForm.bind(this);
      this.paintMyProfileView = this.paintMyProfileView.bind(this);
    }

    // Data operations
    getMyProfile(){
      return new Promise((resolve, reject) => {
        resolve({
          photoUrl: '',
          users: [{
            firstName: "John",
            lastName: "Doe",
            description: "Groom",
            phoneNumber: "(123) 234 - 5678",
            email: "jdoe@gmail.com",
          },
          {
            firstName: "Jane",
            lastName: "Smith",
            description: "Bride",
            phoneNumber: "(123) 234 - 5678",
            email: "jsmith@gmail.com",
          }],
          city: "San Francisco",
          state: "CA",
        })
      });
    }

    createProfile(data) {
      data.id = this.getRandomInt(0, 10000)
      this.profile = data;

      return new Promise((resolve, reject) => {
        resolve({
          'id': data.id,
        });
      });
    }

    createProfileAndPaintDeafult(data) {
      this.createProfile(data).then(
        () => {
          this.paintLoggedInView();
        }
      )
    }

    getIsos(){
      return new Promise((resolve) => {
        resolve(this.isos);
      });
    }

    createIso(data){
      return new Promise((resolve) => {
        data.id = this.getRandomInt(0, 1000)
        this.isos.push(data);
        resolve({id: data.id});
      });
    }

    createIsoAndPaintDefaultView(data){
      this.createIso(data).then(
        () => {
          this.paintLoggedInView();
        }
      )
    }

    getMatches(isoId){
      return new Promise((resolve) => {
        if (this.isoMatches[isoId]){
          resolve(this.isoMatches[isoId]);
          return;
        }
        resolve([]);
      });
    }

    getMatchCounts(){
      return new Promise((resolve) => {
        resolve(this.isoMatchCounts);
      });
    }

    getMessages(vendorId){
      return new Promise((resolve) => {
        if (this.isoMessages[vendorId]){
          resolve(this.isoMessages[vendorId]);
          return;
        }
        resolve([]);
        return
      })
    }

    sendMessage(vendorId, message){
      message.id = this.getRandomInt(0, 10000);
      if (this.isoMessages[vendorId]){
        this.isoMessages[vendorId].push(message);
      } else {
        this.isoMessages[vendorId] = [message];
      }
      return new Promise((resolve) => {
        resolve(message);
      });
    }

    getVendorProfile(vendorId){
      return new Promise((resolve, reject) => {
        if (this.vendorProfiles[vendorId]){
          resolve(this.vendorProfiles[vendorId]);
          return;
        }
        reject({'detail': 'Not found'});
        return
      })
    }

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    paint(){
      ReactDOM.render(<ProfileCreator createProfile={ this.createProfileAndPaintDeafult }/>, document.getElementById(this.rootElementId));
    }

    paintLoggedInView(){
      ReactDOM.render(<DefaultView isos={ this.isos } isoCounts={ this.isoMatchCounts } startCreateIso={ this.paintCreateIsoForm } viewMyProfile={ this.paintMyProfileView }/>, document.getElementById(this.rootElementId) );
    }

    paintCreateIsoForm() {
      ReactDOM.render(<NewIsoView createIso={ this.createIsoAndPaintDefaultView } cancelCreateIso={ this.paintLoggedInView }/>, document.getElementById(this.rootElementId));
    }

    paintMyProfileView() {
      console.log("Paint my profile view")
    }
}

export default Main
