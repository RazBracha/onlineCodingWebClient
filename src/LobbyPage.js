import CodeList from './CodeList';
import './LobbyPage.css';
import React, { useEffect, useState } from 'react';

function LobbyPage() {

  // const server = "https://online-coding-web-gg9w.vercel.app/codeblocks";   vercel
  const server = "https://onlinecodingweb-production.up.railway.app";
  // const server = "http://localhost:5000";

  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    // Fetch code blocks from the server  
    fetch(`${server}/codeblocks`, {
      headers: {
        'Access-Control-Allow-Origin': 'onlinecodingwebclient-production.up.railway.app',
      },
      credentials: "same-origin",
    })
      .then(response => response.json())
      .then(data => setCodeBlocks(data))
      .catch(error => {
        console.error('Error fetching code blocks:', error);
      });
  }, []);


  return (
    <>
      <div className="lobby-page">
        <h1 className="lobby-header animated fadeInDown"> Welcome ! </h1>
        <h2 className="choose-option">Choose code block:</h2>
      </div>

      <CodeList codeBlocks={codeBlocks} />
    </>
  );
}



export default LobbyPage;
