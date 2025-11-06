import { auth } from "../firebase/config.js"; //.js쓰는 이유?
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";

// console.log(auth);

// 1) 사용자 정보 등록 (회원가입) (createUserWithEmailAndPassword)
export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  //userCredential : 인증 함수 (가입, 로그인 등)를 실행했을때 반환 객체 - 인증정보, user(사용자 계정 정보)
  const user = userCredential.user;

  console.log("회원가입 성공:", user.uid); //사용자의 고유 ID (UID)
  console.log("사용자 이메일:", user.email);
  console.log("사용자 이름:", user.displayName);
  console.log("사용자 프로필 url", user.photoURL);

  return user;
};

// 2)사용자 정보 조회 (로그인) (signInWithEmailAndPassword)
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  console.log("로그인 성공:", user.uid);
};

// 3) 로그아웃 (signOut)
export const logout = async () => {
  //현재 로그인된 사용자 정보 확인 (auth.currentUser) == user객체{uid, email, displayName, ..}
  console.log("현재 로그인 되어있는 사용자 UID:", auth.currentUser.uid);
  console.log("현재 로그인 되어있는 사용자 email:", auth.currentUser.email);

  //로그아웃
  await signOut(auth);
  console.log("로그아웃 성공");
  console.log("현재 로그인 되어있는 사용자:", auth.currentUser);
};

// 4) 인증상태 변경감지 (onAuthStateChanged)
export const checkAuthState = () => {
  //리스너 함수 : 인증상태가 변경될때 마다 자동으로 되는 함수
  // onAuthStateChanged(auth, 리스너함수)
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("***auth 상태 변경됨***");
    if (currentUser) {
      //로그인이 됨 (인증된 사용자 있음)
      console.log("현재 로그인 되어있는 사용자:", currentUser.uid);
    } else {
      //로그아웃됨 (인증 정보 사라짐)
      console.log("로그인 된 사용자가 없습니다.");
    }
  });
};

// 5) 사용자 정보 삭제 (회원 탈퇴) (deleteUser)
export const deleteAccount = async () => {
  await deleteUser(auth.currentUser);
  console.log("사용자 계정이 삭제되었습니다");
};

//테스트
// await login("test01@example.com", "password123"); //로그인 요청
// await deleteAccount();

/*
checkAuthState();
await login("test01@example.com", "password123"); //로그인 요청
//로그인 동작하기전에 logut함수 호출이 될수도 있음
//로그인 요청 코드가 다 실행된 다음에 logout함수 호출이 실행되게
await logout(); //로그인
*/
// signUp("test01@example.com", "password123"); //사용자 정보 등록
