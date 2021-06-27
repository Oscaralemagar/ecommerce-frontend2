import axios from 'axios'
//import category from '../../../server/models/category';
export const getSubs=async()=>
    await axios.get(
        `${process.env.REACT_APP_API}/subs`);
    

    export const getSub=async(slug)=>
         await axios.get(
            `${process.env.REACT_APP_API}/sub/${slug}`);
        
            export const removeSub= async (slug, authtoken)=>
            await axios.delete(
               `${process.env.REACT_APP_API}/sub/${slug}`,{
                   headers:{
                       authtoken,
                   },
               });

               export const updateSub=async(slug,sub, authtoken)=>
               await axios.put(
                  `${process.env.REACT_APP_API}/sub/${slug}`,sub, {
                      headers:{
                          authtoken,
                      },
                  });
                  export const createSub=async(sub, authtoken)=>
                  await axios.post(
                     `${process.env.REACT_APP_API}/sub`,sub,{
                         headers:{
                             authtoken,
                         },
                     });