import React, { useContext, useEffect } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { context } from "../../context/Context";
import run from "../../config/geminikey";

const Main = () => {
  const {
    color,
    setRecentPrompt,
    changebgcolor,
    onSent,
    recentPrompt,
    loading,
    resultData,
    setinput,
    input,
    showresult,
  } = useContext(context);

  //function for getprompt in card data
  let getPrompt = (e) => {
    setRecentPrompt(e.target.innerText);
    onSent(e.target.innerText);
  };

  return (
    <div className="main" data-theme={color}>
      <div className="nav">
        <p>Gemini</p>
        {/* <button onClick={}>dark</button> */}
        <div className="dark-theme">
          <i
            className="fa-regular fa-moon"
            title="Change Theme"
            onClick={() => changebgcolor()}
          ></i>
          {/* <span>Dark</span> */}
        </div>
        <img src={assets.user_icon} alt="" />
      </div>

      {/* main container */}

      <div className="main-container">
        {/* greeting message div */}

        {!showresult ? (
          <>
            <div className="greet">
              <span>Hello, Developer</span>
              <p>How can I help you today ?</p>
            </div>

            {/* sample query card container */}

            <div className="cards">
              <div className="card" onClick={(e) => getPrompt(e)}>
                <p>How to solve DSA problem through Java with an example</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={(e) => getPrompt(e)}>
                <p>How AI can replace our human job in future briefly</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={(e) => getPrompt(e)}>
                <p>Write a formal Cover Letter for HR to a specific role?</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={(e) => getPrompt(e)}>
                <p>Guide me to create a Simple validation form using HTML</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            {/* recent prompt data or users query data */}
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <h4 className="prompt">{recentPrompt}</h4>
            </div>

            {/* results data */}
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />

              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                // <div>{resultData}</div>
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* input container section where we give queries to gemini api */}

        <div className="main-bottom">
          {/* <form onSubmit={}> */}
          <div className="search-box">
            <input
              type="text"
              value={input}
              onChange={(e) => setinput(e.target.value)}
              placeholder="Enter a prompt here"
            />

            <div>
              <img src={assets.gallery_icon} alt="" />
              {/* <img src={assets.mic_icon} alt="" /> */}

              {input && input.length ? (
                <img
                  onClick={() => onSent(input)}
                  src={assets.send_icon}
                  alt=""
                />
              ) : null}
            </div>
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double check its responses. your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};
export default Main;
