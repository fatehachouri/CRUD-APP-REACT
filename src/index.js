import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";

import Index from "./pages/Index";
import ErrorPages from "./pages/ErrorPages";
import { Provider } from "react-redux";
import store from "./state/index";

const Add= React.lazy(()=>import("./pages/Add"));
const Details= React.lazy(()=>import("./pages/Details"));
const EditPost= React.lazy(()=>import("./pages/EditPost"));



const postParamHandler=({params})=>{
  if(isNaN(params.id)){
    throw new Response ("Bad request",{status:400});
        }
}
const router= createBrowserRouter([{
  path:"/",
  element:< RootLayout />,
  errorElement: <ErrorPages />,
  children:[
    {index:true, element:<Index />},
    {path:"post/add", element: <Suspense fallback="loading please wait..."><Add /></Suspense>  },
    {path:"post", element: <Index />},
    {path:"post/:id/details", element: <Suspense fallback="loading please wait..."><Details /></Suspense>,
  loader:postParamHandler},
    {path:"post/:id/edit", element: <Suspense fallback="loading please wait..."><EditPost /></Suspense>,loader:postParamHandler},
    
  ]
}]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>

  
);
