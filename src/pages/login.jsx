import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Label } from "evergreen-ui";
import { useStore, useActions } from "../configureStore";
import Content from "../components/Login/Content";
import { theme } from "../theme";

import Logo from "../assets/images/logo-oc.png";
import bg from "../assets/images/food-bg.jpg";

export default function Login() {
  const isLoading = useStore(state => state.auth.isAuthLoading);
  const authError = useStore(state => state.auth.authError);
  const updateError = useActions(state => state.auth.updateAuthError);
  const login = useActions(actions => actions.auth.authenticateUser);

  useEffect(() => {
    if (authError) {
      setTimeout(() => {
        updateError("");
      }, 4000);
    }
  }, [authError]);

  return (
    <Content>
      <Box>
        <Formik
          enableReinitialize
          initialValues={{ email: "", password: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Obrigatório";
            }

            if (!values.password) {
              errors.password = "Obrigatório";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            login(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <Header>
                <HeaderBg />
                <HeaderWelcome>
                  <HeaderLogo src={Logo} />
                </HeaderWelcome>
              </Header>
              <ContentForm>
                {authError && <MessageError>{authError}</MessageError>}
                <LinkRegister to="/register">
                  <Label
                    htmlFor={45}
                    size={500}
                    display="block"
                    marginBottom={3}
                    marginTop={15}
                  >
                    Email
                  </Label>
                </LinkRegister>
                <Input
                  height={45}
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                  autoComplete={"off"}
                  autoFocus={true}
                />
                <MessageError>
                  {errors.email && touched.email && errors.email}
                </MessageError>
                <br />
                <Label
                  htmlFor={45}
                  size={500}
                  display="block"
                  marginBottom={3}
                  marginTop={15}
                >
                  Senha
                </Label>
                <Input
                  height={45}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Senha"
                  type="password"
                  autoComplete={"off"}
                />
                <MessageError>
                  {errors.password && touched.password && errors.password}
                </MessageError>
              </ContentForm>
              <BoxLink>
                <LinkCustom to="/esqueceu-senha">Esqueceu a senha?</LinkCustom>
              </BoxLink>
              <BoxCenterLink>
                <LinkCustom to="/register">Criar uma nova conta</LinkCustom>
              </BoxCenterLink>
              <Button type="submit" disabled={isSubmitting} loading={isLoading}>
                <LabelButton>{isLoading ? "Entrando" : "Entrar"}</LabelButton>
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Content>
  );
}

const Box = styled.div`
  height: auto;
  width: 515px;
  border-radius: 6px;
  background: #f7fafc;
  position: fixed;
  transition-delay: 0.5s;
  box-shadow: 0 0 40px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px;
  height: 100px;
  color: ${props => props.theme.color.gray};
  position: relative;
  background: #fff;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-sizing: border-box;
`;

const HeaderBg = styled.div`
  background: rgba(241, 241, 241, 0.8);
  position: absolute;
  height: 118px;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const HeaderWelcome = styled.div`
  position: relative;
`;

const HeaderLogo = styled.img`
  width: auto;
  height: 50px;
  display: inline-block;
  margin: 0 0 0px;
  vertical-align: middle;
  -webkit-transition: margin-top 0.4s;
  transition: margin-top 0.4s;
  margin: 0px 0px 0px 0px;
`;

const ContentForm = styled.div`
  padding: 40px 40px 0px 40px;
  @media (max-width: 600px) {
    padding: 1em;
  }
`;

const MessageError = styled.span`
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  color: ${props => props.theme.color.red};
  font-size: 1em;
`;

const Input = styled.input`
  margin-top: 5px;
  padding: 0 14px;
  font-size: 1em;
  right: 0;
  height: 45px;
  width: 100%;
  max-width: 400px;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 3px;
  border: none;
  background: #fff;
  margin-bottom: 4px;
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
  :focus {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08) !important;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const Button = styled.button`
  background-color: #f58220;
  border: 0;
  padding: 14px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  color: #fff;
  letter-spacing: 1px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  outline: 0;
  opacity: ${props => (props.loading ? 0.8 : 1)};
`;

const LabelButton = styled.span`
  height: 42px;
  line-height: 42px;
  font-size: 1.5em;
  font-weight: bold;
`;

const LinkCustom = styled(Link)`
  height: 30px;
  line-height: 30px;
  font-size: 10px;
  font-weight: 400;
  text-decoration: none;
  color: ${theme.color.primary};
  font-family: ${theme.font};
  :hover {
    text-decoration: underline;
  }
`;

const LinkRegister = styled(Link)`
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
`;

const BoxLink = styled.div`
  height: 50px;
  padding-left: 40px;
  padding: 0em 0em 1em 40px;
  a {
    font-size: 17px;
  }
`;

const BoxCenterLink = styled(BoxLink)`
  text-align: center;
  padding-left: 0px;
`;
