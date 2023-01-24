import React from 'react'
import usePostDetails from '../hooks/use-post-details';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cleanRecord} from '../state/postSlice';


const Details = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    return ()=>{
      dispatch(cleanRecord());
    }
    },[dispatch])
  const {loading,error ,record} = usePostDetails();
  return (
    <div>
      <Loading loading={loading} error={error}>
      <p>Title:{record?.title}</p>
      <p>Description:{record?.description}</p>

      </Loading>
    </div>
  )
}

export default Details