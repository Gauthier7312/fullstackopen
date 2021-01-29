import React from "react";

const Filtre = (props)=>{
    return (
      <div>
        <span>Filters shown whit</span>
        <input
          value={props.Value}
          onChange={props.Change}
         />
      </div>
    );
  }

  export default Filtre;