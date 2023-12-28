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
  Button,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function Header() {
  const base_url = "http://localhost:8000/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [api_way, setApiWay] = useState("login");
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

  const handleUser = async (event:any) => {
    event.preventDefault()
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
        console.log("erreur")
        // Faites quelque chose avec les données récupérées
        
      } else{
        const data = await resp.json();
        localStorage.setItem("token", data.token)
      }
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };
  return (
    <>
      <nav className="md:container md:m-auto md:pt-2 pl-2 md:pl-0 md:pr-0  pr-2 flex items-start md:items-center justify-between">
        <h1 className="text-2xl font-mono">Asphalt</h1>
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
                <div className="flex flex-col items-center">
                  <form className="flex flex-col items-center " onSubmit={handleUser}>
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
                  
                      {api_way === 'register' ? <button className="bg-sky-500 text-white p-1 rounded-full w-40 hover:bg-sky-800"> S'inscrire</button> : <button className="bg-sky-500 text-white p-1 rounded-full w-40 hover:bg-sky-800"> Se connecter</button>}
                    
                  </form>
                  {api_way === 'login' ?   <button
                    className="text-center text-sm underline my-2 text-cyan-500"
                    onClick={handleRegister}
                  >
                    Pas encore de compte ?{" "}
                  </button> :   <button
                    className="text-center text-sm underline my-2 text-cyan-500"
                    onClick={handleLogin}
                  >
                    Déjà un compte ? {" "}
                  </button>}
                
                </div>
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
            <h1>ehy</h1>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
