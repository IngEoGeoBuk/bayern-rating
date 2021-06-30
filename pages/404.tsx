import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@material-ui/core';

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }, [])

    return (
        <div>
            없는 페이지입니다.
            <Button variant="outlined" onClick={() => {router.push('/')}}>돌아가기</Button>
        </div>
    )
}

export default NotFound
