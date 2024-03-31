import React from 'react'

const LoaderSpinner = ({className}: {className?: string}) => {
  const classes = className ? className : ''
  return (
    <span className={`loader-spinner after:bg-dark-3 h-6 w-6 ${classes}`}></span>
  )
}

export default LoaderSpinner