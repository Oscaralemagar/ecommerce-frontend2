import React from 'react'
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import ShowPaymentInfo from '../cards/ShowPaymentInfo'
const Orders=({orders, handleStatusChange})=>{

    const showOrderInTable=(order)=>
    (<table className='table table-bordered'>
        <thead className="thead-light">
            <tr>
                <th scope='col'>Title</th>
                <th scope='col'>Price</th>
                <th scope='col'>Brand</th>
                <th scope='col'>Color</th>
                <th scope='col'>Count</th>
                <th scope='col'>Shipping</th>
            </tr>
        </thead>
        <tbody>
            {order.products.map((p,i)=>(
                <tr key={i}>
                    <td><b>{p.product.title}</b></td>
                    <td><b>{p.product.price}</b></td>
                    <td><b>{p.product.brand}</b></td>
                    <td><b>{p.color}</b></td>
                    <td><b>{p.count}</b></td>
                    <td><b>{p.product.shipping === 'Yes' ? <CheckCircleOutlined style={{color: 'green'}}/> : 
                    <CloseCircleOutlined style={{color:'red'}}/>}</b></td>
                </tr>
            ))}
        </tbody>
    </table>)


  return  (<>
    {orders.map((order)=>(
        <div key={order._id} className='row pb-5'>
           <div className="btn btn-block bg-light">
           <ShowPaymentInfo order={order} />
            <div className='row'>
        <div className='col-md-4'>Delivery Status</div>
        <div className='col-md-8'>
            <select onChange={e=>handleStatusChange(order._id, e.target.value)}
            className='form-control'
            defaultValue={order.orderStatus}
            >
                <option vlaue='Not Processed'> Not Processed</option>
                <option vlaue='Processing'> Processing</option>
                <option vlaue='Cancelled'> Cancelled</option>
                <option vlaue='Completed'> Completed</option>

            </select>
        </div>

            </div>
           </div>
           {showOrderInTable(order)}
        </div>
    ))}
    

    </>)
}

export default Orders