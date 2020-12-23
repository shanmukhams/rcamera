const cv = require('opencv4nodejs');

const path = require('path')
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { createVerify } = require('crypto');
const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app)
const io = socketio(server);

app.use(cors());

let counter = '0';
FPS = 1
pv = ""

io.on('connect', (socket) => {
    console.log('a user connected')

    setInterval(() => {
        socket.on('image', (data)=>{
            console.log(data.substring(0,8))
            counter = data;        
        })
        
        
      }, 1000/FPS);

      socket.emit('sendimage', counter);

    socket.on('cameramove',(data)=>{
        console.log(data)
    })



    socket.on('imagedata', (data)=>{
        socket.emit()
    
        if(pv == data){
            io.emit('samecontrol')
        }
        else{
            pv = data
            const FPS = 30;
            const wCap = new cv.VideoCapture(0);
            wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
            wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
            var refreshIntervalId = setInterval(()=>{
                if(data!="Websockets"){
                    clearInterval(refreshIntervalId);
                }
                const frame = wCap.read();
                const image = cv.imencode('.jpg', frame).toString('base64');
                console.log(image.substring(0,8))
                io.emit('image', image);
            }, 10000/FPS)
        }
        
    })
    
    
})


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
