import { db } from '../firebase/config'
import { collection, getDocs, addDoc, setDoc, deleteDoc, updateDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore'

// 사용자프로필 정보 CRUD 관련 서비스 

const USERS_COLLECTION_NAME = 'users';

/**
 * 사용자 프로필 등록
 * @param {string} uid - Authentication에 사용자 등록시 발급된 UID
 * @param {object} user - 사용자 정보 { email, name, address, gender }
 */
export const addUserProfile = async (uid, user) => {
 await setDoc(doc(db, USERS_COLLECTION_NAME, uid), {
    ...user,
    role: 'USER',
  });
}

/**
 * 사용자 프로필 조회
 * @param {string} uid - 사용자 UID
 * @returns {object} 사용자 정보 { id, email, name, address, gender, role }
 */
export const getUserProfile = async (uid) => {
  const docRef = await getDoc(doc(db, USERS_COLLECTION_NAME, uid));
  return {
    id: docRef.id,
    ...docRef.data(),
  };
}

/**
 * 사용자 프로필 삭제
 * @param {string} uid - 사용자 UID
 */
export const removeUserProfile = async (uid) => {
  await deleteDoc(doc(db, USERS_COLLECTION_NAME, uid));
}