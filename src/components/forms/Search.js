import React from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons'

const Search=()=>{
let dispatch=useDispatch()
const {search}=useSelector((state)=>({...state}))
const {text}=search;

const history=useHistory()
const handleChange=(e)=>{
    //
    dispatch({
        type: 'SEARCH_QUERY',
        payload: {text: e.target.value},
    })
}
const handleSubmit=(e)=>{
e.preventDefault()
history.push(`/shop/?${text}`)
}

return(
    <form className="form-inline my-2 y-lg-0" onSubmit={handleSubmit}>
<input 
onChange={handleChange} type="search" 
placeholder="Search"
value={text} className="form-control r-sm-2" />
<SearchOutlined  onClick={handleSubmit} style={{cursor:"pointer"}}/>


    </form>
)

}
export default Search