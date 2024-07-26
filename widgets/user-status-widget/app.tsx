import React, {memo} from 'react';
import type {FC} from 'react';
import '@jetbrains/ring-ui-built/components/style.css';
import {SlackCard} from './components/slack-card.tsx';
import type {Profile} from './types/profile.ts';

const host = await YTApp.register();

const slackProfile: Profile =
    await host.fetchApp('user-data-api/slack', {scope: true, method: 'POST'});

const AppComponent: FC = () => {
    return (
        slackProfile.error
            ? (<div>{'Error'}</div>)
            : (<SlackCard profile={slackProfile}/>)
    );
};

export const App = memo(AppComponent);
