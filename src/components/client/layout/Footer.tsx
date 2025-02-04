import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-lightPink text-darkPurple py-8 relative">
            {/* Thin Top Line with Elevated Inverted Shadow */}
            <div className="h-0.5 bg-lavender shadow-md" style={{ boxShadow: '0 -2px 4px -5px rgba(75, 0, 130, 0.5)', position: 'absolute', top: '-2px', left: 0, right: 0 }}></div>
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Лого та соціальні мережі */}
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-2xl font-bold mb-4">Ballons<span className="text-lavender">Shop</span></h2>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Instagram" className="hover:text-darkPurple hover:scale-110 transition duration-200">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:text-darkPurple hover:scale-110 transition duration-200">
                            <FaFacebook className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-darkPurple hover:scale-110 transition duration-200">
                            <FaYoutube className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* Колонка з інформацією */}
                <div className="text-center md:text-left">
                    <h3 className="font-semibold mb-4">Інформація</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/about" className="hover:underline hover:text-lavender transition duration-200">
                                Про нас
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline hover:text-lavender transition duration-200">
                                Контакт
                            </Link>
                        </li>
                        <li>
                            <Link to="/pricing" className="hover:underline hover:text-lavender transition duration-200">
                                Цінова політика
                            </Link>
                        </li>
                        <li>
                            <Link to="/how-to-use" className="hover:underline hover:text-lavender transition duration-200">
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
                            <Link to="/joint-purchases" className="hover:underline hover:text-lavender transition duration-200">
                                Спільні покупки
                            </Link>
                        </li>
                        <li>
                            <Link to="/reviews" className="hover:underline hover:text-lavender transition duration-200">
                                Відгуки наших клієнтів
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className="hover:underline hover:text-lavender transition duration-200">
                                Блог
                            </Link>
                        </li>
                        <li>
                            <Link to="/dropshipping" className="hover:underline hover:text-lavender transition duration-200">
                                Друк на шоперах
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Нижній рядок футера */}
            <div className="mt-8 bg-lightLavender border-t border-lavender pt-4 text-center">
                <p>© {new Date().getFullYear()} BallonsShop. Всі права захищені.</p>
            </div>
        </footer>
    );
};

export default Footer;
