import React from 'react';
import { Menu, Input, Button, Dropdown } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utilities/AuthProvider'; // Assuming you have an auth context or provider to manage user state
import { Icon } from 'semantic-ui-react'; // Import icons for smaller buttons
import '../styles/Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handlePostClick = () => {
    if (currentUser) {
      navigate('/posts');
    } else {
      alert('Please login to create a post');
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await logout();
      console.log("Logged out successfully");
      navigate('/');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  console.log("Current user:", currentUser);

  return (
    <Menu style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Menu.Item header style={{ flex: '0 0 auto' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          DEV@Deakin
        </Link>
      </Menu.Item>

      <Menu.Item style={{ flexGrow: 1 }}>
        <Input icon="search" placeholder="Search..." style={{ width: '100%' }} />
      </Menu.Item>

      <Menu.Menu position="right" style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
        {/* Post button only visible when logged in */}
        {currentUser && (
          <Menu.Item>
            <Button icon onClick={handlePostClick} style={{ backgroundColor: 'darkcyan', color: 'white' }}>
              <Icon name="edit" /> {/* Icon for Post */}
            </Button>
          </Menu.Item>
        )}

        {/* Pricing Plan */}
        <Menu.Item>
          <Link to="/pricing">
            <Button icon>
              <Icon name="dollar" /> {/* Icon for Pricing */}
            </Button>
          </Link>
        </Menu.Item>

        {/* Chat */}
        <Menu.Item>
          <Link to="/chat">
            <Button icon>
              <Icon name="chat" /> {/* Icon for Chat */}
            </Button>
          </Link>
        </Menu.Item>

        {/* Conditional login/signup or logout */}
        {!currentUser ? (
          <Dropdown item text="Account">
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/login">
                  Login
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/signup">
                  Signup
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Menu.Item>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
