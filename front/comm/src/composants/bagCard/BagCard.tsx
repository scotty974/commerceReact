import { Trash } from "lucide-react";


export default function BagCard({ orderdetail }) {
  const base_url = "http://localhost:8000/";

  const deleteOrderDetail = async (orderId: number) => {
    await fetch(base_url + "order-detail/" + orderId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return (
    <div className="flex items-center justify-between gap-1 mb-2">
      <div className="bg-neutral-900 w-20 h-20"></div>

      <div className="flex flex-col ">
        <h3 className="font-bold text-sm w-32">{orderdetail.product.name}</h3>
        <span>x{orderdetail.quantity}</span>
        <span>{orderdetail.unitPriceAtOrder} €</span>
      </div>
      <button onClick={() => deleteOrderDetail(orderdetail.id)}>
        <Trash size={16} />
      </button>
    </div>
  );
}
