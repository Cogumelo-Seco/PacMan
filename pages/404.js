import { useEffect } from 'react';
import Head from "next/head"
import { useRouter } from 'next/router';

const load = () => {
    const router = useRouter()
    
    useEffect(() => {
        router.push('/')
    })
    
    return (
        <html lang="pt-BR">
            <Head>
                <title>404</title>
            </Head>
        </html>
    )
}

export default load