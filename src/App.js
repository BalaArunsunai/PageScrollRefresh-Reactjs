import React, { useState, useRef, useCallback } from "react";
import loader from "./loader.gif";
import "./App.css";
import useCustomerList from "./Components/useCustomerList";
import Modal from "./Components/Modal/Modal";
import { editCustomerApi } from "./api";
function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [modalToggle, setModalToggle] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState();

  // Custom Hook
  const { loading, customers, error, hasMore } = useCustomerList(pageNumber);

  // useRef to identify the last element and useCallback to get updated every time on last element
  const observer = useRef();
  const lastCustomerElementRef = useCallback(
    (node) => {
      console.log(node);
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // New items will be loaded from next page if it reaches last line and has more data in api
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function cardClick(item) {
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setEmail(item.email);
    setModalToggle(true);
    setUserId(item.id);
  }

  function saveChanges() {
    setModalToggle(false);
    let payload = {
      email: email,
      first_name: firstName,
      last_name: lastName,
    };
    editCustomerApi(userId, payload)
      .then((resp) => {
        alert("Updated Successfully!!");
      })
      .catch((error) => alert(error));
  }

  return (
    <>
      <div className="row">
        {customers.map((item, index) => {
          if (customers.length === index + 1) {
            return (
              <div className="column" ref={lastCustomerElementRef} key={index}>
                <div className="card" onClick={() => cardClick(item)}>
                  <img src={item.avatar} alt="profile" className="avatar" />
                  <h3>{item.first_name}</h3>
                  <p>{item.last_name}</p>
                  <p>{item.email}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="column" key={index}>
                <div className="card" onClick={() => cardClick(item)}>
                  <img src={item.avatar} alt="profile" className="avatar" />
                  <h3>{item.first_name}</h3>
                  <p>{item.last_name}</p>
                  <p>{item.email}</p>
                </div>
              </div>
            );
          }
        })}
      </div>

      <Modal show={modalToggle} modalClose={() => setModalToggle(false)}>
        <div>
          <div className="modalInput">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="modalInput">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="modalInput">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button className="button1" onClick={() => setModalToggle(false)}>
          Close
        </button>
        <button className="button2" onClick={() => saveChanges()}>
          Save
        </button>
      </Modal>

      {loading && <img src={loader} className="App-logo" alt="logo" />}
      {error && <div>Error occured</div>}
    </>
  );
}

export default App;
