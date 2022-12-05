import { useState } from "react";

// Models
import { BackendErrorType } from './models/BackendErrorType';

// Components
import BackendError from './components/BackendError';

// Styles
import "./App.css";

function App() {

  const [result, setResult] = useState('')
  const [error, setError] = useState<BackendErrorType>()

  const handleRequest = async (searchTerm: string, text: string) => {
    let response: Response
    const data = {searchTerm, text}
    try {
      response = await fetch("http://localhost:8000/check", { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-cache',
        body: JSON.stringify(data)
      })
      await response.json().then((data: { message: string }) => setResult(data.message))
    } catch (error) {
      setError(error as unknown as BackendErrorType)
    }
  }

  if(error) {
    return <BackendError message={error.message} />
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Match words and sentences!</h1>
        <input type="text" placeholder='Search sentence or words' className='App-textfield'></input>
      </header>
      <main className='App-main'>
        <textarea placeholder="Write here your text which should be check by overlaps" className='App-textarea'></textarea>
        <button onClick={() => handleRequest('SEARCH_TEXT', 'TEXT')}>Find matches</button>
        <p>{result}</p>
      </main>
    </div>
  );
}

export default App;
