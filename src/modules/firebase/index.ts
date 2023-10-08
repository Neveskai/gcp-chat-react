import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { FirebaseStorage, getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, User } from 'firebase/auth'
import { FirebaseApp } from 'firebase/app'

class FirebaseAdapter {
  app: FirebaseApp | undefined

  db: any

  auth: any

  storage: FirebaseStorage | undefined

  analytics: any

  init = async () => {
    if (this.db) return Promise.reject(new Error('Firebase not initialized'))

    return new Promise((resolve) => {
      this.initFirestore(resolve)
    })
  }

  initFirestore = async (resolve: (user: User) => void) => {
    const firebaseConfig = {
      apiKey: await import.meta.env.VITE_apiKey,
      authDomain: await import.meta.env.VITE_authDomain,
      databaseURL: await import.meta.env.VITE_databaseURL,
      projectId: await import.meta.env.VITE_projectId,
      storageBucket: await import.meta.env.VITE_storageBucket,
      messagingSenderId: await import.meta.env.VITE_messagingSenderId,
      appId: await import.meta.env.VITE_appId,
      measurementId: await import.meta.env.VITE_measurementId,
    }

    try {
      this.app = initializeApp(firebaseConfig)
      this.auth = getAuth(this.app)

      this.auth.onAuthStateChanged((fbUser: User) => {
        if (!fbUser || !this.app) return false

        this.analytics = getAnalytics(this.app)
        this.storage = getStorage()
        this.db = getFirestore(this.app)

        setTimeout(() => resolve(fbUser), 50)
      })
    } catch (error: any) {
      return error
    }
  }
}

const firebaseAdapter = new FirebaseAdapter()

export default firebaseAdapter
