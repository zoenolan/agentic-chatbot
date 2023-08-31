// SPDX-License-Identifier: MIT

"use strict";

const AimlHigh = require("aiml-high");
const api = require("./api.js");

const externalCallName = "external-call";
const externalParametersName = "external-parameters";
const externalReturnName = "external-return";
const externalMessageName = "external-message";

const findAnswerPromise = (interpreter, ...args) => {
  return new Promise((resolve, reject) => {
    interpreter.findAnswer(...args, (answer, wildCardArray, input) => {
      resolve(answer);
    });
  });
};

class RulesBased {
    constructor(rulesFile) {
      this.interpreter = new AimlHigh({}, {}, "");
      this.interpreter.loadFiles([rulesFile]);
    }

    async process(input) {  
      let message = input;

      let reply = "";

      let keepProcessing = false;
    
      do {
        // Assume we will not get an external call
        keepProcessing = false;
    
        // Get the response
        reply = await findAnswerPromise(this.interpreter, input).then((answer) => {
          return answer;
        });
    
        // Check if we need to make an external call
        const functionName = this.interpreter.getState(externalCallName);
        if (functionName !== undefined) {
          if (reply !== undefined && reply !== "undefined") {
            progressCallback(reply);
          }
    
          // Get the rest of the external call parameters
          const parameterList = this.interpreter.getState(externalParametersName);
          const returnVariable = this.interpreter.getState(externalReturnName);
          const newMessage = this.interpreter.getState(externalMessageName);
    
          // Get the values for the parameters
          const rawParameters = parameterList.trim();
    
          const parameters = [];
    
          if (rawParameters.length > 0) {
            const parameterNames = rawParameters.split(",");
            for (let i = 0; i < parameterNames.length; i++) {
              const name = parameterNames[i];
              const value = this.interpreter.getState(name);
              parameters.push(value);
            }
          }
    
          // Call the external API
          const result = await api.apiCall(functionName, parameters);
    
          // Delete the call parameters
          this.interpreter.removeState(externalCallName);
          this.interpreter.removeState(externalParametersName);
          this.interpreter.removeState(externalReturnName);
          this.interpreter.removeState(externalMessageName);
    
          // Tell the chatbot about the results
          this.interpreter.updateState(returnVariable, result);
          message = newMessage;
    
          // We want to process these values
          keepProcessing = true;
        }
      } while (keepProcessing);
  
      return reply;
    }  
};

exports.RulesBased = RulesBased;