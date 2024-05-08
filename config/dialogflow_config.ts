const {SessionsClient} = require("@google-cloud/dialogflow-cx")
const fs = require('fs');
const util = require('util');

const client = new SessionsClient();

const sessionId = Math.random().toString(36).substring(7)
const sessionPath = client.projectLocationAgentSessionPath(
    process.env.PROJECT_ID,
    process.env.LOCATION_DIALOGFLOW,
    process.env.AGENT_ID,
    sessionId
)
console.log({sessionPath})