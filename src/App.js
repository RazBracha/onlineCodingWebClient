import './App.css';
import LobbyPage from './LobbyPage';
import CodeDisplayPage from './CodeDisplayPage';
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { getUserId } from './Utils';

export function App() {
  const location = useLocation();
  const pageId = location.pathname.split('/').pop();

  const server = "https://onlinecodingweb-production.up.railway.app";  // Railway server
  // const server = "http://localhost:5000";

  // useEffect(() => {
  //   try {
  //     const obj = {
  //       pageId,
  //       userId: getUserId()
  //     }
  //     fetch(server + "/codeblocks/locationChanged", {
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //         "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept",
  //         "Access-Control-Allow-Origin": "https://onlinecodingwebclient-production.up.railway.app",
  //         "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
  //       },
  //       credentials: "omit",
  //       method: 'POST',
  //       body: JSON.stringify(obj),
  //       mode: 'cors'
  //     }).then(console.log(""))
  //   } catch (error) {
  //     console.error('Error fetching user from server:', error);
  //   }
  //   return () => {

  //   }
  // }, [location, pageId])

  useEffect(() => {
    try {
      const obj = {
        pageId,
        userId: getUserId(),
      };

      fetch(`${server}/codeblocks/locationChanged`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
        credentials: 'include', // Use 'include' for credentials (cookies)
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      });
    } catch (error) {
      console.error('Error fetching user from server:', error);
    }
  }, [location, pageId]);


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
