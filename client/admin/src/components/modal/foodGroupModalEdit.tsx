import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getFoodGroupByTid, updateFoodGroup } from "../../api/foodApi";

export default function FoodGroupModal({ item }: { item: Object }) {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('')

  const { data: foodgroup } = useQuery('foodgroup', () => getFoodGroupByTid(item && item['topicID']));

  const { mutate } = useMutation(
    updateFoodGroup, {
    onSuccess: (data) => {
      if (data === "successfull") {
        setOpenModal(false)
        document.location.reload()
      } else alert(data)
    },
    onError: (err) => {
      console.log(err);

    }
  })


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gidExisted = Array.isArray(foodgroup) && foodgroup.find(f => f['name'] === name)
    if(gidExisted) {
      setError('Nhóm đã tồn tại')
    } else {
       const values = {
        id: item['_id']?.$oid,
        name: name,
        updatedAt: Date()
      }
      mutate(values)
    }}

  return (
    item &&
    <>
      <div onClick={() => setOpenModal(true)}
        className="">
        <svg className="w-6 h-6 text-blue-400 hover:text-blue-500 cursor-pointer dark:text-gray-600 dark:hover:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
        </svg>
      </div>

      {openModal &&
        <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="overflow-x-hidden fixed top-20  left-[30%] lg:left-[40%] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Nhóm món ăn
                </h3>
                <button onClick={() => setOpenModal(false)}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Tên nhóm
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setName(e.target.value)}
                      defaultValue={item['name']}/>
                  </div>
                  {error.length > 0 && <p className="text-red-700 text-xs">{error}</p>}
                  <button type="submit" className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>}

    </>
  );
}