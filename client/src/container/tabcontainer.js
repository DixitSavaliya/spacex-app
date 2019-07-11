import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './tabcontainer.css'
import UpcomingLaunches from '../component/upcoming/Upcominglaunches.js';
import AllLaunches from '../component/alllaunches/Alllaunches.js';
import Twitter from '../component/twitter/Twitter.js';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

/** Simple Tabs Styles Use */
export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (

        /** Appbar of SpaceX-APP */
        <div className={classes.root}>
            <AppBar position="static">
                <h3 className="spacex_Info">🚀 SpaceX Info</h3>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Upcoming Launches" />
                    <Tab label="All Launches" />
                    <Tab label="Twitter" />
                </Tabs>
            </AppBar>
            {value === 0 && <TabContainer> <UpcomingLaunches /> </TabContainer>}
            {value === 1 && <TabContainer> <AllLaunches /> </TabContainer>}
            {value === 2 && <TabContainer> <Twitter /> </TabContainer>}
        </div>
    );
}