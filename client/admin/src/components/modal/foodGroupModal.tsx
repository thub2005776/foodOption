import React, { RefCallback, useState } from "react";
import { useMutation } from "react-query";
import { addFoodGroup } from "../../api/foodApi";

export default function FoodGroupModal({ foodgroup, tid, getGid }: { foodgroup:Array<Object>,tid: string, getGid: RefCallback<string> }) {

  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const { mutate } = useMutation(
    addFoodGroup, {
    onSuccess: (data) => {
      if(data !== "Can't insert the food group. Try again." && data !== "Body of the request is empty.") {
        setOpenModal(false)
        getGid(data)
        // document.location.reload()
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
        topicID: tid,
        name: name,
        createdAt: Date(),
        updatedAt: Date()
      }
      mutate(values)
    }
  }

  return (
    <>
      <div onClick={() => setOpenModal(true)}
        className="p-2 w-fit rounded-md hover:bg-white dark:hover:bg-gray-600">
        <svg className="w-4 h-4 cursor-pointer text-blue-500 hover:text-blue-800 dark:text-gray-400 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
        </svg>
      </div>

      {openModal &&
        <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="overflow-x-hidden fixed top-20  left-[30%] lg:left-[40%] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Thêm nhóm món ăn
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
                      required />
                  </div>
                  <button type="submit" className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >Thêm
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>}

    </>
  );
}