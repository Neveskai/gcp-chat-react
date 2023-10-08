import user from '../user'
import firebaseAdapter from '.'
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'

class FirebaseAuth {
  authGoogleUser = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const fbUser = await signInWithPopup(firebaseAdapter.auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(fbUser)

      user.user = fbUser.user
      user.token = credential?.accessToken || ''

      return true
    } catch (error) {
      console.error(error)
    }
  }

  authGithubUser = async () => {
    const provider = new GithubAuthProvider()

    try {
      const fbUser = await signInWithPopup(firebaseAdapter.auth, provider)
      const credential = GithubAuthProvider.credentialFromResult(fbUser)

      user.user = fbUser.user
      user.token = credential?.accessToken || ''

      return true
    } catch (error) {
      console.error(error)
    }
  }

  createUserWithEmail = async (email: string, password: string) => {
    try {
      const fbUser = await createUserWithEmailAndPassword(firebaseAdapter.auth, email, password)

      user.user = fbUser.user
      user.token = 'password'

      return true
    } catch (error) {
      await this.authEmailAndPassword(email, password)

      return true
    }
  }

  authEmailAndPassword = async (email: string, password: string) => {
    try {
      const fbUser = await signInWithEmailAndPassword(firebaseAdapter.auth, email, password)

      user.user = fbUser.user
      user.token = 'password'

      return true
    } catch (error) {
      await sendPasswordResetEmail(firebaseAdapter.auth, email)

      return false
    }
  }

  logoutUser = async () => {
    user.clear()
    await signOut(firebaseAdapter.auth)

    return true
  }
}

export default FirebaseAuth
