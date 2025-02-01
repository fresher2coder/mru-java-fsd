import React from "react";

//if-else
// function UserDashboard(props) {
//   const { isLoggedIn, username } = props;

//   if (isLoggedIn)
//     return (
//       <>
//         <h1>Hi, Welcome {username} </h1>
//       </>
//     );
//   else
//     return (
//       <>
//         <h1>Please Login</h1>
//       </>
//     );
// }

//Element variable
// function UserDashboard(props) {
//   const { isLoggedIn, username } = props;
//   let greetMessage;
//   if (isLoggedIn) greetMessage = <h1>Hi, Welcome {username}</h1>;
//   else greetMessage = <h2>Please Login</h2>;

//   return <>{greetMessage}</>;
// }

//Ternary Operator
// function UserDashboard(props) {
//   const { isLoggedIn, username } = props;

//   return (
//     <>
//       <h1>{isLoggedIn ? `Welcome ${username}` : "Please Login"}</h1>
//     </>
//   );
// }

//short-circuit
function UserDashboard(props) {
  const { isLoggedIn, username } = props;

  return (
    <>
      {isLoggedIn && <h1>Hi Welcome {username}</h1>}
      {!isLoggedIn && <h1>Please Login</h1>}
    </>
  );
}

export default UserDashboard;
