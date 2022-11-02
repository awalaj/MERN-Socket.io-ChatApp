import React from "react"

const Header = ({ roomData }) => {
    const { profileUrl, isOnline, username } = roomData
    return (
      <div className="chatHeader">
            <img src={profileUrl} className="profileInChat"/>
            <div className="contactDesk" style={{transform: isOnline ? 'translateY(0px)' : 'translateY(8px)', transition: isOnline ? 'transform .5s linear' : 'transform 0s linear' }}>
              <p style={{ fontWeight: "bold" }}>{username}</p>
              <small className={"status " + (isOnline ? "show" : "hide")}>{isOnline && "Online"}</small>
            </div>
        </div>
    )
}

export default Header