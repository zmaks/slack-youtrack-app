const http = require("@jetbrains/youtrack-scripting-api/http");

const SLACK_BASE_URL = "https://slack.com";
const LOOKUP_BY_EMAIL_PATH = "/api/users.lookupByEmail";

exports.fetchSlackUserData = (email, ctx) => {
    const connection = new http.Connection(SLACK_BASE_URL, null, 2000);
    connection.bearerAuth(ctx.settings.slackToken);
    const params = [{ name: "email", value: email }];
    const response = connection.getSync(LOOKUP_BY_EMAIL_PATH, params);
    if (!response || response.code !== 200) {
        return { email: email, error: true };
    }
    return response.json();
}