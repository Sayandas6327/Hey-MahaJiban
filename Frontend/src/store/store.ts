import  {createSlice, configureStore} from '@reduxjs/toolkit';
const authSlice = createSlice({
    name:"auth",
    initialState:{user:{}  as any | null, isLoggedIn: false},
    reducers:{
        login(state, action){
            state.user = action.payload;
            state.isLoggedIn = true;
            // sessionStorage.setItem("token", action.payload);
            // sessionStorage.setItem("_Id", action.payload);
        },
        logout(state){
            state.user = null;
            state.isLoggedIn = false;
            // location.reload();
            // sessionStorage.removeItem("token");
            // sessionStorage.removeItem("_Id");
        }
    }
});

export const authActions = authSlice.actions;
export const store = configureStore({reducer: authSlice.reducer});