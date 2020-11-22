import React from "react"

export const MainLoader = () => {
    return (
        <div className="loader-wrapper">
            <div className="loader">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
            <div className="text">LOADING...</div>
        </div>
    )
}