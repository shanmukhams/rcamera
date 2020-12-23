import React, { Component } from 'react';
import './Video.css'
import ReactPlayer from 'react-player';
import WebRTC from './WebRTCVideo';
import Websockets from './Websockets';



class Video extends Component {

    render() {
        
        return (
            <div>
                <h1>Makerspace RPi Camera </h1>
               
                <div>
                    {this.props.value == "WebRTC"
                        ? <WebRTC onClick={this.handleChange}/>
                        : <Websockets onClick={this.handleChange}  imagesrc={this.props.imagesrc}/>
                    }
                </div>
                
                </div>
        );
    }
}

export default Video;

