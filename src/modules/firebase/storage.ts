import firebaseAdapter from '.'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export class Storage {
  getFileRef(shortPath: string) {
    return ref(firebaseAdapter.storage, shortPath)
  }

  async uploadFile(shortPath: string, file: Blob | File) {
    const fileRef = this.getFileRef(shortPath)

    const metadata = {
      contentType: file.type,
    }

    await uploadBytes(fileRef, file, metadata)

    console.log('Uploaded a blob or file!')
  }

  getDownloadURL = async (shortPath: string) => {
    const fileRef = this.getFileRef(shortPath)

    const url = await getDownloadURL(fileRef)

    return url
  }

  getFile = async (shortPath: string) => {
    const url = await this.getDownloadURL(shortPath)

    const res = await fetch(url)
    const blob = await res.blob()

    return blob
  }
}

export default Storage
