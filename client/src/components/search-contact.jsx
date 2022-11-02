import React, { useState, useEffect } from "react";

const SearchContact = ({ filterContact }) => {
    const [searchContact, setSearchContact] = useState("")

    useEffect(() => {
        filterContact(searchContact.toLowerCase())
    }, [searchContact])

    return(
        <div className="container-search">
            <div className="form-search">
                <input type="text" value={searchContact} onChange={(e) => {setSearchContact(e.target.value)}} style={{color: "white"}} placeholder="find contact"/>              
                <button style={{marginRight: '30px', background: 'transparent', border: 'none', color: "white"}}>
                {searchContact === "" ? <i onClick={() => setSearchContact(" ")} className="bi bi-search"></i> : <i onClick={() => setSearchContact("")} className="bi bi-arrow-left"></i>}
                </button>
            </div>
        </div>
    )
}

export default SearchContact