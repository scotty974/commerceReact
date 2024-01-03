import { useLoaderData } from "react-router-dom";
import Header from "../../composants/navigation/Header";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AvisCard from "../../composants/avisCard/AvisCard";
type ProductData = {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  review: [];
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
  const { id, name, description, price, status, review } = data;
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [reviews, setReview] = useState([]);
  const [valueRating, setValueRating] = useState(0);
  const [comment, setComment] = useState("");
  const base_url = "http://localhost:8000/";
  const userData = JSON.parse(localStorage.getItem("storedUser"));

  useEffect(() => {
    // Met à jour le prix total chaque fois que la quantité change
    setTotalPrice(price * quantity);
    setReview(data.review);
    
  }, [quantity, price]);

  const handleChangeQuantity = (value: string) => {
    const valueChange = parseInt(value);
    setQuantity(valueChange);
  };

  const handleOrder = async () => {
    try {
      await fetch(base_url + "order-detail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          orderId: userData.order,
          productId: id,
          quantity: quantity,
          total: totalPrice,
        }),
      });
    } catch (error) {
      console.log({ message: error });
    }
  };

  const handleChangeComment = (event) => {
    const value = event.target.value;
    setComment(value);
  };
  const handleReview = async (event) => {
    event.preventDefault()
    const dataLocal = JSON.parse(localStorage.getItem("storedUser"));
    try {
      await fetch(base_url + "review", {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: dataLocal.id,
          productId: id,
          rating: valueRating,
          comment: comment,
        }),
       
      });
      
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  return (
    <>
      <Header />
      <section className="container m-auto flex flex-col md:flex-row mt-4">
        <div className="bg-neutral-900 md:w-1/2 w-full h-bannerHeight  "></div>
        <div className="md:ml-10 mx-2 md:w-1/2 w-full flex flex-col md:justify-center ">
          <h1 className="text-5xl font-bold text-neutral-900">{name}</h1>
          <p className="text-2xl mt-2 text-neutral-900">
            {price} € - {status}
          </p>
          <p className="mt-2 text-neutral-900">{description}</p>
          <NumberInput
            size="md"
            maxW={24}
            value={quantity}
            min={1}
            onChange={handleChangeQuantity}
            className="mt-4 text-neutral-900"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <button
            onClick={handleOrder}
            className="bg-neutral-900 text-white p-2 md:w-96 w-56 mt-10 rounded-full"
          >
            Ajouter à mon panier
          </button>
        </div>
      </section>
      <section className="container m-auto mt-10  text-neutral-900 flex">
        <div className="w-8/12 ">
          <h2 className="text-4xl font-semibold">Les Avis</h2>
          {reviews.length > 0 ? (
            reviews
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Tri par date décroissante
              .map((item, index) => (
                <AvisCard
                  content={item.comment}
                  rating={item.rating}
                  key={index}
                  date={item.date}
                />
              ))
          ) : (
            <p className="mt-4">Pas encore de commentaire sur le produit</p>
          )}
        </div>
        <div className="w-1/3 px-4">
          <h3 className="text-4xl font-semibold text-neutral-900 ">
            Partager votre avis
          </h3>
          <form className="shadow-md p-4 rounded mt-10" onSubmit={handleReview}>
            <textarea
              name="review"
              id="review"
              className="w-full h-60  rounded p-2"
              placeholder="Ecrivez quelque chose...."
              value={comment}
              onChange={handleChangeComment}
            ></textarea>
            <span>Votre note sur {valueRating}/5 :</span>
            <Slider
              aria-label="slider-ex-1"
              defaultValue={0}
              max={5}
              onChangeEnd={(val) => setValueRating(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <button
              className="bg-neutral-900 text-white w-40 p-2 rounded-full mt-2"
              type="submit"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
