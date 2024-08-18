import React, {memo} from 'react';
import type {FC} from 'react';
import '@jetbrains/ring-ui-built/components/style.css';
import Text from '@jetbrains/ring-ui-built/components/text/text';
import {SlackCard} from './components/slack-card.tsx';
import type {ApiResponse} from './types/api-response.ts';

const host = await YTApp.register();

const apiResponse: ApiResponse =
    await host.fetchApp('user-data-api/slack', {scope: true, method: 'POST'});

const AppComponent: FC = () => {
    return (
        apiResponse.failed
            ? (
                <div>
                    <Text size={Text.Size.M}>{apiResponse.message || 'Error'}</Text>
                </div>
            )
            : (<SlackCard profile={apiResponse.profile}/>)
    );
};

export const App = memo(AppComponent);
