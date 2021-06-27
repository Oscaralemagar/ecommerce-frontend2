import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {getCategories} from '../../../functions/category'
import {updateSub, getSub, getSubs,
    removeSub} from '../../../functions/sub'
    import CategoryForm from '../../../components/forms/CategoryForm'
    import LocalSearch from '../../../components/forms/LocalSearch'

const SubUpdate=({match, history})=>{
    const {user}=useSelector(state=>({...state}))

    const [name,setName]=useState('')
    const [Loading, setLoading]=useState(false)
    const [categories, setCategories]=useState([]);

    const [parent, setParent]=useState([]);

        // searching filter step 1
const [keyword, setKeyword]=useState("")
    useEffect(()=>{
        loadCategories();
        loadSub();
    },[])

const loadCategories=()=>getCategories()
.then(s=>setCategories(s.data));

const loadSub=()=>
getSub(match.params.slug).then(s=>{
    setName(s.data.name);
    setParent(s.data.parent)
});

const handleSubmit=(e)=>{
    e.preventDefault();
    //console.log(name)
    setLoading(true);
    updateSub(match.params.slug,{name, parent},user.token)
    .then(res=>{
        //console.log(res)
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is updated`)
       history.push('/admin/sub')
    })
    .catch(err=>{
        console.log(err)
        setLoading(false)
        if(err.response.status===400) toast.error(err.response.data);
    })
   
};




   return (
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2"><AdminNav /> </div>
        <div className="col">
            {Loading? (<h4>Loading</h4>):
            <h4 className="text-danger"> Update Sub Category </h4>}
           
         
         <div className="form-group">
             <label>Category</label>
             <select name="category" className="form-control"
             onChange={(e)=>setParent(e.target.value)}>
                 <option>Please Select</option>
                {categories.length>0 && categories.map((c)=>(
                    <option key={c._id} value={c._id} selected={c._id===parent}>
                        {c.name}
                    </option>
                ))}
             </select>
         </div>
         {/* {JSON.stringify(category)} */}
           <CategoryForm 
    handleSubmit={handleSubmit}
    name={name}
    setName={setName}
    />

  
   
        </div>
       
    </div>
     </div>
   ) 
}
export default SubUpdate