import CategoryCircles from "../layout/CategoryCircles";
import SubCategoryCarousel from "../layout/SubCategoryCarousel";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
    return (
        <div>
            {/* <h1 className="text-3xl font-bold mb-4">Ласкаво просимо до BookStore!</h1>
            <p>Тут ви знайдете величезний вибір книг на будь-який смак.</p> */}

            {/* Карусель підкатегорій */}
            <SubCategoryCarousel />

            {/* Кружечки категорій */}
            <CategoryCircles />
        </div>
    );
};

export default HomePage;
