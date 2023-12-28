import { ShoppingCart, CircleUserRound } from "lucide-react";
export default function Header() {
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
          <button className="mr-4">
            <ShoppingCart size={24} />
          </button>

          <button>
            <CircleUserRound size={24} />
          </button>
        </div>
      </nav>
    </>
  );
}