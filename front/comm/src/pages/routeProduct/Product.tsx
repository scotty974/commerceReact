import { useLoaderData } from "react-router-dom";
import Header from "../../composants/navigation/Header";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

type ProductData = {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  // Ajoutez d'autres propriétés au besoin
};

export async function loader({ params }) {
  const base_url = "http://localhost:8000/";
  const resp = await fetch(base_url + "products/" + params.id);
  const data: ProductData = await resp.json();
  return { data };
}

export default function Product() {
  const { data } = useLoaderData();
  const { name, description, price, status } = data;
  const base_url = "http://localhost:8000/";

  const handleOrder = async () => {
    const resp = await fetch(base_url + 'order-detail', {
        method : 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          orderId : 4
        }),
    })
  }

  return (
    <>
      <Header />
      <section className="container m-auto flex mt-4">
        <div className="bg-neutral-900 w-1/2 h-bannerHeight  "></div>
        <div className="ml-10 w-1/2 flex flex-col justify-center ">
          <h1 className="text-5xl font-bold ">{name}</h1>
          <p className="text-2xl mt-2">
            {price} € - {status}
          </p>
          <p className="mt-2">{description}</p>
          <NumberInput size="md" maxW={24} defaultValue={1} min={1} className="mt-4 ">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <button className="bg-neutral-900 text-white p-2 w-96 mt-10 rounded-full">
            Ajouter a mon panier
          </button>
        </div>
      </section>
    </>
  );
}
