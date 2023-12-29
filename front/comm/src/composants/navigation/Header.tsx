import { ShoppingCart, CircleUserRound } from "lucide-react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import BagCard from "../bagCard/BagCard";

export default function Header() {
  const base_url = "http://localhost:8000/";
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [api_way, setApiWay] = useState("login");
  const [orders, setOrders] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleRegister = () => {
    setApiWay("register");
  };
  const handleLogin = () => {
    setApiWay("login");
  };
  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const handleUser = async (event: any) => {
    event.preventDefault();
    try {
      const resp = await fetch(base_url + api_way, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!resp.ok) {
        console.log("erreur");
        // Faites quelque chose avec les données récupérées
      } else {
        const data = await resp.json();
        localStorage.setItem("token", data.token);

        if (data) {
          const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
          const email = decodedToken.email;
          const userId = decodedToken.id;
          const orderId = decodedToken.order[0].id
          setAccount(email);
          localStorage.setItem(
            "storedUser",
            JSON.stringify({ id: userId, email: email, order : orderId })
          );
        }
      }
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };
  const calculateTotalCost = (orders) => {
    return orders.reduce((acc, order) => {
      return (
        acc +
        order.orderdetail.reduce((accDetail, detail) => {
          return accDetail + detail.unitPriceAtOrder;
        }, 0)
      );
    }, 0);
  };
  
  const handleOrder = async () => {
    try {
      const resp = await fetch(base_url + "order", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!resp.ok) {
        console.error("Erreur lors de la récupération des commandes.");
        return;
      }

      const data = await resp.json();
      setOrders(data);
      const newTotalCost = calculateTotalCost(data);
      setTotalCost(newTotalCost);
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("storedUser"));
    if (userData) {
      setAccount(userData.email);
    }
    handleOrder();
  }, []);
  return (
    <>
      <nav className="md:container md:m-auto md:pt-2 pl-2 md:pl-0 md:pr-0  pr-2 flex items-start md:items-center justify-between ">
        <h1 className="text-2xl font-mono">
          <a href="/">Asphalt</a>
        </h1>
        <ul className="md:flex">
          <li>
            <a
              href=""
              className="hover:underline  p-2 rounded-full text-neutral-900 font-semibold "
            >
              Vêtements
            </a>
          </li>
          <li>
            <a
              href=""
              className="hover:underline  p-2 rounded-full text-neutral-9000 font-semibold "
            >
              Nouveautés
            </a>
          </li>
          <li>
            <a
              href=""
              className="hover:underline p-2 rounded-full text-neutral-900 font-semibold "
            >
              Contacts
            </a>
          </li>
        </ul>
        <div className="flex">
          <button className="mr-4" onClick={onOpen}>
            <ShoppingCart size={24} />
          </button>
          <Popover>
            <PopoverTrigger>
              <button>
                <CircleUserRound size={24} />
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Se connecter / S'inscrire</PopoverHeader>
              <PopoverBody>
                {!localStorage.getItem("token") ? (
                  <div className="flex flex-col items-center">
                    <form
                      className="flex flex-col items-center "
                      onSubmit={handleUser}
                    >
                      <input
                        type="text"
                        placeholder="email"
                        className="mb-2 text-center"
                        value={email}
                        onChange={handleEmail}
                        required
                      />
                      <input
                        type="password"
                        placeholder="mot de passe"
                        className="mb-2 text-center"
                        value={password}
                        onChange={handlePassword}
                        required
                      />

                      {api_way === "register" ? (
                        <button className="bg-neutral-950 text-white p-1 rounded-full w-40 ">
                          {" "}
                          S'inscrire
                        </button>
                      ) : (
                        <button className="bg-neutral-950 text-white p-1 rounded-full w-40 ">
                          {" "}
                          Se connecter
                        </button>
                      )}
                    </form>
                    {api_way === "login" ? (
                      <button
                        className="text-center text-sm underline my-2 text-cyan-500"
                        onClick={handleRegister}
                      >
                        Pas encore de compte ?{" "}
                      </button>
                    ) : (
                      <button
                        className="text-center text-sm underline my-2 text-cyan-500"
                        onClick={handleLogin}
                      >
                        Déjà un compte ?{" "}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <p>{account}</p>
                    <a
                      href=""
                      className="text-sm bg-neutral-950 p-2 text-white rounded-full mt-4 w-full text-center"
                    >
                      Voir le profil
                    </a>
                  </div>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Votre Panier</DrawerHeader>

          <DrawerBody>
            {orders.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              orders.map(
                (item, index) =>
                  item.orderdetail.length > 0 &&
                  item.orderdetail.map(
                    (orderDetailItem: any, orderDetailIndex: any) => (
                      <BagCard
                        key={`${index}-${orderDetailIndex}`}
                        orderdetail={orderDetailItem}
                        onUpdateCart={handleOrder}
                      />
                    )
                  )
              )
            )}
          </DrawerBody>

          <DrawerFooter>
            <div className="w-full">
              <p className="mb-6"><strong className="text-lg">Total</strong> : {totalCost} €</p>
            <button className="bg-neutral-900 w-full p-2 text-white rounded-full">
              Commander
            </button>
            </div>
           
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
