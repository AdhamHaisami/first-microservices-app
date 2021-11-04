import React, { useState } from 'react';
import io from 'socket.io-client';

import PostCreate from './PostCreate';
import PostList from './PostList';
import Chat from './Chat';

import './app.css';

const socket = io.connect('http://localhost:4040');

const App = () => {
  const [username, setUsername] = useState(null);
  const [room, setRoom] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username && room) {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
      </div>
      <div style={{ borderLeft: '6px solid blue', height: '500px' }}></div>
      {!showChat ? (
        <div className='joinChatContainer'>
          <h3>Join A Chat</h3>
          <input
            type='text'
            placeholder='Enter Name'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type='text'
            placeholder='Room ID'
            onChange={(e) => setRoom(e.target.value)}
            value={room}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default App;
