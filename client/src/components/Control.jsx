import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Messages from './Messages';
import Input from './Input';

let socket;

const Control = ({ location }) => {

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "localhost:3001";

    useEffect(() => {
        const { name } = queryString.parse(location.search);

        socket = io(ENDPOINT)

        setName(name);

        socket.emit('join', { name }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on('sendimage', (counter) => {
          const imageEle = document.getElementById('image');
          imageEle.src = `${counter}`;
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div>
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    )
}

export default Control;

//<Greetings name={name} />