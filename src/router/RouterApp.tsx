import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Envelope, Invitation, Search, Ticket } from '@/modules'
import { useInvitationConfig, useTicket } from '@/common/hooks'

export const RouterApp: React.FC = () => {
    const { config } = useInvitationConfig()
    const { ticket, isChecking, onCheckInitialData } = useTicket()

    useEffect(() => {
        onCheckInitialData()
    }, [onCheckInitialData])

    if (isChecking) {
        return null
    }

    const hasTicketingSystem = config.hasTicketingSystem

    return (
        <Routes>
            {!hasTicketingSystem ? (
                <>
                    <Route path="/" element={<Invitation />} />
                    <Route path="/envelope" element={<Envelope />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </>
            ) : ticket ? (
                <>
                    <Route path="/" element={<Invitation />} />
                    <Route path="/invitation" element={<Invitation />} />
                    <Route path="/ticket" element={<Ticket />} />
                    <Route path="/envelope" element={<Envelope />} />
                    <Route path="/search" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </>
            ) : (
                <>
                    <Route path="/search" element={<Search />} />
                    <Route path="*" element={<Navigate to="/search" replace />} />
                </>
            )}
        </Routes>
    )
}

