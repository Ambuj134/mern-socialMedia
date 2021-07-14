export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
  //  payload identifies for us which person-
  // - we want to perform the action on.
});
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILUER",
  payload: error,
});

export const follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
