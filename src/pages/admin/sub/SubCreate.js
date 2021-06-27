import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {getCategories} from '../../../functions/category'
import {createSub, getSub, getSubs,
    removeSub} from '../../../functions/sub'
    import CategoryForm from '../../../components/forms/CategoryForm'
    import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate=()=>{
    const {user}=useSelector(state=>({...state}))

    const [name,setName]=useState('')
    const [Loading, setLoading]=useState(false)
    const [categories, setCategories]=useState([]);
    const [category, setCategory]=useState("")
    const [subs, setSubs]=useState([]);

        // searching filter step 1
const [keyword, setKeyword]=useState("")
    useEffect(()=>{
        loadCategories();
        loadSubs();
    },[])

const loadCategories=()=>getCategories()
.then(s=>setCategories(s.data));

const loadSubs=()=>getSubs()
.then(s=>setSubs(s.data));

const handleSubmit=(e)=>{
    e.preventDefault();
    //console.log(name)
    setLoading(true);
    createSub({name, parent: category},user.token)
    .then(res=>{
        //console.log(res)
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is created`)
       loadSubs();
    })
    .catch(err=>{
        console.log(err)
        setLoading(false)
        if(err.response.status===400) toast.error(err.response.data);
    })
   
};


const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
     setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
         loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };
    // step 3

// step 4
const searched=(keyword)=>(c)=>c.name.toLowerCase().includes(keyword)
  
   return (
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-2"><AdminNav /> </div>
        <div className="col">
            {Loading? (<h4>Loading</h4>):
            <h4 className="text-danger">Sub Category Create Page</h4>}
           
         
         <div className="form-group">
             <label> Parent Category</label>
             <select name="category" className="form-control"
             onChange={(e)=>setCategory(e.target.value)}>
                 <option>Please Select</option>
                {categories.length>0 && categories.map((c)=>(
                    <option key={c._id} value={c._id}>
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
    {/* step 2 and step 3 */}
      <LocalSearch keyword={keyword} 
    setKeyword={setKeyword}
    />

  
        {/* step 5 */}
         {subs.filter(searched(keyword)).map((s)=>(
             <div className="alert alert-secondary" key={s._id}>
                 {s.name}
             <span onClick={()=>handleRemove(s.slug)} 
             className="btn btn-bg float-right">
                 <DeleteOutlined className="text-danger"/>
                 </span >
                 <Link to={`/admin/sub/${s.slug}`}>
                     <span className="btn btn-bg float-right">
                         <EditOutlined  className="text-warning"/></span></Link>
             </div>
         ))}
        </div>
       
    </div>
     </div>
   ) 
}
export default SubCreate