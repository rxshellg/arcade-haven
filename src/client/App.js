import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = lazy(() => import("./pages/Homepage.jsx"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const PlayNowPage = lazy(() => import("./pages/PlayNowPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/game/:id" element={<DetailPage />} />
          <Route path="/play-now" element={<PlayNowPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
