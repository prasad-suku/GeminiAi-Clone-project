import React, { createContext, useEffect, useState } from "react";
import run from "../config/geminikey";
import useDarkwhitetheme from "../useDarkwhitetheme";
export const context = createContext();

const ContextProvider = (props) => {
  // background color function and custum hook property
  const { color, setcolor } = useDarkwhitetheme("theme", "white");
  let changebgcolor = () => {
    setcolor(color === "white" ? "dark" : "white");
  };

  // state variable for childrens to handle data

  const [input, setinput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPreprompts] = useState(
    JSON.parse(localStorage.getItem("recentQuries")) || []
  );
  const [showresult, setShowresult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setResultdata] = useState("");

  // storing previous prompts in localstorage

  useEffect(() => {
    localStorage.setItem("recentQuries", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  // getting previousprompts values from localstorage for initial render to view

  useEffect(() => {
    if (localStorage.getItem("recentQuries")) {
      setPreprompts(JSON.parse(localStorage.getItem("recentQuries")));
    }
  }, []);

  // typing effect delay para

  const delaypara = (ind, nextword) => {
    setTimeout(() => {
      setResultdata((prev) => prev + nextword);
    }, 50 * ind);
  };

  // new chat button logic
  let newChat = () => {
    setloading(false);
    setShowresult(false);
  };
  // create a function name onSent which call the "run" function from config geminikeu.js file
  const onSent = async (prompt) => {
    setResultdata("");
    setShowresult(true);
    setloading(true);

    setRecentPrompt(input ? input : prompt);

    // access prompt value if its passed otherwise it takes input value

    const finalPrompt = prompt !== undefined ? prompt : input;

    // Logic for recent queries in navbar
    setPreprompts((prev) => [...prev, finalPrompt]);
    //  getting results data in run() function from -gemini.js

    let result = await run(finalPrompt);
    // console.log(result, "result");

    // For arranging plain text response data into clear structure logics
    let responseArray = result.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");

    // delay para var for spliting words based on spaces
    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      // it gives one by one word
      let newWord = newResponseArray[i];
      // sending parameter to the function with newWord + " " spaces
      delaypara(i, newWord + " ");
    }

    setloading(false);
    setinput("");
  };

  //   onSent("what is the time now india");
  const contextValue = {
    // onSent function to  get an users promts and processs here
    color,
    changebgcolor,
    onSent,
    prevPrompts,
    setPreprompts,
    setRecentPrompt,
    recentPrompt,
    showresult,
    setShowresult,
    loading,
    setloading,
    resultData,
    input,
    setinput,
    newChat,
  };

  return (
    <context.Provider value={contextValue}>{props.children}</context.Provider>
  );
};

export default ContextProvider;
