import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Video from './components/Video'
import Control from './components/Control'
import User from './components/User'
import SideBand from './components/Sidebar'
import io, { Socket } from 'socket.io-client'
let socket = io(`http://localhost:4000`)
 
class App extends Component{

  state = {
    showType:'WebRTC',
    user:[],
    imagesrc:'z'
  }

  handleShowType = (showType) => {
    this.setState(showType)
    socket.emit(`imagedata`, showType.showType)
  }

  componentDidMount() {    
    socket.on(`connect`, data => {
      this.setState({
        user: [...this.state.user, data]
      })
    })

    socket.on(`image`, imagesrc => {
      
      this.setState({imagesrc:`data:image/jpeg;base64,${imagesrc}`})
    })

  }

  
  sendMessage = () => {
    socket.emit(`imagedata`)
  }

  handleCameraMovement = (dir) =>{
    socket.emit('cameramove', dir)
  }

 

  render(){
    return(
      <div>
        <Navbar />
        <div className="row" style={{marginRight : "0px"}}>
          <div className="col-2">
            <SideBand handleShowType = {this.handleShowType}/>
          </div>
          <div className="col-10">
            <div className="row">
              <div className="col-6 ">
                <Video value={this.state.showType} imagesrc={this.state.imagesrc}/>
              </div>
              <div className="col-6">
                <div className="container">
                  <h1>Camera Control</h1>
                  <div style={{textAlign:"center", width:"480px"}}>            
                    <button 
                      className="btn btn-info" 
                      onClick = { () => this.handleCameraMovement({dir:1}) }
                    >
                      Up
                    </button><br/><br/>
                    <button className="btn btn-info" onClick={()=>this.handleCameraMovement({dir:0})}>Down</button>
                  </div> 
                </div>

                <div className="container">
                  <h1>Car Control</h1>
                  <div style={{textAlign:"center", width:"480px"}}>            
                    <button type="button" className="btn btn-info" onclick="moveup()">Forward</button><br/><br/>
                    <button type="button" className="btn btn-info" onclick="moveleft()">Left</button> &nbsp; &nbsp; 
                    <button type="button" className="btn btn-info" onclick="moveright()">Right</button><br/><br/>
                    <button type="button" className="btn btn-info" onclick="movedown()">Reverse</button>
                  </div> 
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

