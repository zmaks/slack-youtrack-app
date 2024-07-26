const dateTime = require("@jetbrains/youtrack-scripting-api/date-time");

const DATE_FORMAT = "EEE, d MMM, HH:mm";

function formatDateForUser(timestamp, user) {
    if (!timestamp) return
    return dateTime.format(timestamp, DATE_FORMAT, user.timeZoneId);
}

exports.getProfileLink = (slackUserData) => {
    const teamId = slackUserData.user?.team_id;
    const userId = slackUserData.user?.id;
    if (!teamId || !userId) return null;
    return `slack://user?team=${teamId}&id=${userId}`;
}

exports.getSlackData = (slackUserData, currentUser) => {
    const text = slackUserData.user?.profile?.status_text;
    const imgUrl = slackUserData.user?.profile?.status_emoji_display_info[0]?.display_url;
    const statusExpiration = slackUserData.user?.profile?.status_expiration;
    const fullName = slackUserData.user?.profile?.real_name_normalized;
    const profileTitle = slackUserData.user?.profile?.title;
    return {
        statusText: text,
        statusImgUrl: imgUrl,
        statusExpiration: formatDateForUser(statusExpiration * 1000, currentUser),
        fullName: fullName,
        profileTitle: profileTitle
    }
}