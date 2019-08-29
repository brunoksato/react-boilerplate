import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { Label, Alert } from "evergreen-ui";
import { useStore, useActions } from "../configureStore";

import Logo from "../assets/images/logo.png";

export default function ForgotPassword() {
  const isLoading = useStore(state => state.auth.isAuthLoading);
  const authError = useStore(state => state.auth.authError);
  const msgForgot = useStore(state => state.auth.msgForgot);
  const updateError = useActions(state => state.auth.updateAuthError);
  const forgotPassword = useActions(actions => actions.auth.forgotPassword);

  useEffect(() => {
    if (authError) {
      setTimeout(() => {
        updateError("");
      }, 4000);
    }
  }, [authError]);

  return (
    <Content>
      <Header>
        <HeaderBg />
        <HeaderWelcome>
          <HeaderLogo src={Logo} />
        </HeaderWelcome>
      </Header>
      <Box>
        <Formik
          initialValues={{ email: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Obrigatório";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            values.email = values.email.trim();
            forgotPassword(values);
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
              <ContentForm>
                {msgForgot && (
                  <Alert
                    intent="success"
                    style={{ lineHeight: "1.3" }}
                    title={msgForgot}
                  />
                )}
                {authError && <MessageError>{authError}</MessageError>}
                <Label
                  htmlFor={45}
                  size={500}
                  display="block"
                  marginBottom={3}
                  marginTop={15}
                >
                  Email
                </Label>
                <Input
                  height={45}
                  name="email"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                  autoComplete={"off"}
                />
                <MessageError>
                  {errors.email && touched.email && errors.email}
                </MessageError>
              </ContentForm>
              <BoxCenterLink>
                <LinkCustom to="/entrar">Lembrou da senha?</LinkCustom>
              </BoxCenterLink>
              <Button type="submit" disabled={isSubmitting} loading={isLoading}>
                <LabelButton>{isLoading ? "ENVIANDO" : "ENVIAR"}</LabelButton>
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Content>
  );
}

const Content = styled.div`
  background: #eff1f4;
  height: 97vh;
  padding: 1em;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  height: auto;
  width: 515px;
  border-radius: 2px;
  background: #ffffff;
  position: relative;
  transition-delay: 0.5s;
  box-shadow: 0 0 40px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    width: 100%;
  }
  @media (max-width: 600px) {
    width: auto;
    form {
      width: auto;
    }
  }
`;

const Header = styled.div`
  text-align: center;
  height: 120px;
  color: ${props => props.theme.color.gray};
  position: relative;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
`;

const HeaderBg = styled.div`
  position: absolute;
  height: 118px;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const HeaderWelcome = styled.div`
  font-size: 18px;
  position: relative;
`;

const HeaderLogo = styled.img`
  width: auto;
  height: 50px;
  display: inline-block;
  margin: 0 0 11px;
  vertical-align: middle;
  transition: margin-top 0.4s;
  margin: 10px 0px 0px 0px;
`;

const ContentForm = styled.div`
  padding: 10px 40px 20px 20px;
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
  width: 100%;
  height: 34px;
  opacity: 1;
  box-shadow: none;
  margin: 0px 0px 5px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  padding: 10px;
  transition: all 0.2s ease-in-out 0s;
  background-color: #eff1f4 !important;
  border-radius: 2px;
  :focus {
    background: rgb(255, 255, 255);
    box-shadow: rgb(22, 82, 240) 0px 0px 0px 1px inset;
    outline: none;
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
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  color: #333;
  :hover {
    text-decoration: underline;
  }
`;

const BoxCenterLink = styled.div`
  height: 50px;
  text-align: center;
  padding: 2em 1em 1em 1em;
  a {
    font-size: 17px;
  }
`;
