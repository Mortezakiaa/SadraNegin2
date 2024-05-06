import React, { ReactNode } from 'react';
import { Grid, makeStyles, Modal, Typography } from '@material-ui/core';

interface SelfModalProps {
    open: boolean;
    onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
    title: string;
    children: ReactNode;
    buttons?: any;
    overflow?: boolean;
}

export function SelfModal({
    open,
    onClose,
    title,
    children,
    buttons,
    overflow,
}: SelfModalProps) {
    const classes = useStyles();

    return (
        <Modal
            open={open}
            onClose={onClose}
            className={classes.modal}
        >
            <Grid container className={classes.paper + ' self-modal'} wrap='nowrap' >
                <Grid container item className={classes.header} >
                    {onClose && <div className='close-modal' onClick={(e) => onClose(e, 'backdropClick')} >x</div>}
                    <Typography variant='h6' component='h4'>
                        {title}
                    </Typography>
                </Grid>

                <Grid container item className={overflow ? classes.overFlowAuto : classes.body} >
                    {children}
                </Grid>

                <Grid container item className={classes.footer}>
                    {buttons}
                </Grid>
            </Grid>
        </Modal>
    )
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
        borderRadius: '10px',
        width: 'auto',
        maxWidth: 'calc(100vw - 10rem)',
        minWidth: 270,
        maxHeight: 'calc(100vh - 10rem)',
        overflow: 'hidden',
    },
    header: {
        position: 'relative',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        padding: theme.spacing(1),
        paddingRight: theme.spacing(6),
        paddingLeft: theme.spacing(4),
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '95%',
        overflow: 'auto',
        padding: theme.spacing(2)
    },
    footer: {
        position: 'sticky',
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '.2rem 1rem .4rem 1rem',
        zIndex: 2
    },
    overFlowAuto: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '95%',
        overflow: 'auto',
        padding: theme.spacing(2),
        zIndex: 2
    }
}))