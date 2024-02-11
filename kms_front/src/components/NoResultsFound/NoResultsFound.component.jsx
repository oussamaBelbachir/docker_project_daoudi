import React from 'react'
import "./NoResultsFound.styles.scss";
import NotFound from '../../assets/notFound.svg';


function NoResultsFound() {
  return (
    <div className='no_results_found'>
        <img  src={NotFound} alt={"not found"}/>
        <div className='message'>aucun résultat trouvé !</div>
    </div>
  )
}

export default NoResultsFound