import React, { Component } from 'react';
import "material-components-web/dist/material-components-web.min.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import './Upcominglaunches.css';
import Tooltip from '@material-ui/core/Tooltip';
import API from '../../service/upcominglaunches.service';
import unregister from '../../intercept.js';

const classes = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
    },
    media: {
        height: 252
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
});

class UpcomingLaunches extends Component {

    /** constructor call */
    constructor(props) {
        super(props);
        this.state = {
            UpcomingLaunches: [],
            isFetching: true,
            isLoaded: false
        }
    }

    /** First this function call during component run */
    componentDidMount() {

        /**Upcoming Launches Spacex */
        API.getLaunches()
            .then((findresponse) => {
                this.setState({
                    UpcomingLaunches: findresponse,
                    isLoaded: true
                })
            })
            .catch((err) => {
                Swal.fire('Upcominglaunches Not Found....');
                console.log({ status: 500, message: 'Internal Server Error', err });
            })
    }

    /** Render-app */
    render() {
        const { classes } = this.props;
        const { isLoaded } = this.state;
        // console.log("upcoming launches===", this.state.UpcomingLaunches);
        if (!isLoaded) {
            return (
                <center>
                    <div className="load"></div>
                </center>
            )
        } else if (isLoaded) {
            return (
                <div className={classes.root}>
                    <h2 className="launch">Upcoming Launches</h2>
                    <div className="header_card">
                        {/** SpaceX-Upcoming Launches Response Display */}

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                {
                                    this.state.UpcomingLaunches.slice(0, Math.floor(this.state.UpcomingLaunches.length / 2)).map(spacedata =>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                <div className="img_space">
                                                    <img src={require('../../images/rocket.jpg')} />
                                                </div>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {spacedata.rocket.rocket_name}<span>  - {spacedata.mission_name}</span>
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <i className="fas fa-map-marker-alt"></i> {spacedata.launch_site.site_name_long}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <i className="far fa-calendar-alt"></i>
                                                        <strong className="date_color">{spacedata.launch_date_utc} UTC</strong>
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <i className="fas fa-user"></i>  {spacedata.rocket.second_stage.payloads[0].customers[0]}
                                                    </Typography>
                                                    {
                                                        spacedata.rocket.first_stage.cores[0].core_serial ?
                                                            (<div>
                                                                <Tooltip title={<div><span>"name":"{spacedata.mission_name}"</span> , <span>"flight":"{spacedata.flight_number}"</span></div>} aria-label="Add">
                                                                    <Fab
                                                                        variant="extended"
                                                                        size="small"
                                                                        color="primary"
                                                                        aria-label="Add"
                                                                        className={classes.margin}
                                                                    >
                                                                        🚀 {spacedata.rocket.first_stage.cores[0].core_serial}
                                                                    </Fab>
                                                                </Tooltip>
                                                            </div>) : ('')
                                                    }
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <a className="mdc-list-item trends-color username_title" target="_blank" href={spacedata.links.reddit_campaign} aria-current="page"><Button className="reddit">REDDIT</Button></a>
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    )}
                            </Grid>

                            {/** Upcoming Launches part-2 */}
                            <Grid item xs={12} sm={6}>
                                {
                                    this.state.UpcomingLaunches.slice(Math.floor(this.state.UpcomingLaunches.length / 2)).map(spacedata =>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                <div className="img_space">
                                                    <img src={require('../../images/rocket.jpg')} />
                                                </div>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {spacedata.rocket.rocket_name}<span>  - {spacedata.mission_name}</span>
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <i className="fas fa-map-marker-alt"></i> {spacedata.launch_site.site_name_long}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <i className="far fa-calendar-alt"></i>
                                                        <strong className="date_color">{spacedata.launch_date_utc} UTC</strong>
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <i className="fas fa-user"></i>  {spacedata.rocket.second_stage.payloads[0].customers[0]}
                                                    </Typography>
                                                    {
                                                        spacedata.rocket.first_stage.cores[0].core_serial ?
                                                            (<div>
                                                                <Tooltip title={<div><span>"name":"{spacedata.mission_name}"</span> , <span>"flight":"{spacedata.flight_number}"</span></div>} aria-label="Add">
                                                                    <Fab
                                                                        variant="extended"
                                                                        size="small"
                                                                        color="primary"
                                                                        aria-label="Add"
                                                                        className={classes.margin}
                                                                    >
                                                                        🚀 {spacedata.rocket.first_stage.cores[0].core_serial}
                                                                    </Fab>
                                                                </Tooltip>
                                                            </div>) : ('')
                                                    }
                                                    <div>
                                                        <a className="mdc-list-item trends-color username_title" target="_blank" href={spacedata.links.reddit_campaign} aria-current="page"><Button className="reddit">REDDIT</Button></a>
                                                    </div>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    )}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )
        }
    }
}

UpcomingLaunches.propTypes = {
    container: PropTypes.object,
};

export default withStyles(classes)(UpcomingLaunches);