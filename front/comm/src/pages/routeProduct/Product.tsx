import { useLoaderData } from "react-router-dom"
type ProductData = {
  id: number;
  name: string;
  description: string;
  price: number;
  // Ajoutez d'autres propriétés au besoin
};

export async function loader({params}: { params: { id: string } }){
  const base_url = "http://localhost:8000/"
  const resp = await fetch(base_url+"products/"+params.id)
  const data:ProductData  = await resp.json()
  return  {data}
}


export default function Product() {
  const {data} = useLoaderData()
  const { name, description, price } = data;
  return <>
  <h1>{name}</h1>
      <p>{description}</p>
      <p>Price: {price}</p>
  </>;
}
