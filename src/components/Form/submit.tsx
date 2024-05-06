import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

interface SelfSubmitProps {
    disabled?: boolean;
    custom?: string;
}

export const SelfSubmit: React.FC<SelfSubmitProps> = ({
    disabled,
    custom,
}) => {
    const classes = useStyles();
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            // color="success"
            className={classes.submit}
            disabled={disabled}
        >
            {custom ? custom : 'تایید'}
        </Button>
    )
}

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));