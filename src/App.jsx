import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './sidebar';
import UserList from './userlist'
import Adduser from './adduser';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/userlist" element={<UserList />} />
            <Route path="/adduser" element={<Adduser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;