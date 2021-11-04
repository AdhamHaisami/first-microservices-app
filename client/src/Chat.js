import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (message) {
      const messageData = {
        message,
        author: username,
        room,
        date: moment().format('MMMM Do YYYY'),
      };

      await socket.emit('send_message', messageData);
      setMessageList((oldList) => [...oldList, messageData]);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((oldList) => [...oldList, data]);
      console.log(messageList);
    });
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((message) => (
            <div
              className='message'
              id={username === message.author ? 'you' : 'other'}
            >
              <div>
                <div className='message-content'>{message.message}</div>
                <div className='message-meta'>
                  <p id='time'>{message.date}</p>
                  <p id='author'>{message.author}</p>
                </div>
                <div></div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          placeholder='hey...'
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
