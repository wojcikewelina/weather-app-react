import React, {Component} from 'react';
import './Form.css'

const Form = (props) =>{
  return (


    <form onSubmit={props.submit}>
    <span>Wpisz nazwę miasta:  </span><input type="text" 
    value={props.value}
    placeholder = "nazwa miasta"
    onChange={props.change}
    />
    <button> Wyszukaj miasta</button>

    </form>
  )
}
export default Form;