import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Envelop, Invitation, Search, Ticket } from '@/modules'
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
                    <Route path="/envelop" element={<Envelop />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </>
            ) : (
                <>
                    <Route path="/search" element={<Search />} />

                    {ticket ? (
                        <>
                            <Route path="/" element={<Invitation />} />
                            <Route path="/ticket" element={<Ticket />} />
                            <Route path="/envelop" element={<Envelop />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to="/search" replace />} />
                    )}
                </>
            )}
        </Routes>
    )
}
