import React from 'react';
import { NavLink } from 'react-router-dom';

interface Page {
  id: string;
  title: string;
}

interface ToolbarProps {
  pages: Page[];
}

const Toolbar: React.FC<ToolbarProps> = ({ pages }) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          NAMEAPP
        </NavLink>
        <ul className="navbar-nav d-flex flex-row gap-3 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          {pages.map(page => (
            <li className="nav-item" key={page.id}>
              <NavLink to={`/pages/${page.id}`} className="nav-link">
                {page.title}
              </NavLink>
            </li>
          ))}
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
