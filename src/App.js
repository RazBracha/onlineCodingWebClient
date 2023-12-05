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
  }, [location])


  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/code/*" element={<CodeDisplayPage />} />
      </Routes>
      <div className="App"></div>
    </>
  );
}

export default App;
