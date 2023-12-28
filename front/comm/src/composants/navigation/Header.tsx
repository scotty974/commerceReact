export default function Header() {
  return (
    <>
      <nav className="md:container md:m-auto md:pt-2 pl-2 pr-2 flex items-start md:items-center justify-between">
        <h1 className="text-2xl font-mono">Asphalt</h1>
        <ul className="md:flex">
          <li>
            <a
              href=""
              className="hover:bg-slate-100 p-2 rounded-full text-neutral-900 font-semibold "
            >
              Vêtements
            </a>
          </li>
          <li>
            <a
              href=""
              className="hover:bg-slate-100 p-2 rounded-full text-neutral-9000 font-semibold "
            >
              Nouveautés
            </a>
          </li>
          <li>
            <a
              href=""
              className="hover:bg-slate-100 p-2 rounded-full text-neutral-900 font-semibold "
            >
              Contacts
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
