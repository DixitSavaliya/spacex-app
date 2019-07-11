import React, { Component } from 'react';
import "material-components-web/dist/material-components-web.min.css";
import Grid from '@material-ui/core/Grid';
import API from '../../service/twitter.service.js';
import { Player } from 'video-react';
import Swal from 'sweetalert2';
import Tooltip from '@material-ui/core/Tooltip';
import './twitter.css';
import '../video.css';
import unregister from '../../intersepter.js';

class Twitter extends Component {

    /** constructor call */
    constructor(props) {
        super(props);
        this.state = {
            TwitterLaunches: [],
            TwitterMask: [],
            isLoaded: false
        }
    }

    /** First this function call during component render */
    componentDidMount() {

        /** spacex all tweets */
        API.getTwitterLaunches()
            .then((data) => {
                    if (!data.length) {
                        Swal.fire('Tweets Not Found....');
                        this.componentDidMount();
                    } else {
                        this.setState({
                            TwitterLaunches: data,
                            isLoaded: true
                        })
                    }
                console.log("twitter launches====", this.state.TwitterLaunches);
            })
            .catch((err) => {
                Swal.fire('Tweets Not Found....');
                console.log({ status: 500, message: 'Internal Server Error', err });
            })

        /** Elon Mask all tweets */
        API.getTwittersLaunches()
            .then((data) => {
                if (!data.length) {
                    Swal.fire('Tweets Not Found....');
                    this.componentDidMount();
                } else {
                    this.setState({
                        TwitterMask: data,
                        isLoaded: true
                    })
                }
                console.log("twitter mask====", this.state.TwitterMask);
            })
            .catch((err) => {
                Swal.fire('Tweets Not Found....');
                console.log({ status: 500, message: 'Internal Server Error', err });
            })
    }

    /** Render-app */
    render() {
        const { isLoaded } = this.state;
        if (!isLoaded) {
            return (
                <center>
                    <div className="load"></div>
                </center>
            )
        } else if (isLoaded) {
            return (
                <div className="main_tweets">

                    {/** Header Content */}
                    <Grid container spacing={12}>
                        <Grid item xl={6} md={6} sm={6} >
                            <h2 className="heading">Tweets <span className="font_size">by</span><span><a className="mdc-list-item trends-color top" target="_blank" href="https://twitter.com/SpaceX" aria-current="page">
                                <span className="font_size1"> @SpaceX</span>
                            </a></span></h2>
                        </Grid>
                        <Grid item xl={6} md={6} sm={6} >
                            <h2 className="heading">Tweets <span className="font_size">by</span><span><a className="mdc-list-item trends-color top" target="_blank" href="https://twitter.com/SpaceX" aria-current="page">
                                <span className="font_size1"> @elonmusk</span>
                            </a></span></h2>
                        </Grid>
                    </Grid>
                    <hr />

                    {/** SpaceX tweeted */}
                    <Grid container spacing={12}>
                        <Grid item xl={6} md={6} sm={6} >
                            <i class="fas fa-retweet"></i>
                            <p className="retweet">SpaceX tweeted</p>
                            <div className="scroll">
                                {
                                    this.state.TwitterLaunches.map(tweet =>
                                        <div key={tweet}>
                                            <div key={tweet}>
                                                <div className="tweet_class1">
                                                    <Grid container spacing={1}>
                                                        <Grid item sm={2}>
                                                            <div className="profile_image_post">
                                                                <img src={tweet.user.profile_image_url} />
                                                            </div>
                                                        </Grid>
                                                        <Grid item sm={10}>
                                                            <img className="img-twitter-logo" src={require('../../assets/images/feed.png')} />
                                                            <a className="mdc-list-item trends-color username_title" target="_blank" href={"http://twitter.com/" + tweet.user.screen_name} aria-current="page">
                                                                <Tooltip title={tweet.user.name} aria-label="Add">
                                                                    <span className="username_title"> {tweet.user.name}</span>
                                                                </Tooltip>
                                                            </a>
                                                            <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/" + tweet.user.screen_name} aria-current="page">
                                                                <Tooltip title={tweet.user.name} aria-label="Add">
                                                                    <span className="gray">@{tweet.user.screen_name}</span>
                                                                </Tooltip>
                                                            </a>
                                                            <p><span>{tweet.text}</span></p>
                                                            {(tweet.extended_entities) ?
                                                                (<div className="video">
                                                                    {tweet.extended_entities ? (<img className="video_height" src={tweet.extended_entities.media[0].media_url} />) : ('')}
                                                                </div>) : ('')}
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </Grid>

                        {/** Elon Mask tweeted */}
                        <Grid item xl={6} md={6} sm={6}>
                            <i class="fas fa-retweet"></i>
                            <p className="retweet">Elon Mask tweeted</p>
                            <div className="scroll">
                                {
                                    this.state.TwitterMask.map(tweet =>
                                        <div key={tweet}>
                                            <div key={tweet}>
                                                <div className="tweet_class1">
                                                    <Grid container spacing={1}>
                                                        <Grid item sm={2}>
                                                            <div className="profile_image_post">
                                                                <img src={tweet.user.profile_image_url} />
                                                            </div>
                                                        </Grid>
                                                        <Grid item sm={10}>
                                                            <img className="img-twitter-logo" src={require('../../assets/images/feed.png')} />
                                                            <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/" + tweet.user.screen_name} aria-current="page">
                                                                <Tooltip title={tweet.user.name} aria-label="Add">
                                                                    <span className="username_title">{tweet.user.name}</span>
                                                                </Tooltip>
                                                            </a>
                                                            <a className="mdc-list-item trends-color" target="_blank" href={"http://twitter.com/" + tweet.user.screen_name} aria-current="page">
                                                                <Tooltip title={tweet.user.name} aria-label="Add">
                                                                    <span className="gray">@{tweet.user.screen_name}</span>
                                                                </Tooltip>
                                                            </a>
                                                            <p><span>{tweet.text}</span></p>
                                                            {(tweet.extended_entities) ?
                                                                (<div className="video">
                                                                    {tweet.extended_entities ? (<img className="video_height" src={tweet.extended_entities.media[0].media_url} />) : ('')}
                                                                </div>) : ('')}
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
}

export default Twitter;