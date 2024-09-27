import React from "react";
import bg from '../assets/foodbg.gif';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="  mx-auto max-w-screen-xl">
                <div className="relative bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 mb-8">
                    <img className="w-full rounded-lg" src={bg} alt="" />
                </div>

                {/* Food option  */}
                <div className="grid md:grid-cols-2 gap-2 mb-6">
                    <div className="bg-blue-100 dark:bg-blue-700 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                        <div className="bg-blue-400 text-yellow-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-100 dark:text-yellow-400 mb-2">
                            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                                <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z" />
                            </svg>
                            Play
                        </div>
                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                            Bắt đầu ngay với FoodOpt nào!
                        </h2>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                            FoodOpt sẽ giúp bạn gợi ý xem hôm nay ăn món gì. Với +100 món ăn, đồ uống, ăn vặt...
                        </p>
                        <Link to={'/foodopt'}>
                            <div className="text-blue-600 dark:text-white hover:underline font-medium text-lg inline-flex items-center">
                                Bắt đầu ngay
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                        <div className="flex">
                            <img className="w-52" src="https://i.pinimg.com/564x/0b/12/88/0b12881756c6beeae8f01f09d1212ed0.jpg" alt="gioicuon" />
                            <img className="w-52" src="https://i.pinimg.com/564x/7b/38/82/7b388223bea6561f24e16487fd9e16f8.jpg" alt="" />
                            <img className="w-52" src="https://i.pinimg.com/564x/74/8a/b5/748ab5925d246ccd0a5b08cc5e01dd31.jpg" alt="" />
                        </div>
                    </div>
                </div>

                {/* Hot trend  */}
                <div className="grid md:grid-cols-3 gap-8 mb-6">
                    <div className="bg-pink-200 dark:bg-purple-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                        <div className="bg-pink-400 text-orange-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-white dark:text-orange-400 mb-2">
                            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z" />
                            </svg>
                            Trend
                        </div>
                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                            Các món ăn HOT
                        </h2>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                            Các món ăn được mọi người yêu thích, giới trẻ quan tâm...
                        </p>
                        <Link to={'/trend'}>
                            <div className="text-blue-600 dark:text-white hover:underline font-medium text-lg inline-flex items-center">
                                Xem thêm
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </div>
                        </Link>

                    </div>
                    <div className="col-span-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                        <div className="flex">
                            <img className="w-52" src="https://i.pinimg.com/564x/20/96/db/2096db9bb89723b7f13318e32283526e.jpg" alt="gioicuon" />
                            <img className="w-52" src="https://i.pinimg.com/564x/91/b2/96/91b296ac2b7cfb1bd2f05f97640319d8.jpg" alt="" />
                            <img className="w-52" src="https://i.pinimg.com/564x/25/73/65/257365481b8943b6272f7b4cc320bf91.jpg" alt="" />
                            <img className="w-52" src="https://i.pinimg.com/564x/3a/95/fb/3a95fb1af808d80213fba82470a0660f.jpg" alt="" />
                        </div>
                    </div>
                </div>

                {/* Menu  */}
                <div className="grid md:grid-cols-3 gap-8 mb-6">
                    <div className="bg-green-200 dark:bg-green-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                        <div className="bg-green-400 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-white dark:text-green-400 mb-2">
                            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4ZM5 11a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5Zm14 2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4Z" />
                            </svg>
                            Best Seller
                        </div>
                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                            Top bán chạy
                        </h2>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                            Top món ăn best seller của chúng tôi, được mọi người yêu thích.
                        </p>
                        <Link to={'/trend'}>
                            <div className="text-blue-600 dark:text-white hover:underline font-medium text-lg inline-flex items-center">
                                Xem thêm
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </div>
                        </Link>

                    </div>
                    <div className="col-span-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                        <div className="flex">
                            <img className="w-52" src="https://i.pinimg.com/564x/69/90/ce/6990ceceff1b5f889e90ea7e851ee76e.jpg" alt="gioicuon" />
                            <img className="w-52" src="https://i.pinimg.com/564x/8c/c8/b4/8cc8b4dcd640bf9c212320ca436286f9.jpg" alt="" />
                            <img className="w-52" src="https://i.pinimg.com/564x/2d/3d/13/2d3d13ed02c58a089058f38e731c90d2.jpg" alt="" />
                            <img className="w-52" src="https://i.pinimg.com/736x/00/5c/ef/005cef5714b9b214034b52283de72c6b.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}