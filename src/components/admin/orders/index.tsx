import { useGetAdminOrdersQuery, useUpdateOrderStatusMutation } from "../../../services/ordersApi";
import { useState } from "react";

const AdminOrders = () => {
  const { data: orders = [], isLoading } = useGetAdminOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleStatusChange = async (orderId: number, status: string) => {
    try {
      await updateOrderStatus({ orderId, status });
      alert("Статус замовлення успішно оновлено");
    } catch (error) {
      console.error("Помилка оновлення статусу замовлення", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Усі замовлення</h1>
      {isLoading ? (
        <p>Завантаження...</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Користувач</th>
              <th className="p-2">Сума</th>
              <th className="p-2">Статус</th>
              <th className="p-2">Дії</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.userId}</td>
                <td className="p-2">{order.totalPrice} грн</td>
                <td className="p-2">
                  <select
                    value={order.status}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="Pending">Очікується обробка</option>
                    <option value="Processed">Оброблено</option>
                    <option value="Delivered">Доставлено</option>
                    <option value="Cancelled">Скасовано</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleStatusChange(order.id, selectedStatus)}
                  >
                    Оновити статус
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
