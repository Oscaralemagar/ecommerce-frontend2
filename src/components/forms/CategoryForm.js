import React from 'react'
import CategoryUpdate from '../../pages/admin/category/CategoryUpdate'
const CategoryForm=({handleSubmit, name, setName})=>(
    <form onSubmit={handleSubmit}>
        <div className="form-group">

            <label>Please Enter Category Name</label>
            <input type="text" className="form-control" 
            onChange={(e)=>setName(e.target.value)}
            value={name}
            autoFocus
            required/>
            
            <button
            className="btn btn-outline-primary m-2">Save</button>
        </div>
        
        </form>
)
export default CategoryForm