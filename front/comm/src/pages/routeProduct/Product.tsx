import { useLoaderData } from "react-router-dom"
import Header from "../../composants/navigation/Header";
type ProductData = {
  id: number;
  name: string;
  description: string;
  price: number;
  // Ajoutez d'autres propriétés au besoin
};

export async function loader({params}){
  const base_url = "http://localhost:8000/"
  const resp = await fetch(base_url+"products/"+params.id)
  const data:ProductData  = await resp.json()
  return  {data}
}


export default function Product() {
  const {data} = useLoaderData()
  const { name, description, price } = data;
  return <>
  <Header />
  <section className="container m-auto flex mt-4">
  
    <div className="bg-neutral-900 w-1/2 h-bannerHeight  "></div>
    <div className="ml-10 w-1/2 flex flex-col justify-center ">
    <h1 className="text-8xl font-bold ">{name}</h1>
      <p>{description}</p>
      <p>Price: {price}</p>
    </div>
      
  </section>
  
  </>;
}
