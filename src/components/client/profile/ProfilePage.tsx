import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import { API_URL } from "../../../env/index.ts";
import { User } from "../../../interfaces/users/index.ts";
import { authFetch } from "../../../interfaces/users/authFetch.ts";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("account"); // Для відстеження активної вкладки

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("No token found");
          }

        const response = await authFetch(`${API_URL}/api/Accounts/profile`, {
          method: "GET",
        }, () => alert("Session expired, please log in again")); // onLogout callback
        if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error("Failed to fetch user data");
          }
          
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <p>Завантаження інформації про профіль...</p>;
  }

  // Вміст для кожної вкладки
  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Інформація про обліковий запис</h2>
            <div className="flex items-center space-x-4 mb-6">
              <Avatar
                name={`${user.firstname} ${user.lastname}`}
                size="64"
                round
                className="shadow-md"
              />
              <div>
                <h3 className="text-lg font-bold">{user.firstname} {user.lastname}</h3>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-gray-100 rounded-md shadow">
                <h4 className="font-semibold mb-2">Контактна інформація</h4>
                <p><span className="font-bold">Телефон:</span> {user.phoneNumber || "Не вказано"}</p>
                <p><span className="font-bold">Дата народження:</span> {user.birthdate || "Не вказано"}</p>
              </div>
            </div>
            <Link
              to="/profile/edit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Редагувати
            </Link>
          </div>
        );
      case "orders":
        return <h2 className="text-2xl font-bold">Мої замовлення</h2>;
      case "wishlist":
        return <h2 className="text-2xl font-bold">Мій список бажань</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md flex">
      {/* Ліве меню */}
      <div className="w-1/4 border-r pr-4">
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("account")}
            className={`block text-left w-full px-4 py-2 rounded-md hover:bg-gray-100 ${
              activeTab === "account" ? "bg-gray-100 font-bold" : ""
            }`}
          >
            Обліковий запис
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`block text-left w-full px-4 py-2 rounded-md hover:bg-gray-100 ${
              activeTab === "orders" ? "bg-gray-100 font-bold" : ""
            }`}
          >
            Мої замовлення
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`block text-left w-full px-4 py-2 rounded-md hover:bg-gray-100 ${
              activeTab === "wishlist" ? "bg-gray-100 font-bold" : ""
            }`}
          >
            Мій список бажань
          </button>
          <button
            onClick={() => alert("Вихід")}
            className="block text-left w-full px-4 py-2 rounded-md text-red-600 hover:bg-gray-100"
          >
            Вихід
          </button>
        </nav>
      </div>

      {/* Правий контент */}
      <div className="w-3/4 pl-4">{renderTabContent()}</div>
    </div>
  );
};

export default ProfilePage;
