import { useEffect, useState } from "react";
import getFirebaseInstance from "./firebase";
import loadFirebaseDependencies from "./loadFirebaseDependencies";

function useFirebase() {
  const [user, setUser] = useState(null);
  const [firebase, setFirebase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    let publicProfileUnsubscribe;

    loadFirebaseDependencies.then((app) => {
      const firebaseInstance = getFirebaseInstance(app);
      setFirebase(firebaseInstance);

      unsubscribe = firebaseInstance.auth.onAuthStateChanged((userResult) => {
        if (userResult) {
          publicProfileUnsubscribe = firebaseInstance.getUserProfile({
            userId: userResult.uid,
            callback: (r) => {
              firebaseInstance.auth.currentUser
                .getIdTokenResult(true)
                .then((token) => {
                  setUser({
                    ...userResult,
                    isAdmin: token.claims.admin,
                    username: !r.empty && r.docs[0].id,
                  });
                });

              setUser({ ...userResult, username: !r.empty && r.docs[0].id });
            },
          });
        } else {
          setUser(null);
        }

        setLoading(false);
      });
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }

      if (publicProfileUnsubscribe) {
        publicProfileUnsubscribe();
      }
    };
  }, []);

  return { user, firebase, loading };
}

export default useFirebase;
