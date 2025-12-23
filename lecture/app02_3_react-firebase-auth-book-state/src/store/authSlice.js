import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { addUserProfile, getUserProfile } from '../services/userService';

// 회원관련 관리할 상태
const initialState = {
  userProfile: null,    // Firebase Firestore의 사용자 프로필 객체
  loading: false,       // 인증 상태 변경시 로딩 상태 표시
  error: '',            // 인증 상태 변경시 발생된 에러 메시지
}

// 상태가 변경되는 경우 : 로그인, 로그아웃, 회원가입 .. => 비동기로 진행됨 

/*
  ## createAsyncThunk ## 
  1. Redux Toolkit에서 비동기 작업(예: API 호출 등)을 처리하기 위한 유틸리티 함수입니다.
  2. 비동기 액션을 쉽게 생성하고, 해당 작업의 진행 상태(pending/fulfilled/rejected)를 자동으로 관리합니다.
  3. extraReducers에서 각 상태별 상태업데이터를 간결하게 할 수 있도록 도와줍니다.
  4. 작성 방법 
    const 비동기Thunk명 = createAsyncThunk(
      '슬라이스명/액션이름',           // ----------- 액션 타입 문자열 (prefix/actionName)                      
      async (payload, thunkAPI) => {   // ----------- payload: 전달받을 값, thunkAPI : dispatch, getState 등 제공
        try {
          // 비동기 작업 수행 (예: API 호출)
          const response = await someAsyncFunction(payload);
          return response.data; // 성공시 반환값이 action.payload로 전달됨 (fulfilled 상태)
        } catch (error) {
          // 실패 시 thunkAPI.rejectWithValue를 사용하여 error 전달 가능
          return thunkAPI.rejectWithValue(error.message);                // (rejected 상태)
        }
    )
  5. createAsyncThunk() 함수는 3개의 액션 타입을 자동으로 생성합니다.
    - prefix/actionName/pending
    - prefix/actionName/fulfilled
    - prefix/actionName/rejected
  6. extraReducers에서 각 액션 타입별 상태업데이트를 간결하게 할 수 있도록 도와줍니다.
  7. 생성한 thunk 함수는 dispatch(비동기Thunk명())로 실행할 수 있습니다.
*/

// 1) 로그인 비동기 액션 
export const login = createAsyncThunk(
  'auth/login',
  async(payload, { rejectWithValue }) => { // payload == { email: string, password: string }

    try {
      // - 이메일, 비밀번호로 로그인 요청 (성공시 인증된 사용자 객체 반환)
      const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password);
      const user = userCredential.user;  
      // - 사용자 프로필 조회 요청 (성공시 사용자 프로필 객체 반환)
      const userProfile = await getUserProfile(user.uid);
      // - userProfile 객체를 상태로 저장시키기 위해 반환 (fulfilled 상태일때 사용될 데이터)
      return { userProfile };

    } catch (error) {
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      switch(error.code) {
        case 'auth/invalid-email':
          errorMessage = '올바른 이메일 형식이 아닙니다.';
          break;
        case 'auth/invalid-credential':
          errorMessage = '등록된 계정이 아닙니다.';
          break;
        case 'auth/too-many-requests':
          errorMessage = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
          break;
      }
      // - 각 상황별 에러 메시지를 rejectWithValue() 함수를 통해 반환 (rejected 상태일때 사용될 데이터)
      return rejectWithValue(errorMessage);
    }
  }
)

// 2) 로그아웃 비동기 액션 
export const logout = createAsyncThunk(
  'auth/logout',
  async(_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return '로그아웃 완료';
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

// 3) 회원가입 비동기 액션 
export const signup = createAsyncThunk(
  'auth/signup',
  async(payload, { rejectWithValue }) => { // payload == { email: string, password: string, name?: string, address?: string, gender: string }
    try {
      // - 이메일, 비밀번호로 회원가입 요청 (Firebase Authentication에 저장, 성공시 인증된 사용자 객체 반환)
      const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
      const user = userCredential.user;
      // - 사용자 프로필 정보 저장 요청 (Firebase Firestore에 저장)
      await addUserProfile(user.uid, {
        email: payload.email,
        name: payload.name || '',
        address: payload.address || '',
        gender: payload.gender,
      });
      // - 사용자 프로필 조회 요청 (성공시 사용자 프로필 객체 반환)
      const userProfile = await getUserProfile(user.uid);
      // - userProfile 객체를 상태로 저장시키기 위해 반환 (fulfilled 상태일때 사용될 데이터)
      return { userProfile };

    } catch (error) {
      let errorMessage = '회원가입 중 오류가 발생했습니다.';
      switch(error.code) {
        case 'auth/invalid-email':
          errorMessage = '올바른 이메일 형식이 아닙니다.';
          break;
        case 'auth/weak-password':
          errorMessage = '비밀번호가 너무 약합니다.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = '이미 사용중인 이메일입니다.';
          break;
      }
      // - 각 상황별 에러 메시지를 rejectWithValue() 함수를 통해 반환 (rejected 상태일때 사용될 데이터)
      return rejectWithValue(errorMessage);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers : 동기 액션 처리 
  reducers: {
    // 에러 메시지 초기화 액션 : 인증 상태 변경 중 발생한 에러 메시지를 초기화 시키기 위한 액션
    clearError: (state) => {
      state.error = '';
    },
    // 인증 상태 감지하여 사용자 프로필 초기상태로 설정하는 액션 
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    }
  },
  // extraReducers : 비동기 액션 처리 
  extraReducers: (builder) => { // builder 패턴을 이용한 액션 타입 처리
    // 1) login 비동기 액션 처리  (pending, fulfilled, rejected)
    builder
       //  - 로그인 요청 시작 (pending 상태)
      .addCase(login.pending, (state) => {
        state.loading = true; // 로딩중 상태 활성화
        state.error = '';     // 이전 에러 메시지 초기화
      })
      //   - 로그인 요청 성공 (fulfilled 상태) : action.payload에는 createAsyncThunk() 함수에서 반환된 데이터가 담겨있음  
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false; 
        state.userProfile = action.payload.userProfile;
      })
      //   - 로그인 요청 실패 (rejected 상태) : action.payload에는 rejectWithValue() 함수로 전달된 메세지가 담겨있음  
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 2) logout 비동기 액션 처리  (fulfilled 만 진행)
    builder
      //  - 로그아웃 요청 성공 (fulfilled 상태) 
      .addCase(logout.fulfilled, (state) => {
        state.userProfile = null;
        state.error = ''; // 로그아웃 시 에러도 초기화
      });
    
    // 3) signup 비동기 액션 처리  (pending, fulfilled, rejected)
    builder
      //  - 회원가입 요청 시작 (pending 상태)
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      //  - 회원가입 요청 성공 (fulfilled 상태)
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.userProfile;
      })
      //  - 회원가입 요청 실패 (rejected 상태)
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// clearError, setUserProfile 액션 export
export const { clearError, setUserProfile } = authSlice.actions;

export default authSlice.reducer;