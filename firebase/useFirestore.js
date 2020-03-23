import { useContext, useEffect } from "react";
import { FirebaseContext } from "./FirebaseContext";

export default function useFirestore(fn, dep) {
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (!firebase) {
      return;
    }
    return fn(firebase.firestore());
  }, [fn, firebase, dep]);
}
