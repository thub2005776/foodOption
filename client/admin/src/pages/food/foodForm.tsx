import React, { useState } from "react";
import { BackButton, FGroupList, TagBage, FoodGroupModal } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { addFoodApi, getFoodGroupByTid } from "../../api/foodApi";
import { uploadApi } from "../../api/uploadFileApi";

export default function FoodForm() {
    const location = useLocation();
    const tid = location.pathname.split('/')[4];
    const { data: foodGroup } = useQuery('foodgroup', () => getFoodGroupByTid(tid))

    const [gid, setGid] = useState('')
    const [imageLink, setImageLink] = useState('');
    const [file, setFile] = useState<File | null>();
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    const [nutri, setNutri] = useState('');
    const [tag, setTag] = useState<Array<string>>([]);

    const tagList: Array<string> = ["Món chính", "Đồ uống", "Ăn vặt", "Miền Nam", "Miền Bắc", "Miền Trung", "Đồ chay", "Tim mạch", "Tiểu đường", "Tiêu hoá"]

    const handleFileChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        setFile(file)

        const imageUrl = URL.createObjectURL(file); // Tạo URL đại diện cho file ảnh
        setImageLink(imageUrl);
    };

    const handleCancel = (res: Object) => {
        if (res['check']) {
            const newTag = res['name'];
            setTag([...tag, newTag]);
        } else {
            const updatedTag = tag.filter(tagValue => tagValue !== res['name']);
            setTag(updatedTag);
        }

    };

    const navigate = useNavigate();
    const upload = useMutation(uploadApi)
    const addFood = useMutation({
        mutationFn: addFoodApi,
        onSuccess(data) {
            if (data !== "Can't insert the food detail. Try again." && data !== "Body of the request is empty.") {
                navigate(`/food/recipe/add/${data['_id'].$oid}`)
            } else alert(data)
        },
        onError: (err) => { console.log(err) }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('file', file!)
        const values = {
            topicId: tid,
            gid: gid,
            name: name,
            intro: intro,
            image: file?.name,
            nutri: nutri,
            tag: tag,
            like: 0,
            vote: 0,
        }

        upload.mutate(formData, {
            onSuccess: (data) => {
                if (data === "uploaded") {
                    addFood.mutate(values);
                } else alert(data)
            },
            onError: (err) => console.log(err)
        });

    }

    return (
        <div className='h-screen sm:mx-10 mx-4'>
            <div className="fixed ml-1 top-32">
                <BackButton />
            </div>
            {/* tepper  */}
            <ol className="mb-10 flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                <li className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700
                    ${gid.length > 0 && " text-blue-600 dark:text-blue-500"}`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {gid.length > 0 &&
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>}
                        <span className="me-2">1</span>
                        Food <span className="hidden sm:inline-flex sm:ms-2">Group</span>
                    </span>
                </li>
                <li className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700
                    ${nutri.length > 0 && " text-blue-600 dark:text-blue-500"}`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {nutri.length > 0 &&
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>}
                        <span className="me-2">2</span>
                        Food <span className="hidden sm:inline-flex sm:ms-2">detail</span>
                    </span>
                </li>
            </ol>

            {/* content  */}
            <div className="sm:flex gap-5">
                <div className="mt-20">
                    <div className="flex justify-between">
                        <p className="text-blue-700 font-semibold dark:text-white">
                            Nhóm món ăn <span className="text-blue-950 dark:text-gray-400">--- {gid ? gid : 'mã nhóm'}---</span>
                        </p>
                        <FoodGroupModal
                            foodgroup={foodGroup}
                            tid={tid}
                            getGid={(id: string) => setGid(id)} />
                    </div>
                    <FGroupList
                        foodGroup={foodGroup}
                        tid={tid!}
                        gid={(id: string) => setGid(id)} />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="sm:flex gap-5 dark:bg-gray-800 p-4 rounded-md">
                    <div className="">
                        <div className="">
                            {imageLink.length > 0 ?
                                <div>
                                    <img src={imageLink} className="w-64 h-80 lg:w-96 lg:h-96 rounded-lg" alt="UploadedImage" />
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-64 h-64 lg:w-96 lg:h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                                        required />
                                </label>}
                        </div>

                    </div>

                    <div className="sm:w-2/3 ">
                        {/* <div className="mb-5">
                        <label htmlFor="drive" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Link Google Drive
                        </label>
                        <input
                            onChange={handleImageLink}
                            type="drive"
                            id="drive"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div> */}
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tên món ăn
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="introduce" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Giới thiệu sơ lược
                            </label>
                            <textarea
                                onChange={(e) => setIntro(e.target.value)}
                                id="introduce"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            >
                            </textarea>
                        </div>

                        <div className="mb-5 flex flex-wrap gap-1">
                            {tagList.map((tag, i) => (
                                <TagBage
                                    key={i}
                                    name={tag}
                                    cancel={handleCancel} />
                            ))}

                        </div>
                        <div className="mb-5">
                            <label htmlFor="nutri" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Giá trị dinh dưỡng
                            </label>
                            <textarea
                                onChange={(e) => setNutri(e.target.value)}
                                id="nutri"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                            </textarea>
                        </div>
                        <button type="submit" className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};