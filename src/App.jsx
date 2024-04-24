import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Homepage from './pages/HomePage/Homepage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyPage from './pages/MyPage/MyPage';
import SearchListPage from './pages/SearchListPage/SearchListPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import StreamingPage from './pages/StreamingPage/StreamingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/searchlist" element={<SearchListPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* <Route path='/streaming' element={<StreamingPage/>} /> */}
          {/* <Route path='/streaming/:roomId' element={<StreamingPage/>} /> */}
          <Route path="/streaming/1" element={<StreamingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
