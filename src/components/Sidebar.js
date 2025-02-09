import React, {useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {SidebarData} from "./SidebarData";

import {IconContext} from "react-icons/lib";

const Nav = styled.div`
    background: ${(props) => props.bgColor || '#B3001C'}; 
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
`;

const NavIcon = styled(Link)`
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
`;

const SidebarNav = styled.nav`
  background: #a00404;
  width: ${({ collapsed }) => (collapsed ? "60px" : "250px")}; /* Adjust width based on state */
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s ease; /* Smooth animation for expanding and collapsing */
  z-index: 10;
  box-sizing: border-box;
  overflow: hidden; /* Prevent content overflow when collapsed */
  padding-top: 0px; /* Consistent padding for all states */
`;

const SidebarWrap = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 17px; /* Consistent padding for all states */
  margin: 5px 0; /* Consistent margin for spacing */
  text-decoration: none;
  font-size: 18px;
  color: #f5f5f5;
  height: 60px; /* Consistent height for all items */
  width: 100%; /* Full width of the sidebar */
  &:hover {
    background:rgb(128, 0, 19);
    color: #fff;
    cursor: pointer;
  }
  svg {
    position: absolute; /* Ensure the icon stays in place */
  }
  span {
    margin-left: ${({ collapsed }) => (collapsed ? "0" : "40px")}; /* Add space between icon and text */
    display: ${({ collapsed }) => (collapsed ? "none" : "inline")}; /* Hide text when collapsed */
  }
`;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true); // State for collapsed/expanded sidebar

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <SidebarNav
          collapsed={collapsed}
          onMouseEnter={() => setCollapsed(false)} // Expand on hover
          onMouseLeave={() => setCollapsed(true)} // Collapse on mouse leave
        >
          <SidebarWrap>
            {SidebarData.map((item, index) => {
              return (
                <SidebarLink to={item.path} key={index} collapsed={collapsed}>
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarLink>
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
