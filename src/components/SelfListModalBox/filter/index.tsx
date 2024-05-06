import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { FilterItem } from "./item";
import { Model } from "models";
import "./spinnerStyle.css";
import { HeadOfProductsFactory } from "models/HeadOfProductsFactory";

interface FilterProductIconProps<IM, M extends Model<any, any>> {
  mainState: M;
  factory: HeadOfProductsFactory;
}

export function FilterProductIcon<IM, M extends Model<any, any>>({
  mainState,
  factory,
}: FilterProductIconProps<IM, M>) {
  const classes = useStyles();
  const onClickHandler = () => {
    factory.GoodGetAll();
  };

  const res = (
    <>
      {factory.items?.map((item, index) => (
        <FilterItem
          key={index}
          item={item}
          disabled={mainState.loading}
          factory={factory}
        />
      ))}
      <Grid>
        <button className={classes.reloadBtn} onClick={onClickHandler}>
          به روز رسانی
        </button>
      </Grid>
    </>
  );

  const spinner = (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );

  if (!factory.items) {
    factory.GoodGetAll();
    return <>{spinner}</>;
  }
  return (
    <Grid item container className={classes.filter}>
      {res}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  filter: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, .2)",
    marginBottom: 10,
    borderRadius: 5,
    padding: ".2rem .5rem",
    overflowX: "auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "nowrap",
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: theme.palette.getContrastText(grey[900]),
  },

  reloadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "128px",
    height: "57px",
    backgroundColor: "#fff",
    borderRadius: "3px",
    color: "#000",
  },
}));
