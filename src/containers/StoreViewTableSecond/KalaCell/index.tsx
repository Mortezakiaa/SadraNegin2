import React from 'react';

export const KalaCell = ({item}: any) => {
    return (
               
        <div style={{ width: '10rem' , textAlign:'center'}} >
            {item.name.split(' ')[4]}
        </div>
    )
               
}             
        
// const StyledTableCell = withStyles((theme) => ({
//     head: {
//         textAlign: 'center',
//         backgroundColor: theme.palette.secondary.main,
//         color: theme.palette.getContrastText(theme.palette.secondary.main),
//     },
//     body: {
//         textAlign: 'center',
//         fontSize: 14,
//     },
// }))(TableCell);