import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className='sm:h-[90vh] h-[80vh] bg-white text-black flex flex-col justify-center items-center'>
            <div className="relative w-full px-10 min-h-40 mb-4">
                <Image
                    src="/404.png"
                    fill
                    alt="404"
                    objectFit='contain'
                />
            </div>

            <p className='font-semibold'>Sorry Page Not Found</p>

            <Link href="/">
                <button className='mt-6 text-white  cursor-pointer px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 transition font-medium'>
                    Go Back Home
                </button>
            </Link>
        </div>
    )
}

export default NotFound