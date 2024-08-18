interface SlackData {
    statusText?: string;
    statusImgUrl?: string;
    statusExpiration?: string;
    fullName: string;
    profileTitle?: string;
}

export interface Profile {
    email?: string;
    slackLink?: string;
    slackData?: SlackData;
}

export interface ApiResponse {
    failed: boolean,
    message: boolean,
    login: string;
    profile?: Profile
}
