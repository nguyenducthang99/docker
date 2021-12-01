import React from "react";

import Icon from "@material-ui/core/Icon";
import Search from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

import Button from "components/public/CustomButtons/Button.js";

import styles from './styles.js';

const useStyles = makeStyles(styles);

const TopSearch = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <input className={classes.inputSearch} placeholder="Enter event's name to search..." />
            <Button style={styles.buttonWrapper} justIcon round color="info">
                <Search className={styles.searchIcon} />
            </Button>
        </div>
    );
}

export default TopSearch;