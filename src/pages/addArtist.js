// Components==============
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { FirebaseContext } from "../firebase/index";
import Head from "../global-components/Layout/Head";
import { SimpleButton } from "../single-components/SimpleButton";
// =========================

const Form = styled.form`
  max-width: 300px;
  margin: 0 auto;
  margin-top: ${({ theme: { spacing } }) => spacing.s11};
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

export default function AddArtist({ data }) {
  const [checked, setChecked] = useState(true);
  const fileRef = useRef();

  const [fieldValues, setFieldValues] = useState({
    id: "",
    name: "",
    genre: "",
  });

  const { firebase, user } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase.storage
      .ref()
      .child(`artists/${fieldValues.id}`)
      .put(fileRef.current.files[0])
      .then(() => {
        firebase.storage
          .ref()
          .child(`artists/${fieldValues.id}`)
          .getDownloadURL()
          .then((url) => {
            firebase.addArtist({
              id: fieldValues.id,
              name: fieldValues.name,
              genre: fieldValues.genre,
              stillActive: checked,
              picture: url,
            });
          });
      })
      .then(() => {
        setFieldValues({
          id: "",
          name: "",
          genre: "",
          stillActive: false,
        });

        fileRef.current.value = null;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Head
        title="PageTitle"
        description="Page description goes here"
        keywords="content"
      />
      {user && user.isAdmin && (
        <Form onSubmit={handleSubmit}>
          <input
            required
            placeholder="id"
            value={fieldValues.id}
            onChange={(e) => {
              e.persist();
              setFieldValues({ ...fieldValues, id: e.target.value });
            }}
          />
          <input
            required
            placeholder="name"
            value={fieldValues.name}
            onChange={(e) => {
              e.persist();
              setFieldValues({ ...fieldValues, name: e.target.value });
            }}
          />
          <input
            required
            placeholder="genre"
            value={fieldValues.genre}
            onChange={(e) => {
              e.persist();
              setFieldValues({ ...fieldValues, genre: e.target.value });
            }}
          />
          <div>
            <span>still active</span>
            <input
              type="checkbox"
              onClick={(e) => {
                checked ? setChecked(false) : setChecked(true);
              }}
            />
          </div>
          <input type="file" required ref={fileRef} />
          <SimpleButton type="submit">Add artist</SimpleButton>
        </Form>
      )}
    </>
  );
}
