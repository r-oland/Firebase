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

export default function Login({ modalIsOpen, setModalIsOpen }) {
  const [formValues, setformValues] = useState({ email: "", password: "" });
  const { firebase, user } = useContext(FirebaseContext);
  const errorRef = useRef();

  const handleModalChange = () => {
    modalIsOpen === false ? setModalIsOpen(true) : setModalIsOpen(false);
  };

  const handleLogoutChange = () => {
    if (user === null) {
      modalIsOpen === false ? setModalIsOpen(true) : setModalIsOpen(false);
    }

    firebase.logout();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user === null) {
      firebase
        .login({
          email: formValues.email,
          password: formValues.password,
        })
        .then(() => {
          modalIsOpen && setModalIsOpen(false);
        })
        .catch((error) => {
          errorRef.current.innerHTML = error;
        });
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
          />
          <SimpleButton type="submit">login</SimpleButton>
        </Form>
      </SimpleModal>
      <Btn as="button" onClick={handleLogoutChange}>
        {user === null ? "Log in/" : "log out"}
      </Btn>
    </>
  );
}
