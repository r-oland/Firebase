// Components==============
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FirebaseContext } from "../firebase/index";
import Comment from "../single-components/Comment";
import { SimpleButton } from "../single-components/SimpleButton";
import { Container } from "../style/Mixins";
// =========================

const Wrapper = styled.div`
  margin: ${({ theme: { spacing } }) => `${spacing.s9} auto ${spacing.s7}`};
  width: 100%;
  max-width: 650px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  textarea {
    border: none;
    box-shadow: ${({ theme: { shadow } }) => shadow.small};
    padding: ${({ theme: { spacing } }) => `${spacing.s4} ${spacing.s4}`};
    margin-top: ${({ theme: { spacing } }) => spacing.s6};
    height: ${({ theme: { spacing } }) => spacing.s11};
  }

  button {
    margin-top: ${({ theme: { spacing } }) => spacing.s2};
  }
`;

export default function Comments() {
  const [formValue, setFormValue] = useState("");
  const { firebase, user } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      firebase.addComment({ message: formValue }, user.uid).catch((e) => {
        setFormValue(e.toString());
      });

      setFormValue("");
    } else {
      setFormValue("You have to be logged in");
    }
  };

  const handleInputChange = (e) => {
    e.persist();
    setFormValue(e.target.value);
  };

  return (
    <Wrapper>
      <Container>
        {firebase && <Comment firebase={firebase} user={user} />}
        <Form onSubmit={handleSubmit}>
          <textarea
            value={formValue}
            type="textarea"
            name="message"
            placeholder="message"
            onChange={handleInputChange}
            required
          />
          <SimpleButton type="submit">submit</SimpleButton>
        </Form>
      </Container>
    </Wrapper>
  );
}
