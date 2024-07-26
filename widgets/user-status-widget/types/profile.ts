interface SlackData {
    statusText?: string;
    statusImgUrl?: string;
    statusExpiration?: string;
    fullName: string;
    profileTitle?: string;
}

export interface Profile {
    error: boolean,
    notInTargetGroup: boolean,
    noSlackMessage: boolean,
    login: string;
    email?: string;
    slackLink?: string;
    slackData?: SlackData;
}
