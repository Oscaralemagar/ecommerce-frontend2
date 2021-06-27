import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { 
    getCategories, getCategorySubs
    } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import {LoadingOutlined} from '@ant-design/icons'
const intialsState={
    title:'macbook pro',
    description:'this is the best apple product',
    price: '4500',
    categories:[],
    category:'',
    subs:[],
    shipping: 'Yes',
    quantity:'30',
    images:[],
    colors:['Black', 'Brown','White', 'Blue'],
    brands:['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
    color:'red',
    brand:'acer',
}


const ProductCreate=()=>{
const [values,setValues]= useState(intialsState)
const [subOptions, setSubOptions]= useState([])
const [showSub, setShowSub]=useState(false)
const [loading,setLoading]=useState(false)
//redux
const {user}=useSelector((state)=>({...state}))

useEffect(()=>{
    loadCategories();
},[])

const loadCategories=()=>getCategories()
.then(c=>setValues({...values, categories: c.data}))


const handleSubmit=(e)=>{
    e.preventDefault();
    //
    createProduct(values,user.token)
    .then(res=>{
        console.log(res)
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
    })
    .catch(err=>{
        console.log(err);
       // if(err.response.status===400) toast.error(err.response.data);
       toast.error(err.response.data.err)
    })
}

const handleChange=(e)=>{
    //
    setValues({...values, [e.target.name]: e.target.value})
   // console.log(e.target.name,"-----", e.target.value)
}
const handleCategoryChange=(e)=>{
e.preventDefault();
console.log('Clicked Category', e.target.value)
setValues({...values, subs:[],category: e.target.value})
getCategorySubs(e.target.value)
.then(res=>{
    console.log('sub options on category click',res)
setSubOptions(res.data)
})
setShowSub(true)
}

   return(
       <div className="container-fluid">
           <div className="row">
               <div className="col-md-2">
                   <AdminNav/>
               </div>
               <div className="col-md-10">
                    {loading ? <LoadingOutlined size="80" className="text-danger h1"/> : <h4>Product Create</h4>  }
                    <hr/>
                   {/* {JSON.stringify(values.categories)} */}
                   {JSON.stringify(values.images)}
                  <div className="p-3">
                   <FileUpload values={values} 
                   setValues={setValues}
                   setLoading={setLoading}/>
                   </div>

                    <ProductCreateForm 
                    handleSubmit={handleSubmit}
                    setValues={setValues}
                   handleChange={handleChange}
                    values={values}
                    handleCategoryChange={handleCategoryChange}
                    subOptions={subOptions}
                    showSub={showSub}
                    />
               </div>
           </div>
       </div>
   )
}
export default ProductCreate