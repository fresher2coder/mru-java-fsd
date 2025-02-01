import React from "react";

//if-else
// function UserDashboard(props) {
//   const { isLoggedIn, userName } = props;

//   if (isLoggedIn)
//     return (
//       <>
//         <h1>HI! Welcome {userName}</h1>
//       </>
//     );
//   else
//     return (
//       <>
//         <h1>Please Log IN</h1>
//       </>
//     );
// }

//element-variable
// function UserDashboard(props) {
//   const { isLoggedIn, userName } = props;
//   let greetMessage;
//   if (isLoggedIn) greetMessage = <h2>HI! Welcome {userName}</h2>;
//   else greetMessage = <h3>Please Login</h3>;

//   return (
//     <>
//       <h1>React Project</h1>
//       {greetMessage}
//     </>
//   );
// }

//ternary operator
// function UserDashboard(props) {
//   const { isLoggedIn, userName } = props;

//   return (
//     <>
//       <h1>React Project</h1>
//       <h2>{isLoggedIn ? `Hi, Welcome ${userName}` : "Please Login"}</h2>
//     </>
//   );
// }

//short-circuit operator
function UserDashboard(props) {
  const { isLoggedIn, userName } = props;

  return (
    <>
      <h1>React Project</h1>
      {isLoggedIn && <h1>Hi, Welcome {userName}</h1>}
      {!isLoggedIn && <h1>Please Login</h1>}
    </>
  );
}

export default UserDashboard;
