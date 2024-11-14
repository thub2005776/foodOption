import React, { useState } from "react";
import { BackButton, FGroupList, TagBage, FoodGroupModal } from "../../components";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { addFoodApi, getFoodGroupByTid, getFoodByIdApi, updateFoodApi } from "../../api/foodApi";
import { uploadApi, downloadApi } from "../../api/uploadFileApi";

export default function FoodForm() {
    const user = useSelector(selectUser);
    const location = useLocation();
    const id = location.pathname.split('/')[3];
    const tid = location.pathname.split('/')[2];
    const { data: foodDetail } = useQuery(id, () => getFoodByIdApi(id !== 'add'? id:tid))
    const { data: imageFile } = useQuery(foodDetail? foodDetail['image']: 'img', () => downloadApi(foodDetail?.image ? foodDetail['image'] : 'food.jpg'))
    const { data: foodGroup } = useQuery(id !== 'add' && foodDetail?.topicID ? foodDetail['topicID']: tid, () => getFoodGroupByTid(foodDetail?.topicID ? foodDetail['topicID'] : tid))


    const [gid, setGid] = useState(foodDetail?.groupID ? foodDetail['groupID'] : '')
    const [imageLink, setImageLink] = useState('');
    const [file, setFile] = useState<File | null>();
    const [name, setName] = useState(foodDetail?.name ? foodDetail['name'] : '');
    const [info, setInfo] = useState(foodDetail?.info ? foodDetail['info'] : '');
    const [cost, setCost] = useState(foodDetail?.cost ? foodDetail['cost'] : '');
    const [price, setPrice] = useState(foodDetail?.price ? foodDetail['price'] : '');
    const [stored, setStored] = useState(foodDetail?.stored ? foodDetail['stored'] : '');
    const [tag, setTag] = useState<Array<string>>(foodDetail?.tag ? foodDetail['tag'] : []);
    const [stated, setStated] = useState(foodDetail?.stated ? foodDetail['stated'] : true);
    const [open, setOpen] = useState(false);


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

    const upload = useMutation(uploadApi)
    const addFood = useMutation({
        mutationFn: addFoodApi,
        onSuccess(data) {
            if (data === 'successfull') {
                document.location.reload()
            } else alert(data)
        },
        onError: (err) => { console.log(err) }
    })

    const editFood = useMutation({
        mutationFn: updateFoodApi,
        onSuccess(data) {
            if (data === 'successfull') {
                document.location.reload()
            } else alert(data)
        },
        onError: (err) => { console.log(err) }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('file', file!)
        const values = {
            id: foodDetail && foodDetail['_id']?.$oid,
            topicID: foodDetail?.topicID ? foodDetail['topicID'] : tid,
            groupID: gid,
            name: name,
            info: info,
            image: file?.name,
            cost: cost,
            price: price,
            stored: stored,
            tag: tag,
            rating: foodDetail?.rating ? foodDetail?.rating : 0,
            sold: foodDetail?.sold ? foodDetail?.sold : 0,
            createdAt: foodDetail?.createdAt ? foodDetail['createdAt'] : Date(),
            updatedAt: Date(),
            stated: stated,
        }

        if (file) {
            upload.mutate(formData, {
                onSuccess: (data) => {
                    if (data === "uploaded") {
                        if (foodDetail && foodDetail['name']) {
                            editFood.mutate(values)
                        } else {
                            addFood.mutate(values)
                        }

                    } else alert(data)
                },
                onError: (err) => console.log(err)
            });
        } else if (foodDetail && foodDetail['name']) {
            editFood.mutate(values)
        }
    }

    return (
        id && foodGroup && user && foodDetail &&
        <div className='sm:mx-10 mx-4'>
            <div className="fixed ml-1 top-32">
                <BackButton />
            </div>
            {/* /food/statatics/ */}
            {id !== 'add' &&
                <div className="fixed top-32 right-3">
                    <Link to={`/food/statatics/${id}`}>
                        <button type="button"
                            className="flex text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Thống kê chi tiết
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </Link>
                </div>}
            {/* tepper  */}
            <ol className="mb-10 flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                <li className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700
                    ${gid?.length > 0 && " text-blue-600 dark:text-blue-500"}`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {gid?.length > 0 &&
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>}
                        <span className="me-2">1</span>
                        Food <span className="hidden sm:inline-flex sm:ms-2">Group</span>
                    </span>
                </li>
                <li className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700
                    ${price?.length > 0 && " text-blue-600 dark:text-blue-500"}`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {price?.length > 0 &&
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
                            Nhóm món ăn <span className="text-blue-950 dark:text-gray-400">
                                [{gid ? gid : foodDetail['groupID'] ? foodDetail['groupID'] : 'mã nhóm'}]
                            </span>
                        </p>
                        <FoodGroupModal
                            foodgroup={foodGroup}
                            tid={foodDetail?.topicID ? foodDetail['topicID'] : tid}
                            getGid={(id: string) => setGid(id)} />
                    </div>
                    <FGroupList
                        foodGroup={foodGroup}
                        gid={(id: string) => setGid(id)} />

                    <div className="mb-5">
                        <label htmlFor="stated" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Trạng thái
                        </label>
                        <div
                            onClick={() => setOpen(!open)}
                            id="stated"
                            className="flex justify-between cursor-pointer text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            <p className="text-lg">{stated ? 'Đang bán' : 'Hết hàng'}</p>
                            {!open ?
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                </svg>
                                : <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7" />
                                </svg>}

                        </div>
                        {open &&
                            <div>
                                <ul className="py-2 text-sm text-gray-700 bg-blue-200 dark:bg-gray-700 dark:text-gray-200 rounded-md">
                                    <li
                                        onClick={() => {
                                            setStated(true)
                                            setOpen(false)
                                        }}
                                    >
                                        <div className="block px-4 py-2 hover:bg-blue-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Đang bán
                                        </div>
                                    </li>
                                    <li
                                        onClick={() => {
                                            setStated(false)
                                            setOpen(false)
                                        }}
                                    >
                                        <div className="block px-4 py-2 hover:bg-blue-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Hết hàng
                                        </div>
                                    </li>
                                </ul>
                            </div>}
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="sm:flex gap-5 dark:bg-gray-800 p-4 rounded-md">
                    <div className="">
                        <div className="">
                            {imageLink.length > 0 || imageFile ?
                                <div>
                                    <img src={imageLink || URL.createObjectURL(imageFile)} className="w-64 h-80 lg:w-96 lg:h-96 rounded-lg" alt="UploadedImage" />
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
                                    />
                                </label>}
                        </div>

                    </div>

                    <div className="sm:w-2/3 ">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tên món ăn
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={foodDetail['name'] ? foodDetail['name'] : ''}
                                type="text"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="info" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Thông tin
                            </label>
                            <textarea
                                onChange={(e) => setInfo(e.target.value)}
                                defaultValue={foodDetail['info'] ? foodDetail['info'] : ''}
                                id="info"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            >
                            </textarea>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="cost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Giá gốc
                            </label>
                            <input
                                onChange={(e) => setCost(e.target.value)}
                                defaultValue={foodDetail['cost'] ? foodDetail['cost'] : ''}
                                type="text"
                                id="cost"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Giá bán
                            </label>
                            <input
                                onChange={(e) => setPrice(e.target.value)}
                                defaultValue={foodDetail['price'] ? foodDetail['price'] : ''}
                                type="text"
                                id="price"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="stored" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Số lượng
                            </label>
                            <input
                                onChange={(e) => setStored(e.target.value)}
                                defaultValue={foodDetail['stored'] ? foodDetail['stored'] : ''}
                                type="text"
                                id="stored"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required />
                        </div>

                        {foodDetail['tag'] &&
                            <div className="mb-5">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Đã chọn
                                </label>
                                <div className="flex flex-wrap gap-1">
                                    {foodDetail['tag'].map((tag, i) => (
                                        <TagBage
                                            key={i}
                                            name={tag}
                                            cancel={handleCancel} />
                                    ))}
                                </div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Thêm
                                </label>
                            </div>}

                        <div className="mb-5 flex flex-wrap gap-1">
                            {tagList.map((tag, i) => (
                                <TagBage
                                    key={i}
                                    name={tag}
                                    cancel={handleCancel} />
                            ))}

                        </div>
                        <div className="mb-5">
                            <label htmlFor="sold" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Đã bán
                            </label>
                            <button
                                disabled
                                id="sold"
                                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                {foodDetail['sold'] ? foodDetail['sold'] : 0}
                            </button>
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