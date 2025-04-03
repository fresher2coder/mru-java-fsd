const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, user: action.payload }; // Fix here

    case "LOGOUT":
      return { isAuthenticated: false, user: null }; // Fix here

    default:
      return state;
  }
};

export default authReducer;
