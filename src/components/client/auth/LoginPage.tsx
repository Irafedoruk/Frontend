import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../../../interfaces/users/AuthResponse";
import { authFetch } from "../../../interfaces/users/authFetch";
import { useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../../../interfaces/cart/cartSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await authFetch("/api/accounts/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }, () => navigate("/login")); // Pass a logout callback if necessary
  
      if (response.ok) {
        const data: AuthResponse = await response.json();
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("userId", data.userId);

        // Синхронізувати кошик
        await syncCartToServer(data.accessToken);

        alert("Успішний вхід");
        navigate("/"); // Перенаправлення на головну сторінку
      } else {
        alert("Невірний логін або пароль");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const syncCartToServer = async (token: string) => {
    const localCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const userId = localStorage.getItem("userId");
  
    if (localCart.length > 0 && userId) {
      try {
        await axios.post(
          `http://localhost:5126/api/Cart/add?userId=${userId}`,
          { items: localCart },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Кошик синхронізовано з сервером");
        localStorage.removeItem("cartItems");
        dispatch(clearCart());
      } catch (error) {
        console.error("Помилка синхронізації кошика", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Увійти</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
        >
          Увійти
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Ще не зареєстровані?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer"
          >
            Зареєструйтесь
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
