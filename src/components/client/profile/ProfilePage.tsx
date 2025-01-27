import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../env/index.ts";
import {User} from "../../../interfaces/users/index.ts";



const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URL}/api/Accounts/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("User data:", response.data);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    if (!user) {
        return <p>Завантаження інформації про профіль...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-bold mb-4">Інформація про обліковий запис</h2>

            <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
                    {user.firstname && user.firstname[0]}{user.lastname && user.lastname[0]}
                </div>
                <div>
                    <h3 className="text-lg font-bold">{user.firstname} {user.lastname}</h3>
                    <p>{user.email}</p>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="font-semibold mb-2">Контактна інформація</h4>
                <p><span className="font-bold">Телефон:</span> {user.phoneNumber || "Не вказано"}</p>
                <p><span className="font-bold">Дата народження:</span> {user.birthdate || "Не вказано"}</p>
            </div>

            <div className="flex space-x-4">
                <Link
                    to="/profile/edit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Редагувати
                </Link>
                <button
                    onClick={() => alert("Функція видалення облікового запису ще не реалізована")}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Видалити обліковий запис
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
