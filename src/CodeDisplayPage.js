import './CodeDisplayPage.css';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import { getUserId } from './Utils';

import Editor from '@monaco-editor/react';


// const serverURL = "https://online-coding-web-gg9w.httpvercel.app";  vercl
// const serverURL = "https://onlinecodingweb-production.up.railway.app";

const serverURL = "http://localhost:5000";

const socket = io(serverURL, {
  transports: ["websocket", "polling"],
  withCredentials: true
})

function CodeDisplayPage({ pageId }) {
  const [choosenCode, setChoosenCode] = useState();
  const [text, setText] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [user, setUser] = useState();
  const [isMentor, setIsmMentor] = useState()

  console.log("render code display page with ", pageId)

  useEffect(() => {
    try {
      fetch(`${serverURL}/codeblocks/${pageId}`, {
        headers: {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept",
          'Access-Control-Allow-Origin': 'https://onlinecodingwebclient-production.up.railway.app',
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setChoosenCode(data);
          setIsmMentor(data.mentorId === getUserId());
        });
    } catch (error) {
      console.error('Error fetching code blocks from server:', error);
    }
  }, [pageId]);

  useEffect(() => {
    socket.on("user_connected", (data) => {
      setUser(data.user);
    });
  }, []);

  useEffect(() => {
    if (choosenCode?.answer === text) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [choosenCode, text]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setText(data.messageText);

    });
  }, []);

  const sendMessage = (messageText) => {
    socket.emit("send_message", { messageText, user });
  };

  const handleChangeText = (e) => {
    sendMessage(e);
  };

  return (
    <>
      <div className='display'>
        <h2 className='headline'>{`${choosenCode?.title}`}</h2>
        <h4 className='mission'> Mission: {`${choosenCode?.mission}`}</h4>

      </div>
      {choosenCode?.code && (<Editor className="editor"
        options={{ readOnly: isMentor ? true : false }}
        height="100px"
        width="500px"
        defaultLanguage="javascript"
        defaultValue={choosenCode?.code}
        value={text}
        onChange={(e) => handleChangeText(e)} />)}


      {showMessage && (
        <div className="message-window">
          <p>Correct answer!</p>
        </div>
      )}
    </>
  );
}

export default CodeDisplayPage;