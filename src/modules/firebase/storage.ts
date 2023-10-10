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
}

export default Storage
