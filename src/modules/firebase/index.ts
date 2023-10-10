import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, User } from 'firebase/auth'
import { FirebaseApp } from 'firebase/app'

const env = import.meta.env
const firebaseConfig = {
  apiKey: env.VITE_apiKey,
  authDomain: env.VITE_authDomain,
  databaseURL: env.VITE_databaseURL,
  projectId: env.VITE_projectId,
  storageBucket: env.VITE_storageBucket,
  messagingSenderId: env.VITE_messagingSenderId,
  appId: env.VITE_appId,
  measurementId: env.VITE_measurementId,
}
class FirebaseAdapter {
  app: FirebaseApp | undefined

  appCheck: any

  firestore: any

  auth: any

  storage: any

  analytics: any

  init = async () => {
    if (this.firestore) return Promise.reject(new Error('Firebase not initialized'))

    return new Promise((resolve) => {
      this.initFirestore(resolve)
    })
  }

  initFirestore = async (resolve: (user: User) => void) => {
    try {
      this.app = initializeApp(firebaseConfig)
      this.auth = getAuth(this.app)
      this.appCheck = initializeAppCheck(this.app, {
        provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_appChecKey),
        isTokenAutoRefreshEnabled: true,
      })

      this.auth.onAuthStateChanged((fbUser: User) => {
        if (!fbUser || !this.app) return false

        this.storage = getStorage(this.app)
        this.analytics = getAnalytics(this.app)
        this.firestore = getFirestore(this.app)

        setTimeout(() => resolve(fbUser), 50)
      })
    } catch (error: any) {
      return error
    }
  }
}

const firebaseAdapter = new FirebaseAdapter()

export default firebaseAdapter
