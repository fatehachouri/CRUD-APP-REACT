import {useEffect,useCallback} from 'react';
import PostList from '../components/PostList';
import { useDispatch, useSelector} from 'react-redux';
import {fetchPosts,deletePosts} from '../state/postSlice';
import Loading from '../components/Loading';
const Index = () => {
  const dispatch=useDispatch();
  const {records,loading,error} =useSelector((state)=>state.posts);
  const {isLoggedIn} =useSelector((state)=>state.auth);
  useEffect(()=>{ //اول مايقوم الموقع نستخدم يوز ايفاكت لجلب البيانات
    dispatch(fetchPosts());
  },[dispatch]);
  const deleteRecord = useCallback(
    (id)=>dispatch(deletePosts(id)),[dispatch]
    );
  return <Loading loading={loading} error={error}>
    <PostList data={records} 
    deleteRecord={deleteRecord}
    isLoggedIn={isLoggedIn}/>
  </Loading>
  }
export default Index