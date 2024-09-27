import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { addTopicApi, updateTopicApi } from "../../api/foodApi";
import { downloadApi, uploadApi } from "../../api/uploadFileApi";

export default function TopicModal({ type, topic }: { type: string, topic: Object }) {
  const { mutate } = useMutation(
    addTopicApi, {
    onSuccess: (data) => {
      if (type === 'add') {
        document.location.reload()
      }
    },
    onError: (err) => {
      console.log(err);

    }
  })

  const updateTopic = useMutation(
    updateTopicApi,
    {
      onSuccess: (data) => {
        if (data === 'successfull') {
          document.location.reload()
        }
      },
      onError: (err) => {
        console.log(err);

      }
    }
  )
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState(topic['name'] ? topic['name'] : '');
  const [imageLink, setImageLink] = useState(topic['image'] ? topic['image'] : '');
  const [file, setFile] = useState<File | null>();

  const { data: imageFile } = useQuery(topic['image'] ? topic['image'] : 'topicImage', () => downloadApi(topic['image'] ? topic['image'] : 'food.jpg'));


  const handleFileChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file)

    const imageUrl = URL.createObjectURL(file); // Tạo URL đại diện cho file ảnh
    setImageLink(imageUrl);
  };

  const upload = useMutation(uploadApi)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('file', file!)

    const values = {
      "_id": type !== 'add' ? type : null,
      "name": name,
      "image": file?.name,
      "createdAt": type === "add" ? Date() : null,
      "updatedAt": Date(),
    }

    if (file) {
      upload.mutate(formData, {
        onSuccess: (data) => {
          if (type === 'add') {
            mutate(values)
          } else {
            updateTopic.mutate(values)
          }
        },
        onError: (err) => console.log(err)
      })
    } else if (type !== 'add') {
      updateTopic.mutate(values)
    }
  }

  return (
    <>
      <div onClick={() => setOpenModal(true)}>
        {type === 'add' ?
          <svg className="w-8 h-8 cursor-pointer text-blue-400 dark:text-gray-600 hover:text-blue-800 dark:hover:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z" />
          </svg>
          : <svg className="w-6 h-6 cursor-pointer text-blue-400 dark:text-gray-600 hover:text-blue-800 dark:hover:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
          </svg>
        }
      </div>

      {openModal &&
        <div id="authentication-modal" className="overflow-x-hidden fixed top-20  left-[30%] lg:left-[40%] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Tạo chủ đề
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
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Tên chủ đề
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setName(e.target.value)}
                      defaultValue={name} />
                  </div>
                  <div className="">
                    {imageLink.length > 0 || imageFile ?
                      <div className="flex gap-5">
                        <img src={imageLink || URL.createObjectURL(imageFile)} className="w-32" alt="Uploaded" />
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-2 pb-3">
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                          </div>
                          <input
                            onChange={handleFileChange}
                            id="dropzone-file"
                            name="dropzone-file"
                            type="file"
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>

                      :
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                        </div>
                        <input
                          onChange={handleFileChange}
                          id="dropzone-file"
                          name="dropzone-file"
                          type="file"
                          className="hidden"
                          accept="image/*"
                        />
                      </label>}
                  </div>
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
