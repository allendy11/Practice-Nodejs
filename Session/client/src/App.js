import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserInput({
      ...userInput,
      [name]: value,
    });
  };
  const handleClick = (e) => {
    const id = e.target.id;

    if (id === "btn-get") {
      try {
        axios({
          method: "GET",
          url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:4000"
              : "https://localhost:4000",
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }).then((res) => {
          console.log(res.data);
        });
      } catch (err) {}
    } else if (id === "btn-login") {
      try {
        axios({
          method: "POST",
          url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:4000/user/login"
              : "https://localhost:4000/user/login",
          data: {
            username: userInput.username,
            password: userInput.password,
          },
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }).then((res) => {
          if (res.status === 200) {
            setIsLogin(true);
            console.log(res.data);
          }
        });
      } catch (err) {
        console.error(err);
      }
    } else if (id === "btn-logout") {
      try {
        axios({
          method: "GET",
          url: "http://localhost:4000/user/logout",
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }).then((res) => {
          if (res.status === 200) {
            setIsLogin(false);
          }
        });
      } catch (err) {
        console.error(err);
      }
    } else if (id === "btn-validate") {
      try {
        axios({
          method: "GET",
          url: "http://localhost:4000/user/validate",
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }).then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setIsLogin(true);
          }
        });
      } catch (err) {
        setIsLogin(false);
        console.error(err);
      }
    }
  };

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "http://localhost:4000/user/validate",
  //     headers: {
  //       "Content-Type": "application/json",
  //       withCredentials: true,
  //     },
  //   }).then((res) => {
  //     console.log(res.status);
  //     console.log(res.data);
  //   });
  // }, []);
  return (
    <div className="App">
      <header className="App-header">
        {isLogin ? (
          <div>
            <div>
              <div id="btn-validate" onClick={(e) => handleClick(e)}>
                Validate
              </div>
              <button id="btn-logout" onClick={(e) => handleClick(e)}>
                logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <span
                id="btn-get"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                GET
              </span>
            </div>
            <div>
              <label htmlFor="">username</label>
              <input
                name="username"
                type="text"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div>
              <label htmlFor="">password</label>
              <input
                name="password"
                type="text"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div>
              <button
                id="btn-login"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
