import React from 'react'
import { Button, Grid, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { NotificationFactory } from 'models/Notification'

interface filesProps {
    newfiles:
    {
        tozihat: string | undefined,
        name: string | undefined,
        fileContent: string | undefined,
        fileType: string | undefined
    }[];
    factory: NotificationFactory
}

export const Files = ({ newfiles, factory }: filesProps) => {

    const classes = useStyles();
    if(newfiles!== null){

        const showFiles =
        <>
          <Button variant="contained" color="primary" style={{ marginRight: '20px',height: '65px' }} onClick={factory.onSubmitHandler}>Add</Button>
   
        <div className={`${classes.paper}`}>
            {
                newfiles.map((item, index) => (
                    item.name !== "" || item.tozihat !== "" || item.fileType !== "" ?
                        <Grid key={index} item container className={` ${classes.filter}`}  >
                            <Grid item container className={classes.content} >
                                <File newfile={item} />
                            </Grid>
                        </Grid> : null
                ))
            }
        </div>
        </>
        return <>{showFiles}</>
    }else {
        return null;
    }
}

interface fileProps {
    newfile: {
        tozihat: string | undefined,
        name: string | undefined,
        fileContent: string | undefined,
        fileType: string | undefined
    };
}
const File: React.FC<fileProps> = (props) => {
    const fileItem =
        <>
            <h3>
                {props.newfile.name}
            </h3>
            <h2>
                {props.newfile.fileType}
            </h2>
        </>
    return <>{fileItem}</>
}
const useStyles = makeStyles((theme) => ({
    filter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        flexGrow: 0,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, .2)',
        border: `1px solid ${grey[900]}`,
        margin: '3px .3rem',
        backgroundColor: grey[900],
        borderRadius: 5,
        cursor: 'pointer',
        maxWidth: '8rem',
        minWidth: '8rem',
        maxHeight: '3.6rem',
        minHeight: '3.6rem',
        overflow: 'hidden'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'nowrap',
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: theme.palette.getContrastText(grey[900])
    },
    name: {
        fontSize: 10,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    selected: { border: '1px solid red', borderRadius: '3px' },
    paper: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        fontSize:' 11px',
        backgroundColor: theme.palette.background.paper,
        // border: '1px solid #00000014',
        borderRadius: '10px',
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px',
        maxWidth: 'calc(100vw - 10rem)',
        minWidth: 270,
        maxHeight: 'calc(100vh - 10rem)',
        overflow: 'auto',
    },
    // labelStyle: {
    //     backgroundColor: 'indigo',
    //     color: 'white',
    //     padding: '0.5rem',
    //     fontFamily: 'sans-serif',
    //     borderRadius: '0.3rem',
    //     cursor: 'pointer',
    //     marginTop: '1rem',
    //   },
    //   fileChosen:{
    //     marginLeft:' 0.3rem',
    //     fontFamily: 'sans-serif',
    //   }

}))

