import React from 'react'

import { useModal } from '@/common/hooks'
import { MODAL_NAMES } from '@/store/ui/modal.slice'

import { SearchModal } from '@/modules/search/components/search-modal/SearchModal'
import { TicketTablesModal } from '@/modules/ticket/components/TicketTablesModal'
import { TicketModal } from '@/modules/ticket/components/TicketModal'

export const ModalMaster: React.FC = () => {
    const { isOpen, modalName } = useModal()

    return (
        <>
            {isOpen && modalName === MODAL_NAMES.searchInfo && <SearchModal />}
            {isOpen && modalName === MODAL_NAMES.ticket && <TicketModal />}
            {isOpen && modalName === MODAL_NAMES.tables && <TicketTablesModal />}
        </>
    )
}
