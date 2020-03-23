import React from "react";
import firebaseConfig from "./firebase/firebaseConfig";
import FirebaseWrap from "./firebase/FirebaseWrap";

const root = ({ element, props }) => {
  return (
    <FirebaseWrap {...props} config={firebaseConfig}>
      {element}
    </FirebaseWrap>
  );
};

export default root;
