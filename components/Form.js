import React, {Component} from 'react';

const Form = (props) =>{
  return (
    <form onSubmit={props.submit}>
    <input type="text" 
    value={props.value}
    placeholder = "Wpisz nazwę miasta"
    onChange={props.change}
    />
    <button> Wyszukaj miasta</button>

    </form>
  )
}
export default Form;