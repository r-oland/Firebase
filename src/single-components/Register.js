// Components==============
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { FirebaseContext } from "../firebase/index";
import { L } from "../style/Mixins";
import { SimpleButton } from "./SimpleButton";
import SimpleModal from "./SimpleModal/SimpleModal";
// =========================

const Btn = styled(L)`
  color: white;
  justify-self: flex-end;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.bold};
  &:hover {
    color: ${({ theme: { primary } }) => primary.s4};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  input {
    border: none;
    box-shadow: ${({ theme: { shadow } }) => shadow.small};
    padding: ${({ theme: { spacing } }) => `${spacing.s4} ${spacing.s4}`};
    margin-top: ${({ theme: { spacing } }) => spacing.s6};
  }

  button {
    margin-top: ${({ theme: { spacing } }) => spacing.s5};
  }
`;

export default function Register({ modalIsOpen, setModalIsOpen }) {
  const [formValues, setformValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const { user, firebase } = useContext(FirebaseContext);

  const errorRef = useRef();

  const handleModalChange = () => {
    modalIsOpen === false ? setModalIsOpen(true) : setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordConf = formValues.password === formValues.confirmPassword;

    if (user === null && passwordConf) {
      firebase
        .register({
          email: formValues.email,
          password: formValues.password,
        })
        .then(() => {
          modalIsOpen && setModalIsOpen(false);
        })
        .then(() => {
          firebase.createUserDoc({ username: formValues.username });
        })
        .catch((error) => {
          errorRef.current.innerHTML = error;
        });
    } else {
      errorRef.current.innerHTML = "The passwords do not match";
    }
  };

  const handleInputChange = (e) => {
    e.persist();
    setformValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }));

    errorRef.current.innerHTML = "";
  };

  return (
    <>
      <SimpleModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        handleChange={handleModalChange}
      >
        <Form onSubmit={handleSubmit}>
          <p ref={errorRef}></p>

          <input
            value={formValues.username}
            type="name"
            name="username"
            placeholder="username"
            onChange={handleInputChange}
            required
          />
          <input
            value={formValues.email}
            type="email"
            name="email"
            placeholder="email"
            onChange={handleInputChange}
            required
          />
          <input
            value={formValues.password}
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInputChange}
            required
            minLength={6}
          />
          <input
            value={formValues.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            onChange={handleInputChange}
            required
            minLength={6}
          />
          <SimpleButton type="submit">Register</SimpleButton>
        </Form>
      </SimpleModal>
      <Btn as="button" onClick={handleModalChange}>
        {user === null ? "Register" : ""}
      </Btn>
    </>
  );
}
