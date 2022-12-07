import { ChangeEvent, useState } from "react";

// Models
import { BackendErrorType } from 'src/app/models/BackendErrorType';
import { CheckResponseType } from 'src/app/models/CheckResponseType';

// Components
import BackendError from './components/BackendError';

// Styles
import "./App.css";
import AnimatedSolution from './components/AnimatedSolution';



const checkLCS = async (data: any) => await fetch("http://localhost:8000/check", { 
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  cache: 'no-cache',
  body: JSON.stringify(data)
})


function App() {

  const [solution, setSolution] = useState<CheckResponseType>({
    numberOverlapping: 0,
    charactersOverlapping: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined)
  const [text, setText] = useState('')
  const [error, setError] = useState<BackendErrorType>()

  const handleRequest = async (searchTerm: string, text: string) => {
    let response: Response
    const data = {searchTerm, text}
    try {
      setIsLoading(true)
      response = await checkLCS(data)
      await response.json().then((data: CheckResponseType) => {
        const newData = {
          numberOverlapping: data.numberOverlapping === 0 ? 0 : data.numberOverlapping,
          charactersOverlapping: data.charactersOverlapping === '' ? 'Nothing was found' : data.charactersOverlapping
        }
        setSolution(newData)
        // Comment out for prefer performance, instead of animation
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      })
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
        <h1>Find matches in words and sentences</h1>
      </header>
      <main className='App-main'>
        <textarea 
        aria-label='searchTextbox'
        placeholder='Write some text' className='App-textarea' onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSearchTerm(e.target.value)}></textarea>
        <textarea 
        aria-label='text'
        placeholder="Write some text" className='App-textarea' onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}></textarea>
      </main>
      <footer className='App-footer'>
        {
          <AnimatedSolution solution={solution} isLoading={isLoading}/>
        }
        <button onClick={() => handleRequest(searchTerm, text)}>Find matches</button>
      </footer>
    </div>
  );
}

export default App;
