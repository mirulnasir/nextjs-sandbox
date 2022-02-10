import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
interface ILayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
    const router = useRouter()
    console.log(router)
    //is home
    return (
        <>
            <header className="py-3">
                <div className="container mx-auto">
                    <Link href="/" passHref>
                        <a className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                            </svg>
                            <span>Back</span>
                        </a>
                    </Link>
                </div>
            </header>
            <div className="container py-16 lg:py-32 mx-auto">
                {children}
            </div>
        </>

    )
}