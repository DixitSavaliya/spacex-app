import React, { Component } from 'react';
import "material-components-web/dist/material-components-web.min.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import API from '../../service/pastlaunches.service';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import './alllaunches.css';
import unregister from '../../intercept.js';

/** Style */
const classes = theme =>
    ({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
        fab: {
            margin: theme.spacing(1),
        }
    });

/** AllLaunches Component  */
class AllLaunches extends Component {

    /** constructor call */
    constructor(props) {
        super(props);
        this.state = {
            PastLaunches: [],
            isLoaded: false
        }
    }

    /** First this function call during component render */
    componentDidMount() {
        /** Past Launches spacex */
        API.getPastLaunches()
            .then((findresponse) => {
                this.setState({
                    PastLaunches: findresponse,
                    isLoaded: true
                })
            })
            .catch({ status: 500, message: 'Internal Server Error' });
    }

    /** Render-app */
    render() {
        const { classes } = this.props;
        const { isLoaded } = this.state;
        if (!isLoaded) {
            return (
                <center>
                    <div className="load"></div>
                </center>
            )
        } else if (isLoaded) {
            return (
                <div>
                    <Paper className={classes.root}>
                        {/** Table In display All past Launches Data */}
                        <Table className={classes.table}>
                            <TableHead>
                                <h2 className="head">Past Launches</h2>
                                <TableRow>
                                    <TableCell align="left">Payload</TableCell>
                                    <TableCell align="center">Rocket</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Success</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.PastLaunches.map(pastlaunches =>
                                        <TableRow>
                                            <a className="mdc-list-item" target="_blank" href={pastlaunches.links.article_link} aria-current="page">
                                                <TableCell className="misson">
                                                    {pastlaunches.mission_name}
                                                </TableCell>
                                            </a>
                                            <TableCell align="center">{pastlaunches.rocket.rocket_name}</TableCell>
                                            <TableCell align="center">{(new Date(pastlaunches.launch_date_utc)).toLocaleDateString()}</TableCell>
                                            {
                                                pastlaunches.launch_success == true ?
                                                    (<TableCell align="center">
                                                        <Tooltip title="Misson Success" aria-label="Add">
                                                            <Fab variant="extended" aria-label="Delete" className={classes.fab}>
                                                                Success
                                                        </Fab>
                                                        </Tooltip>
                                                    </TableCell>) : (<TableCell align="center">
                                                        <Tooltip title="Misson Fail" aria-label="Add">
                                                            <Fab variant="extended" aria-label="Delete" className={classes.fab}>
                                                                Failure
                                                        </Fab>
                                                        </Tooltip>
                                                    </TableCell>)
                                            }
                                        </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            )
        }
    }
}

AllLaunches.propTypes = {
    container: PropTypes.object,
};

export default withStyles(classes)(AllLaunches);