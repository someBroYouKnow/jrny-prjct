import React from 'react'

type ButtonProps={
  children: React.ReactNode,
  classList: string;
}

const Button= ({children, classList}:ButtonProps)=> {
  return (
    <>
      <button className={`${classList}`}>
        {children}
      </button>
    </>
  )
}

export default Button;