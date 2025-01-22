import { useState } from "react";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  
    const handleRegister = async () => {
      if (password !== confirmPassword) {
        alert("Паролі не співпадають!");
        return;
      }
  
      try {
<<<<<<< HEAD
        const response = await fetch("/api/account/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, password }),
=======
        const response = await fetch("/api/accounts/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
        });
  
        if (response.ok) {
          alert("Реєстрація успішна! Тепер увійдіть.");
        } else {
          const error = await response.text();
          alert(`Помилка реєстрації: ${error}`);
        }
      } catch (error) {
        console.error("Register error:", error);
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Реєстрація</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
<<<<<<< HEAD
          <div className="mb-4">
=======
          {/* <div className="mb-4">
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
            <label htmlFor="firstName" className="block text-sm font-medium">
              Ім'я
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium">
              Прізвище
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
<<<<<<< HEAD
          </div>
=======
          </div> */}
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Підтвердження пароля
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Зареєструватися
          </button>
        </form>
      </div>
    );
  };
  
  export default RegisterPage;
  