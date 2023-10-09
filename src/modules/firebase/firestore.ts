import firebaseAdapter from '.'
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
  query,
  getDocs,
  QueryFieldFilterConstraint,
  Query,
} from 'firebase/firestore'

class Firestore {
  private collection: string

  constructor(collection: string) {
    this.collection = collection
  }

  getDocRef(id: string) {
    return doc(firebaseAdapter.firestore, this.collection, id)
  }

  async setDoc(id: string, docData: object) {
    const docRef = this.getDocRef(id)

    await setDoc(docRef, docData)
  }

  async getDoc(id: string) {
    const docRef = this.getDocRef(id)

    await getDoc(docRef)
  }

  async getDocSnapshot(id: string, callback: () => void) {
    const docRef = this.getDocRef(id)

    const unsub = onSnapshot(docRef, callback)

    return unsub
  }

  getCollectionRef() {
    return collection(firebaseAdapter.firestore, this.collection)
  }

  getQuery(...wheres: QueryFieldFilterConstraint[]) {
    if (wheres) return query(this.getCollectionRef(), ...wheres)

    return query(this.getCollectionRef())
  }

  async queryDocs(q: Query) {
    const docs = await getDocs(q)

    return docs
  }

  async querySnapshot(q: Query, callback: () => void) {
    const unsub = onSnapshot(q, callback)

    return unsub
  }
}

export default Firestore
