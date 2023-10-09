import Firestore from '@/modules/firebase/firestore'
import moment from 'moment'

export type MessageType = {
  message: string
  time: number
  right?: boolean
}

class FirestoreDoc {
  private doc: string

  private messages: MessageType[] = []

  private firestore: Firestore

  constructor(collection: string, doc: string) {
    this.firestore = new Firestore(collection)
    this.doc = doc
  }

  async sendMessage(message: string) {
    return this.firestore.setDoc(this.doc, {
      messages: [
        ...this.messages,
        {
          time: +moment(),
          message: message,
        },
      ],
    })
  }

  async getDocSnapshot(callback: (docs: any) => void) {
    const unsub = this.firestore.getDocSnapshot(this.doc, (docRef: any) => {
      this.messages = docRef.data()?.messages || []
      callback(this.messages)
    })

    return unsub
  }
}

export default FirestoreDoc
