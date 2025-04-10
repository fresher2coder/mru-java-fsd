import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/layout/Header";
import LeftSideBar from "./components/layout/LeftSideBar";
import Main from "./components/layout/Main";
import RightSideBar from "./components/layout/RightSideBar";
import Footer from "./components/layout/Footer";
import UserProfile from "./components/props/UserProfile";
import Container from "./components/props/Container";
import Counter from "./components/state/Counter";
import MultiCounter from "./components/state/MultiCounter";
import Parent from "./components/props/prop_as_method/Parent";
import UserDashboard from "./components/conditionalRendering/UserDashboard";
import ParentContainer from "./components/useEffect/ParentContainer";
import EmployeeTable from "./components/mapFilterReduce/EmployeeTable";
import Profile from "./components/formHandling/Profile";
import UsersAPI from "./components/apiFetch/UsersAPI";
import WeatherAPI from "./components/apiFetch/WeatherAPI";

function App() {
  return (
    <>
      {/* layout  */}
      {/* <Header />
      <div className="main-content">
        <LeftSideBar />
        <Main />
        <RightSideBar />
      </div>
      <Footer /> */}

      {/* props */}

      {/* <UserProfile
        name="Dineshkumar"
        age={34}
        isMarried={true}
        email="sendmail2dk@gmail.com"
        address="Chennai"
      />
      <UserProfile
        name="Divya Dineshkumar"
        age="30"
        email="dd@gmail.com"
        address="Chennai"
      />
      <UserProfile
        name="Darwin Divya Dinesh"
        age="3"
        email="ddd@gmail.com"
        address="Chennai"
      />

      <Container title="Dashboard">
        <h2>Welcome to Dashboard</h2>
        <p>User details will be displayed here.</p>
      </Container>

      <Container title="Settings">
        <h2>Change Settings</h2>
        <p>Change your preferences at ease</p>
      </Container> */}

      {/* state  */}
      {/* <Counter />
      <MultiCounter initialValue={1} incrementValue={1} />
      <MultiCounter initialValue={10} incrementValue={10} />
      <MultiCounter initialValue={100} incrementValue={100} /> */}

      {/* prop as method: child to parent*/}
      {/* <Parent /> */}

      {/* conditional rendering  */}
      {/* <UserDashboard isLoggedIn={true} userName="DK" /> */}

      {/* useEffect  */}
      {/* <ParentContainer /> */}

      {/* map filter reduce  */}
      {/* <EmployeeTable /> */}

      {/* form handling  */}
      {/* <Profile /> */}

      {/* user api fetch */}
      <UsersAPI />
      {/* <WeatherAPI /> */}
      <WeatherAPI />
    </>
  );
}

export default App;
