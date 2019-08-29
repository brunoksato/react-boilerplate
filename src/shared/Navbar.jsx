import React, { useState, useLayoutEffect } from "react";
import get from "lodash/get";
import styled from "styled-components";
import { auth as useAuth } from "../hooks/auth";
import { withRouter } from "react-router-dom";
import { Icon, Menu, Popover, Position, Pane } from "evergreen-ui";
import { useActions, useStore } from "../configureStore";

const Navbar = props => {
  const currentUser = useStore(state => state.auth.user);
  const user = useStore(state => state.auth.user);
  const { auth, cachedAuth } = useAuth(false);
  const isAuth =
    !!get(auth, "token", false) || !!get(cachedAuth, "token", false);

  const logout = useActions(actions => actions.auth.clearAuth);

  const [title, setTitle] = useState("/");

  const pathName = window.location.pathname;
  useLayoutEffect(() => {
    switch (pathName) {
      case "/":
        setTitle("Painel");
        break;
      default:
        setTitle("Painel");
        break;
    }
  }, [pathName]);

  return isAuth ? (
    <Content>
      <ContentBox>
        <ContainerIcon>
          <Icon
            icon={props.icon}
            size={28}
            color={"white"}
            marginLeft={16}
            onClick={props.displaySidebar}
          />
        </ContainerIcon>
        <ContentLink>
          <BadgeNameRoute>{title}</BadgeNameRoute>
        </ContentLink>
        <div style={{ zIndex: 1, display: "flex" }}>
          <Popover
            position={Position.BOTTOM_LEFT}
            content={
              <Menu>
                <Menu.Group>
                  <Menu.Item
                    icon="person"
                    onSelect={() => props.history.push("/account")}
                  >
                    <NameUser>{currentUser.name}</NameUser>
                  </Menu.Item>
                  <Menu.Item icon="log-out" onSelect={logout}>
                    Sair
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }
          >
            <Pane>
              <BoxLogout>
                {currentUser.image ? (
                  <AvatarUser src={currentUser.image} />
                ) : (
                  <BoxIconUser>
                    <Icon icon="person" size={22} marginTop={0} color="#ccc" />
                  </BoxIconUser>
                )}
              </BoxLogout>
            </Pane>
          </Popover>
        </div>
      </ContentBox>
    </Content>
  ) : null;
};

export default withRouter(Navbar);

const Content = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
`;

const ContentBox = styled.div`
  height: 100%;
  padding: 0 10px;
  width: 100%;
  display: flex;
  padding-top: 1em;
  align-items: start;
  > :last-child {
    margin-left: auto;
    padding-right: 20px;
  }
`;

const ContainerIcon = styled.div`
  margin-top: 9px;
  z-index: 9999;
  @media (max-width: 1200px) {
    display: block;
  }
  display: none;
`;

const ContentLink = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BadgeNameRoute = styled.div`
  z-index: 1;
  margin-left: 1.5em;
  display: inline-block;
  max-width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-wrap: normal;
  font-size: 0.9em;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-weight: 500;
  margin-right: 16px;
  transition: all 0.2s ease-in-out 0s;
  padding: 2px 16px;
  border-radius: 12px;
  margin-top: 10px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const BoxLogout = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BoxIconUser = styled.div`
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1em;
`;
const AvatarUser = styled.img`
  width: 40px;
  height: 40px;
  /* background: #fff; */
  border-radius: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1em;
`;

const NameUser = styled.div`
  color: #333;
`;

