import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { destroyAuth, setAuth, setUser } from "../features/slice/authSlice";
import { baseUrl } from "../variables";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    let token = localStorage.getItem("at") ?? getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const customQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    console.log("Sending Refresh Token");
    const refreshTokenRes = await baseQuery(
      "/users/refresh-token",
      api,
      extraOptions
    );
    if (refreshTokenRes.data) {
      api.dispatch(setAuth({ ...refreshTokenRes.data }));
      api.dispatch(setUser({ user: { ...refreshTokenRes.data.user } }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(destroyAuth());
    }
  }

  return result;
};

export { customQuery };
