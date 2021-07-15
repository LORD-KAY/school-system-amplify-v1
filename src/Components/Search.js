import { useState } from 'react'


function Search(props) {
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        if(e !== '') {
            setSearch(e)
            return
        }
        props.searchTerm(e)
    }
    const searchedItem = () => {
        props.searchTerm(search)
    }
    return (
        <div className="searchSection container">     
            <input className="input" onChange={(e) => handleSearch(e.target.value)} placeholder="Search by firstname ..." />
           <button onClick={searchedItem} className="button">Search</button>
        </div>
    )
}

export default Search