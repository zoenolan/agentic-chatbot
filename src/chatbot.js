// SPDX-License-Identifier: MIT

"use strict";

const rulesBased = require("./rules.js");

class Chatbot {
    constructor(rulesFile) {
        this.rulesBased = new rulesBased.RulesBased(rulesFile);  
    }

    emptyReply(reply)   {   
        const empotyReply = ((reply === "") || (reply === undefined));
        return empotyReply;
    }

    async process(input) {  
        const reply = await this.rulesBased.process(input);

        return reply;
    }  
};

exports.Chatbot = Chatbot;