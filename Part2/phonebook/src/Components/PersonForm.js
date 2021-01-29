import React from "react";

const PersonForm = (props)=>{
    return(
      <form onSubmit={props.onSubmit}>
        <p>
          Name :
          <input value={props.valueName} onChange={props.NameChange} />
        </p>
        <p>
          Number :
          <input value={props.valueNumber} onChange={props.NumberChange} />
        </p>
        <div>
          <button type="submit"> Add</button>
        </div>
      </form>
    );
  }

  export default PersonForm;