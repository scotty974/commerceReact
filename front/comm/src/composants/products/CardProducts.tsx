export default function CardProducts({name, price, category}) {
  return <>
  <div className=" md:w-1/6 w-1/3 h-full mb-2 hover:cursor-pointer hover:scale-95 transition ease-in-out duration-300" >
  <div className="bg-slate-400 w-full h-60"></div>
  <div >
    <h3>{name}</h3>
    <span>{price} € - {category}</span>
  </div>  
  </div>
  
  </>;
}
