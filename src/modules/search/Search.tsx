import React from 'react'
import { InfoIcon } from '@phosphor-icons/react'
import { useModal, useInvitationConfig } from '@/common/hooks'
import { MODAL_NAMES } from '@/store/ui/modal.slice'
import { SearchForm } from './components/search-form/SearchForm'

export const Search: React.FC = () => {
    const { onOpenModal } = useModal()
    const { sections } = useInvitationConfig()

    const eventTitle = sections.hero?.names || 'Invitación Especial'
    const eventDate = sections.hero?.date || '20 DE NOVIEMBRE DE 2026'

    const handleOpenInfoModal = () => {
        onOpenModal(MODAL_NAMES.searchInfo, 'Información de Acceso')
    }

    return (
        <main className="search">
            <button
                type="button"
                className="search-fixed-info-btn"
                onClick={handleOpenInfoModal}
                aria-label="Información de clave de acceso"
            >
                <InfoIcon size={26} weight="thin" />
            </button>

            <div className="search__container">
                <header className="search-hero">
                    <h1 className="search-hero__title">
                        {eventTitle}
                    </h1>
                </header>

                <SearchForm />

                <footer className="search-footer-info">
                    <span className="search-footer-info__date">{eventDate}</span>
                </footer>
            </div>
        </main>
    )
}
