import Firestore from '@/modules/firebase/firestore'
import moment from 'moment'

export type MessageType = {
  message: string
  time: number
  owner: string
  type: string
  shortPath?: string
}

class FirestoreDoc {
  private doc: string

  private owner: string

  private messages: MessageType[] = []

  private firestore: Firestore

  constructor(collection: string, doc: string, owner: string) {
    this.firestore = new Firestore(collection)
    this.doc = doc
    this.owner = owner
  }

  async sendMessage(message: string, file?: { shortPath?: string; type: string }) {
    return this.firestore.setDoc(this.doc, {
      messages: [
        ...this.messages,
        {
          time: +moment(),
          owner: this.owner,
          shortPath: file?.shortPath || '',
          type: file?.type ? file.type : 'text',
          message: message,
        },
      ],
    })
  }

  async sendAudio(shortPath: string) {
    return this.firestore.setDoc(this.doc, {
      messages: [
        ...this.messages,
        {
          time: +moment(),
          owner: this.owner,
          shortPath: shortPath,
          type: 'audio',
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
