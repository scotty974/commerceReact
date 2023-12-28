import './App.css'
import Header from './composants/navigation/Header'
import Banner from './composants/banner/Banner'
import Filter from './composants/filterComposant/Filter'
import CardProducts from './composants/products/cardProducts'
import { useEffect, useState } from 'react'

function App() {
  const url_base = "http://localhost:8000/"
 const [products, setproducts] = useState([])

 const handleProducts = async () =>{
  const resp = await fetch(url_base+'products')
  const data = await resp.json()
  setproducts(data)
 }

 useEffect(()=>{
  handleProducts()
  console.log(products)
 },[])
  return (
    <>
    <Header />
    <Banner />
    <Filter />
   <section className='container m-auto w-full mt-10'>
    <div className='flex flex-wrap md:justify-start  md:gap-2 gap-1 justify-center w-full'>
      {products.map(item => <CardProducts name={item.name} price={item.price} category={item.category.name}/>)}
    
    </div>
   </section>
    </>
  )
}

export default App
