import React, { useContext, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { context } from "../../context/Context";
const Navbar = () => {
  const { onSent, prevPrompts, setRecentPrompt, color, newChat } =
    useContext(context);

  // state for collapse side bar content if  state is true

  const [collapse, setcollapse] = useState(false);

  //    Toggle menu item

  let togglemenu = () => {
    setcollapse(!collapse);
  };

  // calling onSent function when we click previous querie
  let onLoad = async (item) => {
    setRecentPrompt(item);
    await onSent(item);

    console.log(item);
  };
  return (
    <>
      <div className="sidebar" data-theme={color}>
        <div className="top">
          <div className="menu">
            <i
              className="fa-solid fa-bars"
              style={{ color: color == "white" ? "black" : "white" }}
              onClick={togglemenu}
            />
          </div>

          {/* New chat div */}
          <div className="new-chat" onClick={() => newChat()}>
            <img src={assets.plus_icon} alt="" />
            {collapse ? <p>New Chat</p> : null}
          </div>

          {/* Recent query titles div */}

          {collapse ? (
            <div className="recent">
              <p className="recent-title">Recent</p>

              {/* recent queries here */}
              {prevPrompts.map((item, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => onLoad(item)}
                    className="recent-entry"
                  >
                    <i className="fa-regular fa-message"></i>
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="bottom">
          <div className="bottom-item recent-entry">
            <i className="fa-regular fa-circle-question"></i>
            {collapse ? <p>Help</p> : null}
          </div>

          <div className="bottom-item recent-entry">
            <i className="fa-regular fa-clock"></i>
            {collapse ? <p>Activity</p> : null}
          </div>

          <div className="bottom-item recent-entry">
            <i className="fa-solid fa-gear"></i>
            {collapse ? <p>Setting</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
