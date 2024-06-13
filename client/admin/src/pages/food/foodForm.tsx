import React, { useState } from "react";
import { BackButton, TagBage, VideoPlayer } from "../../components";
import { useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { addFoodApi } from "../../api/foodApi";
import { uploadApi } from "../../api/uploadFileApi";

export default function FoodForm() {
    const location = useLocation();
    const gid = location.pathname.split('/')[4];

    const [imageLink, setImageLink] = useState('');
    const [file, setFile] = useState<File | null>();
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    const [video, setVideo] = useState('');
    const [nutri, setNutri] = useState('');
    const [tag, setTag] = useState<Array<string>>([]);
    const [uploaded, setUploaded] = useState(false)

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

    // const handleImageLink = (e: React.ChangeEvent) => {
    //     const target = e.target as HTMLInputElement;
    //     const fileId =  target.value
    // }

    const upload = useMutation(uploadApi)
    const addFood = useMutation({
        mutationFn: addFoodApi,
        onSuccess(data) {
            alert(data);
            if(data === 'successfull') {
                document.location.reload();
            }else {alert(data)}
        },
        onError: (err) => {console.log(err)}
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('file', file!)
        const values = {
            name: name,
            intro: intro,
            image: file?.name,
            video: video,
            nutri: nutri,
            tag: tag
        }

        upload.mutate(formData, {
            onSuccess: (data) => {
                if(data === "uploaded") {
                    addFood.mutate(values);
                } else alert(data)
            },
            onError: (err) => console.log(err)
        });
        
    }
    return (
        <div className=''>
            <div className="fixed ml-5 mb-3">
                <BackButton />
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex gap-5 mx-24 dark:bg-gray-800 p-4 rounded-md">
                <div className="">
                    <div className="">
                        {imageLink.length > 0 ?
                            <div>
                                <img src={imageLink} className="w-64 h-80 lg:w-96 lg:h-96 rounded-lg" alt="UploadedImage" />
                                <input
                                    onChange={handleFileChange}
                                    name="file"
                                    id="dropzone-file"
                                    type="file"
                                    accept="image/*" />
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
                                    name="file"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    required />
                            </label>}
                        
                        <p className="text-gray-600">Video preview</p>
                        {video?
                        <VideoPlayer videoId={video}/>
                        :<div role="status" className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>}
                    </div>



                </div>

                <div className="w-2/3">
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
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Submit
                    </button>
                </div>
            </form>
        </div>
    );
};