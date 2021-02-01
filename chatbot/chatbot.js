"use strict";
const dialogflow = require("dialogflow");
const config = require("../config/keys");
const structjson = require("structjson");
const mongoose = require("mongoose");

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};

// Create a new session dialogflow
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

const Registration = mongoose.model("registration");

module.exports = {
  textQuery: async function(text, userID, parameters = {}) {
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
    let self = module.exports;

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
   
          text: text,
         
          languageCode: languageCode
        },
        queryParams: {
          payload: {
            data: parameters
          }
        }
      }
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  eventQuery: async function(event, userID, parameters = {}) {
    let self = module.exports;
    let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
  
    const request = {
      session: sessionPath,
      queryInput: {
        event: {

          name: event,
          parameters: structjson.jsonToStructProto(parameters),
  
          languageCode: languageCode
        }
      }
    };
    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },
  handleAction: function(responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;
    switch (queryResult.action) {
      case "bookThinkpad":
        if (queryResult.allRequiredParamsPresent) {
          self.saveRegistration(queryResult.parameters.fields);
        }
        case "bookThinkvision":
          if (queryResult.allRequiredParamsPresent) {
            self.saveRegistration(queryResult.parameters.fields);
          }
        break;
    }
    return responses;
  },

  saveRegistration: async function(fields) {
    const registration = new Registration({
      productName: fields.productName.stringValue,
      email: fields.email.stringValue,
      number: fields.number.stringValue,
   
    });
    try {
      let reg = await registration.save();
      console.log(reg);
    } catch (err) {
      console.log(err);
    }
  }
};
