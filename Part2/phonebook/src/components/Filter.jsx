const Filter = ({ searchValue, setSearchValue }) => {

    return (
        <p>
            filter shown with 
            <input value={searchValue} onChange={({ target }) => {setSearchValue(target.value)}}  />
        </p>
    )
}

export default Filter