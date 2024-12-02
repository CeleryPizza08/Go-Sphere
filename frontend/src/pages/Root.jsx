import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../Components'

const Root = () => (
    <>
        <NavBar />
        <main >
            <Outlet />
        </main>
    </>
)


export default Root