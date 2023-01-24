import { useSelector } from "react-redux";
const withGuard = (Component) => { //pure function
    
  const Wrapper = (props)=>{
    const {isLoggedIn}= useSelector((state)=>state.auth);
 return isLoggedIn ?<Component {...props}/> : <div>please log in first</div>
  };
  return Wrapper
};

export default withGuard