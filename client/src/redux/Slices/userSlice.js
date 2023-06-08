import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loggedIn: false,
};

export const login = createAsyncThunk(
  "userSlice/editProfile",
  async () => {
    // const res = await API(`/editprofile`, "PATCH", userData);
    // console.log(res);
    // return res;
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = {};
      state.loggedIn = false;

    },
    setCoords(state, action) {
      state.coords = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.error.message;
    });

   
  },
});

export const UserActions = userSlice.actions;
export default userSlice.reducer;
