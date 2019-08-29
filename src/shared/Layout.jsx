import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { get } from "lodash";
import { auth as useAuth } from "../hooks/auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useActions } from "../configureStore";

export const Layout = props => {
  const [displaySidebar, setDisplay] = useState("");
  const { auth, cachedAuth } = useAuth(true);
  const getMe = useActions(actions => actions.auth.getMe);

  const isAuth =
    (!!get(auth, "token", false) || !!get(cachedAuth, "token", false)) &&
    (!window.location.pathname.includes("entrar") &&
      !window.location.pathname.includes("cadastro") &&
      !window.location.pathname.includes("trocar-senha"));

  function useOutsideAlerter(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (displaySidebar === "block") {
          setDisplay("none");
        }
      }
    }

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  useEffect(() => {
    setDisplay("none");
  }, [window.location.pathname]);

  let wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (isAuth) {
      getMe();
    }
  }, [window.location.pathname]);

  return isAuth ? (
    <Fragment>
      <Grid>
        <GridHeader>
          <Navbar
            routes={props.routes}
            displaySidebar={() => setDisplay("block")}
            icon={"menu"}
          />
        </GridHeader>
        <GridSidebar
          ref={wrapperRef}
          style={{ display: displaySidebar }}
          className="side-bar"
        >
          <Sidebar
            routes={props.routes}
            closeSidebar={() => {
              setDisplay("none");
            }}
          />
        </GridSidebar>
        <GridContent>{props.children}</GridContent>
      </Grid>
    </Fragment>
  ) : (
    <Fragment>{props.children}</Fragment>
  );
};

const Grid = styled.div`
  display: grid;
  overflow: hidden;
  grid-template: "sidebar header" 56px "sidebar content" minmax(250px, 1fr) / minmax(
      max-content,
      250px
    );
  @media (max-width: 1200px) {
    display: block;
  }
`;

const GridHeader = styled.div`
  grid-area: header;
`;

const GridSidebar = styled.div`
  display: block;
  width: 250px;
  position: fixed;
  grid-area: sidebar;
  background-color: ${props => props.theme.color.white};
  color: ${props => props.theme.color.white};
  top: 0px;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
  height: 100%;
  border-color: rgba(0, 0, 0, 0.05);
`;

const GridContent = styled.div`
  overflow: hidden;
  grid-area: content;
  padding: 0 1em;
`;
