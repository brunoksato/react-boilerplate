import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/images/logo-oc.png";
import { Icon } from "evergreen-ui";

import closeIcon from "../assets/icons/close-modal.svg";

const Sidebar = props => (
  <Content>
    <Header>
      {/* <ContainerIcon onClick={props.closeSidebar}>
        <img src={closeIcon} style={{ height: "36px", marginTop: "8px" }} />
      </ContainerIcon> */}
      <HeaderBoxImg>
        <img src={Logo} alt="Project" />
      </HeaderBoxImg>
    </Header>
    <NavBox>
      <NavListBox>
        {props.routes.map((route, key) => (
          <NavBoxItem key={key} onClick={() => props.history.push(route.path)}>
            <NavBoxItemLink>
              <img src={route.icon} />
              <span>{route.name}</span>
              <Icon icon="chevron-right" color="#ced4da" />{" "}
            </NavBoxItemLink>
          </NavBoxItem>
        ))}
      </NavListBox>
    </NavBox>
  </Content>
);

export default withRouter(Sidebar);

const Content = styled.div`
  display: block;
`;

const Header = styled.div`
  background: #fff;
  padding: 20px 0px 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderBoxImg = styled.div`
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    height: 40px;
  }
  @media (max-width: 1200px) {
    > img {
      height: 35px;
    }
  }
`;

const ContainerIcon = styled.div`
  @media (max-width: 1200px) {
    cursor: pointer;
    display: block;
  }
  display: none;
`;

const NavBox = styled.nav`
  max-height: calc(100vh - 112px);
  height: calc(100vh - 112px);
`;

const NavListBox = styled.ul`
  list-style-type: none;
  margin-bottom: 0;
  padding-left: 0;
`;

const NavBoxItem = styled.li`
  cursor: pointer;
  display: block;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  :hover {
    border-radius: 0.375rem;
    background: #f6f9fc;
  }
`;

const NavBoxItemLink = styled.a`
  font-size: 1em;
  padding: 10px 20px;
  cursor: pointer;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  > .active {
    background-color: #f7f7f7;
    color: rgba(0, 0, 0, 0.8);
  }
  span {
    width: 170px;
  }
  img {
    margin-right: 10px;
    margin-bottom: 5px;
  }
`;
