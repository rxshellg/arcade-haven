import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homepage';
import DetailPage from './pages/DetailPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/game/:id' element={<DetailPage />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
