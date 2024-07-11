import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    // console.log("Uppercase was clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Upper Case" , "success");

  };
  const handleLowClick = () => {
    // console.log("Lowercase was clicked" + text);
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lower Case" , "success");
  };
  const handleOnChange = (event) => {
    // console.log("Upperscase was clicked");
    setText(event.target.value);
  };
  const handleClearClick = () => {
    // console.log("Lowercase was clicked" + text);
    let newText = ' ';
    setText(newText);
    props.showAlert("Cleared Text" , "success");

  };
  const speak = () => {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    const toogle = document.getElementById('toggle')
    if (toogle.textContent === "Speak") {
        toogle.innerHTML = "Stop";
    }
    else {
        toogle.innerHTML = "Speak";
        if (toogle.innerHTML === "Speak"){
            window.speechSynthesis.cancel();
        }
    }
}


  const [text, setText] = useState(" ");

  return (
    <>
      <div className="container" style={{color : props.mode === 'dark' ? 'white' : 'black'}}>
        <h1>{props.heading}</h1>
        <div className="my-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{backgroundColor : props.mode === "dark" ? "#1f1751" : "white" , color : props.mode === "dark" ? "white" : "black"}}
            id="myBox"
            rows="8"
          ></textarea>
          <button disabled = {text.length === 0} className="btn btn-primary mx-1 my-2" onClick={handleUpClick}>
            Convert to UpperCase
          </button>
          <button disabled = {text.length === 0} className="btn btn-primary mx-1 my-2" onClick={handleLowClick}>
            Convert to LowerCase
          </button>
          <button disabled = {text.length === 0} className="btn btn-primary mx-1 my-2" onClick={handleClearClick}>
            Clear Text
          </button>
          <button disabled = {text.length === 0} type="submit" onClick={speak} className="btn btn-primary mx-1 my-2" id="toggle">Speak</button>
        </div>
      </div>
      <div className="container my-3" style={{color : props.mode === 'dark' ? 'white' : 'black'}}>
        <h2>Your Text Summary</h2>
        <p>
          Your Text contain {text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length}{" "}
          characters
        </p>
        <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0 ? text : "Enter something to preview here!"}</p>
      </div>
    </>
  );
}
