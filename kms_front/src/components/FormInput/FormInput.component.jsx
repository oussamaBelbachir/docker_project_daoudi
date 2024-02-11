import React from 'react'
import "./FormInput.styles.scss";
// import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ErrorIcon from '@mui/icons-material/Error';

function FormInput({textarea,error,defaultOption,nomargin,values,label,required,...otherProps}) {
  return (
    <div className={`form__input ${nomargin ? "nomargin" : ""} ${error ? "error" : ""}`}>
        <label>{label} <span>{required ? "*" : ""}</span></label>

        {
          textarea ? <textarea {...otherProps}></textarea> : 

          values ? (
            <select {...otherProps} required={required ? true : false}>
                <option value={""}  defaultValue>{defaultOption}</option>
                {values.map(({value,text}) => <option key={value} value={value}>{text}</option>)}
            </select>
            ) : (
              <input required={required ? required : false} {...otherProps}/>
              )
        }

  

        {error && <div className='error_message flex-center'><ErrorIcon className=' custom-icon'/> {error}</div>}
       
    </div>
  )
}

export default FormInput