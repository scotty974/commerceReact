import { Trash } from "lucide-react";
import { useEffect } from "react";

export default function BagCard({ orderdetail, onUpdateCart }) {
  const base_url = "http://localhost:8000/";

  const deleteOrderDetail = async (orderId: number) => {
    try {
      await fetch(base_url + "order-detail/" + orderId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Appeler la fonction parent pour informer la suppression
      onUpdateCart();
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande", error);
    }
  };

  // Utiliser useEffect pour détecter les changements dans orderdetail et appeler onUpdateCart
  useEffect(() => {
    onUpdateCart();
  }, [orderdetail, onUpdateCart]);

  return (
    <div className="flex items-center justify-between gap-1 mb-2">
      <div className="bg-neutral-900 w-20 h-20"></div>

      <div className="flex flex-col ">
        <h3 className="font-bold text-sm w-32">{orderdetail.product.name}</h3>
        <span>x{orderdetail.quantity}</span>
        <span>{orderdetail.unitPriceAtOrder} €</span>
      </div>
      <button onClick={() => deleteOrderDetail(orderdetail.id)} className="hover:bg-red-600 hover:text-white p-2 rounded-full">
        <Trash size={16} />
      </button>
    </div>
  );
}
