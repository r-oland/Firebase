import firebaseConfig from "./config";

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      app.initializeApp(firebaseConfig);
      this.increment1 = app.firestore.FieldValue.increment(1);
      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  increment1 = this.increment;

  async login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async register({ email, password }) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async createUserDoc(data) {
    const createUserDoc = this.functions.httpsCallable("createUserDoc");
    return createUserDoc(data);
  }

  getUserProfile({ userId, callback }) {
    return this.db
      .collection("publicProfiles")
      .where("userId", "==", userId)
      .limit(1)
      .onSnapshot(callback);
  }

  getMessages(callback) {
    return this.db
      .collection("comments")
      .orderBy("date", "desc")
      .onSnapshot(callback);
  }

  deleteMessage(doc) {
    return this.db
      .collection("comments")
      .doc(doc)
      .delete()
      .then((r) => {
        console.log(`${doc} deleted`);
      });
  }

  async addComment(data, id) {
    const snapshot = await this.db
      .collection("publicProfiles")
      .where("userId", "==", id)
      .limit(1)
      .get();

    this.db.collection("comments").add({
      name: snapshot.docs[0].id,
      message: data.message,
      uid: id,
      date: new Date(),
      votes: 0,
    });
  }

  async addArtist({ name, id, genre, stillActive, picture }) {
    return this.db.collection("artists").doc(id).set({
      name: name,
      genre: genre,
      stillActive: stillActive,
      picture: picture,
    });
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  } else if (firebaseInstance) {
    return firebaseInstance;
  } else {
    return null;
  }
}

export default getFirebaseInstance;
