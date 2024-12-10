// import {useEffect, useState} from "react";
// import {ICategoryItem} from "./types.ts";
import {Link} from "react-router-dom";
// import {useGetPostsQuery} from "../../services/postApi.ts";
import { API_URL, http_common } from "../../env/index.ts";
import { DeleteDialog } from "../common/DeleteDialog.tsx";
import Loader from "../common/Loader/index.tsx";
import { useGetCategoriesQuery } from "../../services/categoryApi.ts";

const HomePage = () => {
    const {data: list, /*error,*/ isLoading} = useGetCategoriesQuery();

    const hamdleDelete = async (id: number) => {
        //console.log("Delete id", id);
        try {
            await http_common.delete("/api/categories/" + id);
            //setList(list.filter(item => item.id !== id));
        } catch {
            //toast
        }

    }

    if (isLoading) return <Loader loading={isLoading} size={150} color={"#1f2937"}/>;

    return (
        <>
            <h1 className={"text-center text-3xl font-bold tracking-tight text-gray-900 mb-2"}>Категорії</h1>
            <div>
                <Link to="/create"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Додати
                </Link>
            </div>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {list?.map(item =>
                    <div
                        key={item.id} // Додано key
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                        <img className="rounded-t-lg" src={`${API_URL}/images/300_${item.imageCategory}`} alt={item.name} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                            <div className='flex justify-between items-center p-2 mt-6'>
                                <DeleteDialog title={"Ви впевнені?"}
                                              description={`Дійсно бажаєте видалити '${item.name}'?`}
                                              onSubmit={() => hamdleDelete(item.id)}/>
                                <Link to={`/edit/${item.id}`} className="text-black-500 hover:text-purple-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487L19.5 7.125" />
                                </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}

export default HomePage;