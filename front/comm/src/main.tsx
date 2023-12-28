import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Product, {loader as dataProduct} from './pages/routeProduct/Product.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/product/:id",
      element: <Product />,
      loader : dataProduct
    },
  ]);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider>
        <RouterProvider router={router} />
    </ChakraProvider>
    

)
