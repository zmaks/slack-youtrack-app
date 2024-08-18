const slackUtil = require("./slack-util.js");
const slackClient = require("./slack-client.js");
const { cached } = require("./cache.js");

const checkUserNotInTargetGroup = (ctx) => {
    if (ctx.settings.targetUserGroup && !ctx.user.isInGroup(ctx.settings.targetUserGroup.name)) {
        let message = ctx.settings.notInGroupMessage || "This use is not in the Slack";
        setFailedResponse(ctx, message);
        return true;
    }
    return false;
};

const checkUserBanned = (ctx) => {
    if (ctx.user.isBanned) {
        setFailedResponse(ctx, "User is banned");
        return true;
    }
    return false;
};

const setFailedResponse = (ctx, message) => {
    ctx.response.json({
        login: ctx.user.login,
        failed: true,
        message: message
    });
};

exports.httpHandler = {
    endpoints: [
        {
            scope: 'user',
            method: 'POST', // can save slack data to cache, i.e. writes to DB, i.e. must be POST
            path: 'slack',
            handle: function (ctx) {
                if (checkUserBanned(ctx)) return;
                if (checkUserNotInTargetGroup(ctx)) return;

                const email = ctx.user.email;
                // cache user's slack status in order to decrease number of request to slack api
                const slackUserData = cached(ctx.user, ctx.settings.cacheTimeoutMin, () => {
                    return slackClient.fetchSlackUserData(email, ctx);
                });

                if (!slackUserData || slackUserData.error) {
                    setFailedResponse(ctx, "No Slack data");
                    return;
                }
                let data = {
                    login: ctx.user.login,
                    profile: {
                        email: email,
                        slackLink: slackUtil.getProfileLink(slackUserData),
                        slackData: slackUtil.getSlackData(slackUserData, ctx.currentUser),
                    }
                };
                ctx.response.json(data);
            }
        }
    ]
};
