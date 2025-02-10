import React, { useState } from "react";
import { useGetAdminOrdersQuery, useUpdateOrderStatusMutation } from "../../../services/ordersApi";
import { OrderStatus } from "../../../interfaces/order";

const AdminOrders = () => {
  const { data: orders = [], isLoading } = useGetAdminOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [statusMap, setStatusMap] = useState<Record<number, OrderStatus>>({});
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  
  const handleSelectChange = (orderId: number, status: OrderStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderId]: status, // Store the string value of the status (OrderStatus)
    }));
  };

  const handleStatusChange = async (orderId: number, status: OrderStatus) => {
    try {
      // Передати числове значення замість рядка
      const updatedOrder = { orderId, status: OrderStatus.Cancelled };  // Замінюємо на числовий еквівалент статусу
      
      console.log("Запит на оновлення статусу замовлення:", updatedOrder);
      
      // Викликаємо мутацію
      await updateOrderStatus(updatedOrder);
      alert("Статус замовлення успішно оновлено");
    } catch (error) {
      console.error("Помилка оновлення статусу замовлення", error);
    }
  };
  

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
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
              <React.Fragment key={order.id}>
                <tr className="border-b">
                  <td className="p-2 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                    {order.id}
                  </td>
                  <td className="p-2">{order.userEmail}</td>
                  <td className="p-2">{order.totalPrice} грн</td>
                  <td className="p-2">
                    <select
                      value={statusMap[order.id] || order.status} // Ensure correct string value here
                      onChange={(e) => handleSelectChange(order.id, e.target.value as OrderStatus)} 
                    >
                      <option value={OrderStatus.Pending}>{OrderStatus.Pending}</option>
                      <option value={OrderStatus.Processed}>{OrderStatus.Processed}</option>
                      <option value={OrderStatus.Delivered}>{OrderStatus.Delivered}</option>
                      <option value={OrderStatus.Cancelled}>{OrderStatus.Cancelled}</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleStatusChange(order.id, statusMap[order.id] || order.status)} // Pass the string status
                    >
                      Оновити статус
                    </button>
                  </td>
                </tr>

                {/* Розгорнуті деталі замовлення */}
                {expandedOrderId === order.id && (
                  <tr key={`details-${order.id}`}>
                    <td colSpan={5} className="pl-16 p-4 bg-gray-100">
                      <h3 className="font-semibold">Деталі замовлення:</h3>
                      <ul className="list-disc pl-5">
                        {order.items.map((item: any) => (
                          <li key={item.productId}>
                            {item.productName} — {item.quantity} шт.
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
