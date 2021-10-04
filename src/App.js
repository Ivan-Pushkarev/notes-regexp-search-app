import './style.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Note from "./Note";

const localStorageData =JSON.parse(localStorage.getItem('notes'))
const initialState = localStorageData ? localStorageData : []

function App() {
    
    const [notes, setNotes] = useState(initialState)
    const [newTitle, setNewTitle] = useState('')
    const [newBody, setNewBody] = useState('')
    const [searchValue, setSearchValue] = useState('')
    
    useEffect(() => {
        if (!initialState.length) {
            axios({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/posts',
                params: {_limit: '20'}
            })
                .then(res => setNotes(res.data))
                .catch(err => console.log(err))
        }
    }, [])
    
    const regexp = new RegExp(`${searchValue}`, "i")
    
    const searchFilter = (note) => {
        if (searchValue === '') return note
        else if (regexp.test(note.title) || regexp.test(note.body)) return note
    }
    
    const actionController = (action, payload) => {
        let newNotes
        switch (action) {
            case 'DELETE':
                newNotes = notes.filter(el => el.id !== payload)
                setNotes(newNotes)
                break
            case 'ADD':
                newNotes = [{id: Math.random(), title: payload.title, body: payload.body}, ...notes]
                setNotes(newNotes)
                break
            default:
                console.log('wrong action')
        }
    }
    
    localStorage.setItem('notes', JSON.stringify(notes))
    return (
        <div className="App">
            <header className="App-header">
                <h1>My Notes</h1>
            </header>
            <form>
                <div className="input-group">
                    <div className="input-wrapper">
                        <label htmlFor="title">Enter note title</label>
                        <input type="text" id='title' name='title'
                               value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="body">Enter note body</label>
                        <input type="text" id='body' name='body'
                               value={newBody} onChange={(e) => setNewBody(e.target.value)}/>
                        <button onClick={() => actionController('ADD', {title: newTitle, body: newBody})}>
                            Add Note
                        </button>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-wrapper">
                        <label htmlFor="search">Search</label>
                        <input type="text" name='search' placeholder="Search..."
                               onChange={(e) => setSearchValue(e.target.value)}/>
                    </div>
                </div>
            </form>
            
            <ol>
                {
                    notes
                        .filter(searchFilter)
                        .map(el => <li key={el.id}>
                            <Note note={el}
                                  actionController={actionController}
                                  regexp={regexp}
                                  searchValue={searchValue}
                            />
                        </li>)
                }
            </ol>
        
        </div>
    );
}

export default App;
