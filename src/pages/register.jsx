import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { Label } from "evergreen-ui";
import { Link } from "react-router-dom";
import { useStore, useActions } from "../configureStore";
import { theme } from "../theme";
import ChoosePlan from "../components/Register/ChoosePlan";

import Logo from "../assets/images/logo-oc.png";

export default function Register(props) {
  const isLoading = useStore(state => state.auth.isAuthLoading);
  const authError = useStore(state => state.auth.authError);
  const updateError = useActions(state => state.auth.updateAuthError);
  const signup = useActions(actions => actions.auth.createUser);

  const [plan, setPlan] = useState(1);

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
        <HeaderLogo src={Logo} />
      </Header>
      <Box>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            birthday: "",
            password: "",
            confirmPassword: "",
            number_cc: "",
            name_cc: "",
            validate_cc: "",
            security_cc: ""
          }}
          validate={values => {
            let errors = {};
            if (!values.name) {
              errors.name = "Obrigatório";
            }
            if (!values.birthday) {
              errors.birthday = "Obrigatório";
            }
            if (!values.phone) {
              errors.phone = "Obrigatório";
            }
            if (!values.password) {
              errors.password = "Obrigatório";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Obrigatório";
            }
            if (
              values.password &&
              values.confirmPassword &&
              values.password !== values.confirmPassword
            ) {
              errors.password = "As senha estão diferentes";
              errors.confirmPassword = "As senha estão diferentes";
            }
            if (!values.email) {
              errors.email = "Obrigatório";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Email inválido";
            }
            if (!values.number_cc) {
              errors.number_cc = "Obrigatório";
            }
            if (!values.name_cc) {
              errors.name_cc = "Obrigatório";
            }
            if (!values.validate_cc) {
              errors.validate_cc = "Obrigatório";
            }
            if (!values.security_cc) {
              errors.security_cc = "Obrigatório";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            values.plan_id = plan;
            signup(values);
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
                <ContainerTitle>
                  <Label
                    size={900}
                    display={"flex"}
                    color={"#26483f"}
                    marginRight={10}
                  >
                    ESCOLHA UM PLANO
                  </Label>
                  <Hr />
                </ContainerTitle>
                <ChoosePlan plan={plan} setPlan={setPlan} />
                <ContainerTitle>
                  <Label
                    size={900}
                    display={"flex"}
                    color={"#26483f"}
                    marginRight={10}
                  >
                    DADOS PESSOAIS
                  </Label>
                  <Hr />
                </ContainerTitle>
                <ContainerForm>
                  <InlineInputs>
                    <div>
                      <Label
                        htmlFor={45}
                        size={500}
                        display="block"
                        marginBottom={3}
                        marginTop={15}
                      >
                        Nome
                      </Label>
                      <Input
                        height={45}
                        name="name"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Seu Nome"
                        autoComplete={"off"}
                        paddingLeft={5}
                      />
                      <MessageError>
                        {errors.name && touched.name && errors.name}
                      </MessageError>
                    </div>
                    <div>
                      <Label
                        htmlFor={45}
                        size={500}
                        display="block"
                        marginBottom={3}
                        marginTop={15}
                      >
                        E-mail
                      </Label>
                      <Input
                        height={45}
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="E-mail"
                        autoComplete={"off"}
                        paddingLeft={5}
                      />
                      <MessageError>
                        {errors.email && touched.email && errors.email}
                      </MessageError>
                    </div>
                  </InlineInputs>
                  <InlineInputs>
                    <div>
                      <Label
                        htmlFor={45}
                        size={500}
                        display="block"
                        marginBottom={3}
                        marginTop={15}
                      >
                        Telefone
                      </Label>
                      <Input
                        height={45}
                        name="phone"
                        type="text"
                        paddingLeft={5}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        placeholder="Telefone com DDD"
                        autoComplete={"off"}
                      />
                      <MessageError>
                        {errors.phone && touched.phone && errors.phone}
                      </MessageError>
                    </div>
                    <div>
                      <Label
                        htmlFor={45}
                        size={500}
                        display="block"
                        marginBottom={3}
                        marginTop={15}
                      >
                        Data de Nascimento
                      </Label>
                      <Input
                        height={45}
                        name="birthday"
                        type="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.birthday}
                        paddingLeft={5}
                        placeholder="Data de Nascimento"
                        autoComplete={"off"}
                      />
                      <MessageError>
                        {errors.birthday && touched.birthday && errors.birthday}
                      </MessageError>
                    </div>
                  </InlineInputs>
                  <InlineInputs>
                    <div>
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
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Senha"
                        autoComplete={"off"}
                        paddingLeft={5}
                      />
                      <MessageError>
                        {errors.password && touched.password && errors.password}
                      </MessageError>
                    </div>
                    <div>
                      <Label
                        htmlFor={45}
                        size={500}
                        display="block"
                        marginBottom={3}
                        marginTop={15}
                      >
                        Confirmar Senha
                      </Label>
                      <Input
                        height={45}
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        placeholder="Confirmar Senha"
                        autoComplete={"off"}
                        paddingLeft={5}
                      />
                      <MessageError>
                        {errors.confirmPassword &&
                          touched.confirmPassword &&
                          errors.confirmPassword}
                      </MessageError>
                    </div>
                  </InlineInputs>
                </ContainerForm>
                <ContainerTitle>
                  <Label
                    size={900}
                    display={"flex"}
                    color={"#26483f"}
                    marginRight={10}
                  >
                    FORMA DE PAGAMENTO
                  </Label>
                  <Hr />
                </ContainerTitle>
                <ContainerForm>
                  <InlineInputs>
                    <div>
                      <Label
                        htmlFor={45}
                        size={500}
                        display="block"
                        marginBottom={3}
                        marginTop={15}
                      >
                        Número do Cartão
                      </Label>
                      <Input
                        height={45}
                        name="number_cc"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.number_cc}
                        placeholder="Número do Cartão"
                        autoComplete={"off"}
                      />
                      <MessageError>
                        {errors.number_cc && touched.name && errors.number_cc}
                      </MessageError>
                    </div>
                    <div>
                      <Label
                        htmlFor={45}
                        size={500}
                        display="block"
                        marginBottom={3}
                        marginTop={15}
                      >
                        Nome Impresso no Cartão
                      </Label>
                      <Input
                        height={45}
                        name="name_cc"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name_cc}
                        placeholder="Nome impresso no cartão"
                        autoComplete={"off"}
                      />
                      <MessageError>
                        {errors.name_cc && touched.name_cc && errors.name_cc}
                      </MessageError>
                    </div>
                  </InlineInputs>
                  <InlineInputs>
                    <div>
                      <Label
                        htmlFor={45}
                        size={500}
                        display="block"
                        marginBottom={3}
                        marginTop={15}
                      >
                        Validade
                      </Label>
                      <Input
                        height={45}
                        name="validate_cc"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.validate_cc}
                        placeholder="mm/aaaa"
                        autoComplete={"off"}
                      />
                      <MessageError>
                        {errors.name_cc && touched.name_cc && errors.name_cc}
                      </MessageError>
                    </div>
                    <div>
                      <Label
                        htmlFor={45}
                        size={500}
                        display="block"
                        marginBottom={3}
                        marginTop={15}
                      >
                        CVV
                      </Label>
                      <Input
                        height={45}
                        name="security_cc"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.security_cc}
                        placeholder="Código de segurança do cartão"
                        autoComplete={"off"}
                      />
                      <MessageError>
                        {errors.name_cc && touched.name_cc && errors.name_cc}
                      </MessageError>
                    </div>
                  </InlineInputs>
                  {/* 
                    // todo
                    <InlineInputs>
                      <div>
                        <Label
                          htmlFor={45}
                          size={500}
                          display="block"
                          marginBottom={3}
                          marginTop={15}
                        >
                          Número de Parcelas
                        </Label>
                        <Input
                          height={45}
                          name="plots_cc"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.plots_cc}
                          placeholder="Número de Parcelas"
                          autoComplete={"off"}
                        />
                        <MessageError>
                          {errors.name_cc && touched.name_cc && errors.name_cc}
                        </MessageError>
                      </div>
                    </InlineInputs> */}
                </ContainerForm>
              </ContentForm>
              <Button type="submit" disabled={isSubmitting} loading={isLoading}>
                <LabelButton>
                  {isLoading ? "CRIANDO" : "CRIAR CONTA"}
                </LabelButton>
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  flex: 1;
  background: #f58220;
  justify-content: center;
  padding: 2em 0 2em 0;
