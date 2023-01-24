import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost} from '../state/postSlice';
import { useParams } from 'react-router-dom';

const usePostDetails=()=>{
    const {id}=useParams();
    const dispatch=useDispatch();
    const {loading,error,record}=useSelector((state)=>state.posts)
    
    useEffect(()=>{
      dispatch(getPost(id));
    },[dispatch,id])
return{loading,error,record};
};
export default usePostDetails;

// on a fait un hook parceque on va lutiliser dans dans 2 pages pour ramener les donnes 
// dans la page  details + edit  