const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, user: { username: action.payload } };

    case "LOGOUT":
      return { isAuthenticated: false, user: null };

    default:
      return state;
  }
};

export default authReducer;
