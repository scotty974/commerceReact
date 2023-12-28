import { Trash } from 'lucide-react';
export default function BagCard({orderdetail}) {
    
  return <>
  <div className="flex items-center justify-between gap-1">
        <div className="bg-neutral-900 w-20 h-20"></div>
       
        <div className="flex flex-col ">
            <h3 className="font-bold text-sm">{orderdetail.product.name}</h3>
            <span>x{orderdetail.quantity}</span>
            <span>{orderdetail.product.price} €</span>
        </div>
        <button><Trash size={16}/></button>
    </div>
  </>;
}
