import React, { useState } from "react";
import { VideoPlayer } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { addRecipeApi } from "../../api/recipeApi";

export default function RecipeForm() {
    const location = useLocation();
    const foodId = location.pathname.split('/')[4];
    const addRecipe = useMutation(addRecipeApi);
    const navigate = useNavigate();

    const [video, setVideo] = useState('');
    const [ingredients, setIngredients] = useState([{}]);
    const [newIngredient, setNewIngredient] = useState({ name: "", amount: "" });
    const [processing, setProcessing] = useState('');

    const handleIngredientChange = (event, index) => {
        const { name, value } = event.target;
        setIngredients((prevIngredients) => {
          const updatedIngredients = [...prevIngredients];
          updatedIngredients[index] = {
            ...updatedIngredients[index],
            [name]: value
          };
          return updatedIngredients;
        });
      };

    const handleAddIngredient = () => {
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
        setNewIngredient({ name: "", amount: "" }); // Reset giá trị của newIngredient
    };

    const handleDeleteIngredient = (index) => {
        setIngredients((prevIngredients) => {
            const updatedIngredients = [...prevIngredients];
            updatedIngredients.splice(index, 1);
            return updatedIngredients;
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const values = {
            foodId: foodId,
            video: video,
            ingredients: ingredients,
            processing: processing
        }
        
        addRecipe.mutate(values, {
            onSuccess: (data) => {
                if(data === "successfull") {
                    navigate('/admin/tab1')
                } else {alert(data)}
            },
            onError: (err) => console.log(err) 
        })
        
    }

    return (
        <div className="h-screen">
            <form 
            onSubmit={handleSubmit}
            className=" mx-10 sm:flex gap-5">
                <div>
                    <p className="text-gray-600">Video preview</p>
                    <div className="w-[40rem] h-96">
                        {video ?
                            <VideoPlayer videoId={video} />
                            :
                            <div role="status" className="flex items-center justify-center w-[40rem] h-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>}
                    </div>
                </div>
                <div className="w-full">
                    <div>
                        <div className="mb-5">
                            <label htmlFor="video" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Link Video
                            </label>
                            <input
                                onChange={(e) => setVideo(e.target.value)}
                                type="text"
                                id="video"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-around">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tên nguyên liệu
                            </label>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Đơn vị (g/ml/củ/quả...)
                            </label>
                        </div>
                        {ingredients.map((ingredient, index) => (
                            <div key={index}
                                className="flex gap-2 mb-2">
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={ingredient['name']}
                                        onChange={(event) => handleIngredientChange(event, index)} />
                                </div>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        name="amount"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={ingredient['amount']}
                                        onChange={(event) => handleIngredientChange(event, index)} />
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end">
                            <div onClick={handleAddIngredient}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                </svg>
                            </div>
                            <div onClick={handleDeleteIngredient}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Quy trình chế biến
                        </label>
                        <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Cách chế biến..."
                            onChange={(e) => setProcessing(e.target.value)}></textarea>
                    </div>

                    <button type="submit" className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Submit
                    </button>
                </div>
            </form>
        </div>
    )
}