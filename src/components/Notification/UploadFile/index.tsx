import React from 'react'
import {  Container, Input, makeStyles } from '@material-ui/core'
import { SelfDatePicker, SelfForm, SelfTextFieldWithoutField } from 'components'
import { INotif, NotificationFactory } from '../../../models/Notification'
import { Files } from '../Files';
import { useSelfForm } from 'utilities';



interface UploadFileProps {
    factory: NotificationFactory
}
export function UploadFile({ factory }: UploadFileProps) {

    const classes = useStyles();
    const [mainState, control, handleSubmit] = useSelfForm<INotif, NotificationFactory>(factory);
    return (
        <>
        <Container className='self-container' >
                <SelfForm<INotif, NotificationFactory>
                    mainState={mainState}
                    onSubmit={handleSubmit}
                    title=' اطلاعیه '
                    disabled={mainState.disabled}
                    className='grid row'
                >
        
                <div className={classes.textBox}>
                    <Input type="text" className={classes.textTitle} placeholder="لطفا عنوان اطلاعیه را وارد کنید" value={factory.titleValue} onChange={factory.onChangeTiltle} />
                    <SelfTextFieldWithoutField
                        label='اطلاعیه'
                        className={classes.textField}
                        value={factory.inputValue}
                        onChange={factory.onchangeHandler}
                        inputRef={factory.inputReff}
                    />
                    <div className={classes.dateField}>
                     <SelfDatePicker<INotif,NotificationFactory>
                        mainState={mainState}
                        control={control}
                        fieldName='date'
                        label='تاریخ اطلاعیه'
                        rules={{
                            required: true
                        }}
                    /> 
                 
                </div>
            </div>
            <div className={classes.fileContainer}>
                    <input className={classes.uploadFile} id="upload-photo" type='file' name='file' accept=".jpg, .jpeg, .png, .txt, .pdf, .xlsx" onChange={factory.onChangeFile}></input>
                    <Files newfiles={factory.values.lines}  factory={factory}/>
            </div>
            {/* <Button variant="contained" color="secondary" style={{ width: '300px', marginBottom: '40px' }} onClick={factory.sendFile}>Publish</Button> */}
            </SelfForm>
            </Container>
        </>
    );

}

const useStyles = makeStyles((theme) => ({
    textTitle: {
        width: '40%',
    },
    textField: {
        width: '80%',
    },
    dateField: {
        width: '100%',
    },
    textBox: {
        display: 'flex',
        width: '60%',
        flexDirection: 'column'
    },
    fileContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '40px',
    },
    notif: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: ' 250px',
        alignItems: 'self-end',
        alignContent: 'start',
        justifyContent: 'start',
        padding: '40px',
    },
    addFile: {
        borderRadius: '3px',
        display: 'flex',
        width: '100px',
        height: '100px',
        backgroundColor: '#ff00000d',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    uploadFile:{
        border:' 1px solid rgb(0 0 0 / 14%)',
        borderRadius: '2px',
    }
}))