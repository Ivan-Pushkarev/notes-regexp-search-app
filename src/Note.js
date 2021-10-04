import React from 'react';
import trashCan
    from './img/transparent-solid-web-buttons-icon-trash-icon-delete-icon-5dcb353c1c3720.1008941715735985241156.png'

function Note(props) {
    const {note, actionController, regexp, searchValue} = props
   
    const stringCreator = (str) => {
        let subStrings
        if(searchValue==='') subStrings=[str]
        else subStrings = str.split(regexp)
        return subStrings.map((el, i, arr)=> i!==arr.length-1? <p>{el}<span className='yellow' >{searchValue}</span></p>:
            <p>{el}</p>)
    }
   
    return (
        <div className="note">
            <div className="note__text-wrapper">
                <h2>{stringCreator(note.title)}</h2>
                <div>{stringCreator(note.body)}</div>
            </div>
            <button onClick={()=>actionController('DELETE', note.id)}>
                <img src={trashCan} alt="delete"/>
            </button>
        </div>
    );
}
export default Note;