import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const User = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="container">
            <h1>Join</h1>
        </div>
    )
}

export default User;