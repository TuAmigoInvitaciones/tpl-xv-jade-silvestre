import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Search } from '@/modules'

export const PublicRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/search' element={<Search />} />
            <Route path='*' element={<Navigate to='/search' replace />} />
        </Routes>
    )
}
