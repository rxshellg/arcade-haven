import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homepage';
import DetailPage from './pages/DetailPage'
import PlayNowPage from './pages/PlayNowPage';
import ContactPage from './pages/ContactPage.tsx';
import Leaderboard from './pages/Leaderboard.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/game/:id' element={<DetailPage />} />
          <Route path="/play-now" element={<PlayNowPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
