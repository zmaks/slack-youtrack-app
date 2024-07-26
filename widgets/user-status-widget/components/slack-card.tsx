import React, {memo} from 'react';
import type {FC} from 'react';
import type {Profile} from '../types/profile.ts';
import {Grid, Row, Col} from '@jetbrains/ring-ui-built/components/grid/grid';
import Tooltip from '@jetbrains/ring-ui-built/components/tooltip/tooltip';
import Text from '@jetbrains/ring-ui-built/components/text/text';
import Group from '@jetbrains/ring-ui-built/components/group/group';
import ChatLogo from '../images/slack.svg';

interface Props {
    profile: Profile;
}

const SlackCardComponent: FC<Props> = props => {
    const {profile} = props;
    let statusText = profile.slackData?.statusText;
    if (profile.slackData?.statusExpiration) {
        statusText += ' until ' + profile.slackData?.statusExpiration;
    }
    const nameRow = (
        <Row start="xs" className={'row'}>
            <Col xs={11}>
                <Group>
                    <Text size={Text.Size.M} bold>{profile.slackData?.fullName}</Text>
                    <Tooltip
                        title={statusText}
                        long
                        hidden={!profile.slackData?.statusImgUrl}
                        disabled={!profile.slackData?.statusText}
                    >
                        <img
                            alt="Status"
                            height={18}
                            width={18}
                            className={'img-icon'}
                            src={profile.slackData?.statusImgUrl}
                            hidden={!profile.slackData?.statusImgUrl}
                        />
                    </Tooltip>
                    <Tooltip title="Chat in Slack">
                        <a href={profile.slackLink} target={'_blank'} rel="noreferrer">
                            <img
                                alt="Chat in Slack"
                                height={15}
                                width={15}
                                className={'img-icon'}
                                src={ChatLogo}
                            />
                        </a>
                    </Tooltip>
                </Group>
                <br/>
                <Text size={Text.Size.S} info>{profile.slackData?.profileTitle}</Text>
            </Col>

        </Row>
    );

    return (
        <div>
            {
                profile.notInTargetGroup
                    ? <Text size={Text.Size.M}>{profile.noSlackMessage}</Text>
                    : (
                        <Grid className={'grid'}>
                            {nameRow}
                        </Grid>
                    )
            }
        </div>
    );
};

export const SlackCard = memo(SlackCardComponent);
