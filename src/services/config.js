import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { destroyAuth, setAuth } from "../features/slice/authSlice";
import { baseUrl } from "../variables";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
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
      "/refresh-token",
      api,
      extraOptions
    );

    if (refreshTokenRes.data) {
      api.dispatch(setAuth({ ...refreshTokenRes.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(destroyAuth());
    }
  }

  return result;
};

export { customQuery };
