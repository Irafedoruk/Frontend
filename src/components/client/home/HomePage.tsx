import CategoryCircles from "../layout/CategoryCircles";
import SubCategoryCarousel from "../layout/SubCategoryCarousel";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import bannerImage from "../../../assets/images/Group 1 (1).png"
const HomePage = () => {
    return (
        <div>
            {/* Великий банер на всю ширину */}
            <img 
                src={bannerImage} 
                alt="Banner" 
                className="w-full h-[500px] object-cover block"
            />

            {/* <div 
                className="w-full h-[500px] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bannerImage})` }}
            >
            </div> */}
            {/* Кружечки категорій */}
            <CategoryCircles />

            {/* Карусель підкатегорій */}
            <SubCategoryCarousel />
        </div>
    );
};

export default HomePage;
