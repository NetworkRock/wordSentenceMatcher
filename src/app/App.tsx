import { ChangeEvent, useState } from "react";

// Models
import { BackendErrorType } from '../shared/models/BackendErrorType';

// Components
import BackendError from './components/BackendError';

// Styles
import "./App.css";
import { CheckResponseType } from 'shared/models/CheckResponseType';

function App() {

  const [result, setResult] = useState<CheckResponseType>()
  const [searchTerm, setSearchTerm] = useState('')
  const [text, setText] = useState('')
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
      await response.json().then((data: CheckResponseType) => setResult(data))
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
        <input type="text" placeholder='Search sentence or words' className='App-textfield' onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}></input>
      </header>
      <main className='App-main'>
        <textarea placeholder="Write here your text which should be check by overlaps" className='App-textarea' onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}></textarea>
        <button onClick={() => handleRequest(searchTerm, text)}>Find matches</button>
        <p style={{
          color: 'white'
        }}>{JSON.stringify(result)}</p>
      </main>
    </div>
  );
}

export default App;
