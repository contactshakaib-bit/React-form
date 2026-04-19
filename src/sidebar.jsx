import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/userlist">View Users</Link></li>
        <li><Link to="/adduser">Add New User</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;