import React from 'react'

const Search = ({ setSearchTerm }) => {

    const onChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <input type="text" placeholder="Search..." className="inputSearch" onChange={onChange} />
        </>
    )
}

export default Search
