import React, {Component} from 'react';
import './Form.css'

const Form = (props) =>{
  return (


    <form onSubmit={props.submit}>
    <span>Sprawdź pogodę: </span><input type="text" 
    value={props.value}
    placeholder = "Wpisz nazwę miasta"
    onChange={props.change}
    />
    <button> Wyszukaj!</button>

    </form>
  )
}
export default Form;