`;

const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  height: 100%;
  margin-bottom: 40px;
`;

const InlineInputs = styled.div`
  padding: 0.5em 2em 0em 0.5em;
  max-height: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 1em 1em 0em 1em;
    margin-top: 1em;
  }

  input {
    padding-left: 5px;
  }
`;

const Box = styled.div`
  display: flex;
  border-radius: 6px;
  background: #f7fafc;
  transition-delay: 0.5s;
  box-shadow: 0 0 40px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  flex-direction: column;
  max-width: 1200px;
  margin: 3em auto;
  justify-content: center;
`;

const ContainerTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Hr = styled.div`
  color: #000;
  border-top: 1px solid #c9c9c9;
  width: 100%;
  display: flex;
  flex: 1;
`;

const HeaderLogo = styled.img`
  width: auto;
  height: 75px;
  display: inline-block;
  margin: 0 0 11px;
  vertical-align: middle;
  -webkit-transition: margin-top 0.4s;
  transition: margin-top 0.4s;
  margin: 10px 0px 0px 0px;
`;

const PersonalRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
  margin: 20px 0 40px 3em;
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;
`;

const ColumnRight = styled(ColumnLeft)``;

const PaymentRow = styled(PersonalRow)``;

const ContentForm = styled.div`
  padding: 20px 40px 20px 40px;
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    padding: 1em;
  }
`;

const Input = styled.input`
  margin-top: 5px;
  padding: 0 14px;
  font-size: 1em;
  right: 0;
  height: 45px;
  width: 100%;
  /* max-width: 400px; */
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

const MessageError = styled.span`
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  color: ${props => props.theme.color.red};
  font-size: 1em;
`;

const ContainerInputs = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  label:first-child {
    width: 70px;
    input {
      width: 70px;
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  background-color: ${theme.color.primary};
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
  padding: 1em 1em 1em 1em;
  a {
    font-size: 17px;
  }
`;
