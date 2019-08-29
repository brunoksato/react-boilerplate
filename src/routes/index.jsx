import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import { Layout } from "../components/Layout";
import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import Account from "../pages/account";
import ForgotPassword from "../pages/forgotPassword";
import ChangePassword from "../pages/changePassword";

const privateRoute = [
  {
    path: "/",
    name: "Painel",
    description: "Painel",
    icon: HomeIcon
  },
  //menu sidebar map
];

const RestrictedArea = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/perfil" component={Account} />
    </Switch>
  );
};

const Routes = ({ history }) => (
  <Router history={history}>
    <Layout routes={privateRoute}>
      <Switch>
        <Route exact path="/trocar-senha" component={ChangePassword} />
        <Route exact path="/esqueceu-senha" component={ForgotPassword} />
        <Route exact path="/cadastro" component={Register} />
        <Route exact path="/entrar" component={Login} />
        <PrivateRoute path="/" component={() => RestrictedArea()} />
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
