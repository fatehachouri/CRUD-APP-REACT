import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={records:[],loading:false,error:null,record:null};


export const fetchPosts=createAsyncThunk("posts/fetchPosts",
async (_,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
try {
    const res= await fetch("http://localhost:5000/post");
    const data= await res.json();
    return data; //payload
} catch (error) {
    return rejectWithValue(error.message);
}
});

export const getPost=createAsyncThunk("posts/getPost",
async (id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
try {
    const res= await fetch(`http://localhost:5000/post/${id}`);
    const data= await res.json();
    return data; //payload
} catch (error) {
    return rejectWithValue(error.message);
}
});

export const  deletePosts=createAsyncThunk("posts/deletePosts",
async(data,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
try {
    await fetch(`http://localhost:5000/post/${data.id}`,{
        method:"DELETE",
    });
    return data; 
} catch (error) {
    return rejectWithValue(error.message);
}
})

export const insertPost=createAsyncThunk("posts/insertPost",
async(item,thunkAPI)=>{ //item pour envoyer data au serveur "ajouter"
    
    
    const {rejectWithValue,getState}=thunkAPI;
    const {auth}=getState();
    item.userId=auth.id;
    try {
        const res= await fetch("http://localhost:5000/post",
        {
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
        },
    });
    const data= await res.json();
    return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
    });

    export const editPost=createAsyncThunk("posts/editPost",
    async(item,thunkAPI)=>{ //item pour envoyer data au serveur "ajouter"
        
        
        const {rejectWithValue}=thunkAPI;
        try {
            const res= await fetch(`http://localhost:5000/post/${item.id}`,
            {
                method:"PATCH",
                body:JSON.stringify(item),
                headers:{
                    "Content-Type":"application/json; charset=UTF-8",
            },
        });
        const data= await res.json();
        return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
        });
const postSlice=createSlice({
    name:"posts",
    initialState, 
    reducers:{
        cleanRecord:(state)=>{state.record=null} // reset state
    },
    extraReducers:{
        // fetch posts
        [fetchPosts.pending]:(state)=>{
            state.loading=true;
            state.error=null;
        },
        [fetchPosts.fulfilled]:(state,action)=>{
            state.loading=false;
            state.records=action.payload; //payload: data 
            
        },
        [fetchPosts.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload;  //payload: error

        },
        // get posts
        [getPost.pending]:(state)=>{
            state.loading=true;
            state.error=null;
        },
        [getPost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.record=action.payload; //record not records
        },
        [getPost.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },

        // delete posts
        [deletePosts.pending]:(state)=>{
            state.loading=true;
            state.error=null;
        },
        [deletePosts.fulfilled]:(state,action)=>{
            state.loading=false;
            state.records=state.records.filter(post=>post.id !==action.payload.id);
        },
        [deletePosts.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        // insert post
        [insertPost.pending]:(state)=>{
            state.loading=true;
            state.error=null;
    
        },
        [insertPost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.records.push(action.payload);
        },
        [insertPost.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        // edit post
        [editPost.pending]:(state)=>{
            state.loading=true;
            state.error=null;
        },
        [editPost.fulfilled]:(state,action)=>{
            state.loading=false;
            state.record=action.payload;
        },
        [editPost.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    },
});

export const {cleanRecord}=postSlice.actions;
export default postSlice.reducer;