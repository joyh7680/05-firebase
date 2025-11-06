import React from "react";
import { logout } from "../service/authService";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";

function UserProfile() {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const docsnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
      console.log(docsnapshot.data());
      setUserProfile(docsnapshot.data());
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  //auth.currentUser === Firebase Authentication의 User 객체 (UID, email, displayName, photoURL)
  return (
    <>
      <h2>사용자 프로필</h2>
      <p>이메일 : {auth.currentUser.email}</p>
      <p>UID : {auth.currentUser.uid}</p>
      <p>
        생성일 :
        {new Date(auth.currentUser.metadata.creationTime).toLocaleDateString()}
      </p>
      <p>
        마지막 로그인 :
        {new Date(
          auth.currentUser.metadata.lastSignInTime
        ).toLocaleDateString()}
      </p>

      {/* 이름, 주소, 성별, 권한 =? firestore */}
      {/* {!userProfile && ( */}
      <div>
        <p>이름 : {userProfile.name}</p>
        <p>주소 : {userProfile.address}</p>
        <p>성별 : {userProfile.gender}</p>
        <p>권한 : {userProfile.role}</p>
      </div>
      {/* )} */}

      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
}

export default UserProfile;
