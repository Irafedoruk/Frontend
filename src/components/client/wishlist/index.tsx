import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWishList, removeFromWishList } from "../../../store/wishlistSlice";
import { RootState } from "../../../store";

const WishListPage = () => {
  const dispatch = useDispatch();
  const wishListItems = useSelector((state: RootState) => state.wishlist.items);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/wishlist/${userId}`)
        .then((response) => {
          dispatch(setWishList(response.data));
        })
        .catch((error) => {
          console.error("Error fetching wish list items:", error);
        });
    }
  }, [userId, dispatch]);

  const handleRemove = (productId: number) => {
    axios
      .delete(`/api/wishlist/${productId}`)
      .then(() => {
        dispatch(removeFromWishList(productId));
      })
      .catch((error) => {
        console.error("Error removing from wish list:", error);
      });
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-semibold mb-6">My Wish List</h2>
      {wishListItems.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishListItems.map((item) => (
            <li
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">{item.productName}</h3>
                <p className="text-gray-700 mt-2">грн{item.productPrice}</p>
              </div>
              <button
                onClick={() => handleRemove(item.productId)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No items in wish list.</p>
      )}
    </div>
  );
};

export default WishListPage;
