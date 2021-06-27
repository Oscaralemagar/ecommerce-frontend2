import React from 'react'
import {SearchOutlined} from '@ant-design/icons'

const LocalSearch=({keyword,setKeyword})=>{
    const handleSearchChange=(e)=>{
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }
return(



  
<input type="search"
  placeholder="Search your category"
   value={keyword}
onChange={handleSearchChange}
className="form-control mb-4" />


);
}
export default LocalSearch