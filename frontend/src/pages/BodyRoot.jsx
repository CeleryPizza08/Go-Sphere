import React from 'react'
import { Outlet } from 'react-router-dom'

const BodyRoot = () => {
    return (
        <>
            <main >
                <Outlet />
            </main>
        </>
    )
}

export default BodyRoot