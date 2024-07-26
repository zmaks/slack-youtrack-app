const slackUtil = require("./slack-util.js");
const slackClient = require("./slack-client.js");
const { cached } = require("./cache.js");

const isUserInTargetGroup = (ctx) => {
    if (ctx.settings.targetUserGroup && !ctx.user.isInGroup(ctx.settings.targetUserGroup.name)) {
        ctx.response.json({
            login: ctx.user.login,
            notInTargetGroup: true,
            noSlackMessage: ctx.settings.notInGroupMessage || "This use is not in the Slack"
        });
        return false
    }
    return true
}

exports.httpHandler = {
    endpoints: [
        {
            scope: 'user',
            method: 'POST', // can save slack data to cache, i.e. writes to DB, i.e. must be POST
            path: 'slack',
            handle: function (ctx) {
                if (!isUserInTargetGroup(ctx)) {
                    return
                }
                const email = ctx.user.email;
                // cache user's slack status in order to decrease number of request to slack api
                const slackUserData = cached(ctx.user, ctx.settings.cacheTimeoutMin, () => {
                    return slackClient.fetchSlackUserData(email, ctx);
                });

                if (!slackUserData) {
                    ctx.response.json({ login: ctx.user.login, error: true });
                    return
                }
                let data = {
                    login: ctx.user.login,
                    email: email,
                    slackLink: slackUtil.getProfileLink(slackUserData),
                    slackData: slackUtil.getSlackData(slackUserData, ctx.currentUser),
                }
                ctx.response.json(data);
            }
        }
    ]
};
