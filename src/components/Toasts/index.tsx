import React from 'react';
import { Color } from '@material-ui/lab';
import { Grid, Typography } from '@material-ui/core';
import { DoneOutline, ErrorOutline, InfoOutlined, WarningOutlined } from '@material-ui/icons';

interface SelfToastProps {
    severity: Color;
    message: string;
}

export const SelfToast: React.FC<SelfToastProps> = ({
    severity,
    message,
}) => {
    switch (severity) {
        case 'error': return <SelfToastItem caption={message} icon={<ErrorOutline />} />
        case 'info': return <SelfToastItem caption={message} icon={<InfoOutlined />} />
        case 'success': return <SelfToastItem caption={message} icon={<DoneOutline />} />
        case 'warning': return <SelfToastItem caption={message} icon={<WarningOutlined />} />

        default: return <></>
    }
};

interface SelfToastItemProps {
    caption: string,
    icon: any
}

const SelfToastItem: React.FC<SelfToastItemProps> = ({
    caption,
    icon
}) => {
    return (
        <Grid item className='self-toast-content' >
            {icon}
            <Typography variant='caption' >
                {caption}
            </Typography>
        </Grid>
    )
}