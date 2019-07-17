import React, { Component } from 'react';
import "material-components-web/dist/material-components-web.min.css";
import Grid from '@material-ui/core/Grid';
import API from '../../service/twitter.service.js';
import { Player } from 'video-react';
import Swal from 'sweetalert2';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import './twitter.css';
import '../video.css';
import unregister from '../../intercept.js';
import Twitters from 'twitter';
const Twit = require('twit');
const axios = require('axios');
// import const from '../../const.js';
class Twitter extends Component {

    /** constructor call */
    constructor(props) {
        super(props);
        this.state = {
            TwitterLaunches: [],
            TwitterMask: [],
            isLoaded: false,
            visible: 8
        }
        this.loadMore = this.loadMore.bind(this);
        this.loadMoreButton = this.loadMoreButton.bind(this);
    }

    /** First this function call during component render */
    componentDidMount() {
        // const T = new Twit({
        //     consumer_key: "R97gl62wfPLJEtWCbIVf1xKxg",
        //     consumer_secret: "tlvkOnbsX8KuL67mZSSrMsKyEIVls63iOhsu4L2SKJq2zL3ygK",
        //     access_token: "1125979094783414272-pD2nKhVWhrEtMYaYEpmtKNIehe4Zeh",
        //     access_token_secret: "JNTJLubPvs7eW4oQhjo3zVtz0TgwVCx7wmv0cqTVjomrY"
        // }
        // );
        // console.log("T======", T);
        // fetch('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=SpaceX&count=10', {
        //     method: 'GET',
        //     withCredentials: true,
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        //         'Accept': 'application/json',
        //         // 'Authorization': 'consumer_key="R97gl62wfPLJEtWCbIVf1xKxg",consumer_secret="tlvkOnbsX8KuL67mZSSrMsKyEIVls63iOhsu4L2SKJq2zL3ygK",access_token="1125979094783414272-pD2nKhVWhrEtMYaYEpmtKNIehe4Zeh",access_token_secret="JNTJLubPvs7eW4oQhjo3zVtz0TgwVCx7wmv0cqTVjomrY"'
        //         'Authorization': {
        //             consumer_key: "R97gl62wfPLJEtWCbIVf1xKxg",
        //             consumer_secret: "tlvkOnbsX8KuL67mZSSrMsKyEIVls63iOhsu4L2SKJq2zL3ygK",
        //             access_token: "1125979094783414272-pD2nKhVWhrEtMYaYEpmtKNIehe4Zeh",
        //             access_token_secret: "JNTJLubPvs7eW4oQhjo3zVtz0TgwVCx7wmv0cqTVjomrY"
        //         }
        //     }
        // }).then(response =>  {
        //     if (response) {
        //         console.log("response=",response);
        //       return response.json();
        //     } else {
        //       throw new Error('Something went wrong ...');
        //     }
        //   })
        //     .then(data => console.log("data====", data));

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

    /** SpaceX load more tweets */
    loadMore() {
        this.setState((prev) => {
            return { visible: prev.visible + 2 };
        });
    }

    /** Elonmusk load more tweets */
    loadMoreButton() {
        this.setState((prev) => {
            return { visible: prev.visible + 2 };
        });
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
                                <Tooltip title="@SpaceX On Twitter"><span className="font_size1"> @SpaceX</span></Tooltip>
                            </a></span><a className="mdc-list-item trends-color top" target="_blank" href="https://support.twitter.com/articles/20175256" aria-current="page">
                                    <i class="fas fa-info-circle"></i></a></h2>
                        </Grid>
                        <Grid item xl={6} md={6} sm={6} >
                            <h2 className="heading">Tweets <span className="font_size">by</span><span><a className="mdc-list-item trends-color top" target="_blank" href="https://twitter.com/SpaceX" aria-current="page">
                                <Tooltip title="@elonmusk On Twitter"><span className="font_size1"> @elonmusk</span></Tooltip>
                            </a></span><a className="mdc-list-item trends-color top" target="_blank" href="https://support.twitter.com/articles/20175256" aria-current="page">
                                    <i class="fas fa-info-circle"></i></a></h2>
                        </Grid>
                    </Grid>
                    <hr />

                    {/** SpaceX tweeted */}
                    <Grid container spacing={12}>
                        <Grid item xl={6} md={6} sm={6} >
                            <i class="fas fa-retweet"></i>
                            <p className="retweet">SpaceX tweeted</p>
                            <div className="scroll">
                                <div>
                                    {
                                        this.state.TwitterLaunches.slice(0, this.state.visible).map(tweet =>
                                            <div key={tweet}>
                                                <div key={tweet}>
                                                    <div className="tweet_class1">
                                                        <Grid container spacing={1}>
                                                            <Grid item sm={2}>
                                                                <div className="profile_image_post">
                                                                    <a className="mdc-list-item trends-color top" target="_blank" href={"http://twitter.com/" + tweet.user.screen_name} aria-current="page">
                                                                        <img src={tweet.user.profile_image_url} /></a>
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
                                                                        {tweet.extended_entities ? (<a className="mdc-list-item trends-color top" target="_blank" href={tweet.extended_entities.media[0].url} aria-current="page">
                                                                            <img className="video_height" src={tweet.extended_entities.media[0].media_url} /></a>) : ('')}
                                                                    </div>) : ('')}
                                                                <div className="date">
                                                                    <p>{(new Date(tweet.created_at)).toLocaleDateString()}</p>
                                                                </div>
                                                            </Grid>

                                                        </Grid>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {/** If tweets more then 8 click on load more button & see more tweets */}
                                    {this.state.TwitterLaunches ? <div>{this.state.visible < this.state.TwitterLaunches.length &&
                                        <Fab
                                            variant="extended"
                                            color="transparent"
                                            aria-label="Add"
                                            className="load-more-btn"
                                            onClick={this.loadMore}
                                        >
                                            Load more
                                      </Fab>
                                    }  </div> : <div>No data</div>}
                                </div>
                            </div>
                            <hr />
                            <div>
                                <a className="mdc-list-item trends-color top" target="_blank" href="https://publish.twitter.com/?url=https%3A%2F%2Ftwitter.com%2FSpaceX&ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline&ref_url=http%3A%2F%2Fspacex.joech.at%2F%23%2Ftwitter#" aria-current="page">
                                    <span className="left">Embed</span></a>
                                <a className="mdc-list-item trends-color top" target="_blank" href="https://twitter.com/SpaceX?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline&ref_url=http%3A%2F%2Fspacex.joech.at%2F%23%2Ftwitter" aria-current="page">
                                    <span className="right">View On Twitter</span></a>
                            </div>
                        </Grid>

                        {/** Elon Mask tweeted */}
                        <Grid item xl={6} md={6} sm={6}>
                            <i class="fas fa-retweet"></i>
                            <p className="retweet">Elon Mask tweeted</p>
                            <div className="scroll">
                                {
                                    this.state.TwitterMask.slice(0, this.state.visible).map(tweet =>
                                        <div key={tweet}>
                                            <div key={tweet}>
                                                <div className="tweet_class1">
                                                    <Grid container spacing={1}>
                                                        <Grid item sm={2}>
                                                            <div className="profile_image_post">
                                                                <a className="mdc-list-item trends-color top" target="_blank" href={"http://twitter.com/" + tweet.user.screen_name} aria-current="page">
                                                                    <img src={tweet.user.profile_image_url} /></a>
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
                                                                    {tweet.extended_entities ? (<a className="mdc-list-item trends-color top" target="_blank" href={tweet.extended_entities.media[0].url} aria-current="page">
                                                                        <img className="video_height" src={tweet.extended_entities.media[0].media_url} /></a>) : ('')}
                                                                </div>) : ('')}
                                                            <div className="date">
                                                                <p>{(new Date(tweet.created_at)).toLocaleDateString()}</p>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {/** If tweets more then 8 click on load more button & see more tweets */}
                                {this.state.TwitterMask ? <div>{this.state.visible < this.state.TwitterMask.length &&
                                    <Fab
                                        variant="extended"
                                        color="transparent"
                                        aria-label="Add"
                                        className="load-more-btn"
                                        onClick={this.loadMoreButton}
                                    >
                                        Load more
                                    </Fab>
                                } </div> : <div>No data</div>}
                            </div>
                            <hr />
                            <div>
                                <a className="mdc-list-item trends-color top" target="_blank" href="https://publish.twitter.com/?url=https%3A%2F%2Ftwitter.com%2FSpaceX&ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline&ref_url=http%3A%2F%2Fspacex.joech.at%2F%23%2Ftwitter#" aria-current="page">
                                    <span className="left">Embed</span></a>
                                <a className="mdc-list-item trends-color top" target="_blank" href="https://twitter.com/SpaceX?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline&ref_url=http%3A%2F%2Fspacex.joech.at%2F%23%2Ftwitter" aria-current="page">
                                    <span className="right">View On Twitter</span></a>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
}

export default Twitter;