import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Лого та соціальні мережі */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-2xl font-bold mb-4">bookopt</h2>
                    <div className="flex space-x-4">
                        {/* Іконки соцмереж */}
<<<<<<< HEAD
                        <a href="#" aria-label="Instagram" className="hover:text-gray-400 hover:scale-110 transition duration-200">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:text-gray-400 hover:scale-110 transition duration-200">
                            <FaFacebook className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-gray-400 hover:scale-110 transition duration-200">
                            <FaYoutube className="w-6 h-6" />
                        </a>

=======
                        <a href="#" aria-label="Instagram" className="hover:text-gray-400">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:text-gray-400">
                            <FaFacebook className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-gray-400">
                            <FaYoutube className="w-6 h-6" />
                        </a>
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
                    </div>
                </div>

                {/* Колонка з інформацією */}
                <div className="text-center md:text-left">
                    <h3 className="font-semibold mb-4">Інформація</h3>
                    <ul className="space-y-2">
                        <li>
<<<<<<< HEAD
                            <Link to="/about" className="hover:underline hover:text-gray-400 transition duration-200">
                                Про нас
                            </Link>

                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline hover:text-gray-400 transition duration-200">
=======
                            <Link to="/about" className="hover:underline">
                                Про нас
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline">
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
                                Контакт
                            </Link>
                        </li>
                        <li>
<<<<<<< HEAD
                            <Link to="/pricing-policy" className="hover:underline hover:text-gray-400 transition duration-200">
=======
                            <Link to="/pricing" className="hover:underline">
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
                                Цінова політика
                            </Link>
                        </li>
                        <li>
<<<<<<< HEAD
                            <Link to="/how-to-use" className="hover:underline hover:text-gray-400 transition duration-200">
=======
                            <Link to="/how-to-use" className="hover:underline">
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
                                Як користуватись сайтом
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Колонка з послугами */}
                <div className="text-center md:text-left">
                    <h3 className="font-semibold mb-4">Послуги і сервіси</h3>
                    <ul className="space-y-2">
                        <li>
<<<<<<< HEAD
                            <Link to="/joint-purchases" className="hover:underline hover:text-gray-400 transition duration-200">
=======
                            <Link to="/joint-purchases" className="hover:underline">
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
                                Спільні покупки
                            </Link>
                        </li>
                        <li>
<<<<<<< HEAD
                            <Link to="/reviews" className="hover:underline hover:text-gray-400 transition duration-200">
=======
                            <Link to="/reviews" className="hover:underline">
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
                                Відгуки наших клієнтів
                            </Link>
                        </li>
                        <li>
<<<<<<< HEAD
                            <Link to="/blog" className="hover:underline hover:text-gray-400 transition duration-200">
=======
                            <Link to="/blog" className="hover:underline">
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
                                Блог
                            </Link>
                        </li>
                        <li>
<<<<<<< HEAD
                            <Link to="/dropshipping" className="hover:underline hover:text-gray-400 transition duration-200">
=======
                            <Link to="/dropshipping" className="hover:underline">
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
                                Друк на шоперах
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Нижній рядок футера */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                <p>© {new Date().getFullYear()} BookOpt. Всі права захищені.</p>
            </div>
        </footer>
    );
};

export default Footer;
