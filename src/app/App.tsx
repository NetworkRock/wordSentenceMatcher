import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Match words and sentences!</h1>
        <input type="text" placeholder='Search sentence or words' className='App-textfield'></input>
      </header>
      <main className='App-main'>
        <textarea placeholder="Write here your text which should be check by overlaps" className='App-textarea'></textarea>
      </main>
    </div>
  );
}

export default App;
