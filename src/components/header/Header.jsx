import React from "react";
import { Container, Logo, LogOutBtn } from '../index';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Login",
      slug: "/",
      active: !authStatus, 
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: 'Home',
      slug: "/home",
      active: authStatus
    }, 
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header 
      className="py-3 shadow" 
      style={{
        background: "#babae6", 
        boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.1)",
        // borderBottom: "5px solid rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000, 
      }}
    >
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to='/'>
              <Logo  style={{ width: "25%" }} />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
};

export default Header;
