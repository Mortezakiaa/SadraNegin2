import { Button } from '@material-ui/core';
import React from 'react';




interface IRepository {
  goodGetKardex: () => void;
  mande: Number | null;
  codeAnbar: string;
  codeKala: string
}

interface SelfInventoryProps<M> {
  mainState: M;

}
export function SelfInventory<M extends IRepository>({
  mainState,

}: SelfInventoryProps<M>) {


  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    mainState.goodGetKardex()
    
  }
  const res = typeof mainState.mande === 'number' ? <div style={rowStyle}>{mainState.mande}</div> : null
  const disable = mainState.codeKala !== '' && mainState.codeAnbar !== '' ? false : true
  return (
    <div style={resContainer} >
      <Button style={btnStyle} disabled={disable} onClick={onClickHandler}>موجودی انبار</Button>
      <>{res}</>
    </div>
  )
}

const rowStyle = {
  width: '70%',
  height: '40px',
  backgroundColor: '#f274740d',
  borderRadius: '3px',
  display: 'flex',
  alignContent: 'space-around',
  justifyContent: 'space-around',
  alignItems: 'center',
  boxShadow: ' 0px 0px 4px 0px #f2747436'
}

const resContainer = { display: 'flex', justifyContent: 'space-between', width: '100% ' }

const btnStyle = {
  backgroundColor: "#1a237e",
  width: '25%', height: '40px',
  borderRadius: '3px',
  color:'#ffffff'
}