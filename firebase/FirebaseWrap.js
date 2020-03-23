// Components==============
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FirebaseContext } from "./FirebaseContext";
// =========================

export default function FirebaseWrap({ config, children }) {
  const [fB, setFb] = useState(null);

  useEffect(() => {
    if (!fB && typeof window !== "undefined") {
      firebase.initializeApp(config);
      setFb(firebase);
    }
  }, [fB, config]);

  return (
    <FirebaseContext.Provider value={fB}>{children}</FirebaseContext.Provider>
  );
}
