import './App.css';
import LobbyPage from './LobbyPage';
import CodeDisplayPage from './CodeDisplayPage';
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { getUserId } from './Utils';

export function App() {
  const location = useLocation();
  // const server = "https://online-coding-web-gg9w.vercel.app"; vercel
  const server = "https://onlinecodingweb-production.up.railway.app";
  // const server = "http://localhost:5000";


  const pageId = location.pathname.split('/').pop();


  useEffect(() => {
    try {
      const obj = {
        pageId,
        userId: getUserId()
      }
      fetch(server + "/codeblocks/locationChanged", {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          "Access-Control-Allow-Headers": "*",
          'Access-Control-Allow-Origin': 'https://onlinecodingwebclient-production.up.railway.app',
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
        },
        method: 'POST',
        body: JSON.stringify(obj),
        mode: 'cors'
      }).then(console.log(""))
    } catch (error) {
      console.error('Error fetching user from server:', error);
    }
    return () => {

    }
  }, [location, pageId])


  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/code/*" element={<CodeDisplayPage pageId={pageId} />} />
      </Routes>
      <div className="App"></div>
    </>
  );
}

export default App;
