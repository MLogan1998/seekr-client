import React from "react"

export const Home = props => {
  return (
    <>
      <button className="log-link fakeLink"
        onClick={() => {
            localStorage.removeItem("s_token")
            localStorage.removeItem("user_id")
            localStorage.removeItem("seekr")
            props.history.push({ pathname: "/" })
        }}
    >Logout</button>
    </>
  )
} 
