import React from 'react';
import { makeStyles, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import { StoreViewTableHead } from './Header';
import { SelfTableRow } from './row';
import { IItemStoreProps } from '../../models/Store/index';
import {StoreSearch} from 'models/Store/Search'
import { SelfTableRowDetails } from './Details/index';
import { FilterTableContainer } from './Filter';




interface StoreViewTableContainerProps {
  
    factory:StoreSearch,
    withAssets?: boolean;
    list:IItemStoreProps[];
}

export function StoreViewTableContainer({
   
    factory,
    withAssets,
    list
}: StoreViewTableContainerProps) {
    const classes = useStyles();
    // let PageSize = 100;
    // const [currentPage, setCurrentPage] = useState(1);

    // const currentTableData = useMemo(() => {
    //   const firstPageIndex = (currentPage) * PageSize;
    //   const lastPageIndex = firstPageIndex + PageSize;
    //   return list.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);


    return (
        < >
            <Paper className={`${classes.paper} table`} >
            <FilterTableContainer mainState={factory}/>
            <TableContainer className={`self-table ${classes.container}`} >
                <Table className={classes.table} >
                    <StoreViewTableHead withAssets={withAssets} />
                    <TableBody>
                    {list.length ?
                            list.map((item, index) => {
                                return <SelfTableRow item={item} key={index} mainState={factory} withAssets={withAssets}/>    
                            }) : <></>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <SelfTableRowDetails  mainState={factory} />
            
            {/* <SelfPagination
                totalPages={30}
                currentPage={currentPage}
                onChange={page => setCurrentPage(page)}
                /> */}
        </Paper>
        </>
    )
}

const useStyles = makeStyles((theme) => ({

    flexStyle: {
        display: 'flex',
        flexDirection: 'row'
    },

    gridStyle :{
       display : "inline-grid" 
    },

    paper: {
        position: 'relative',
        width: "fit-content"
    },
    container: {
        minHeight: '15rem',
        maxHeight: 'calc(100vh - 16rem)',
    },
    table: {
        '& th, td': {
            '&:not(:last-child)': {
                borderInlineEnd: `1px solid rgba(0, 0, 0, .1)`
            },
            '&:last-child': {
                zIndex: '0'
            }
        },
    },
}));


