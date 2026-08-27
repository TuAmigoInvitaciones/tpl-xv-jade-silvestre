import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Button } from '@/common/components/button/Button'
import { ArrowSquareOutIcon } from '@phosphor-icons/react'

import icon from '@/assets/images/icons/icon-camara.svg'
import illustrationBottom from '@/assets/images/icons/flores-album.svg'
import photo from '@/assets/images/photos/12.jpg'

export const GuestPhotosSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const guestPhotosConfig = sections.guestPhotos
    const playlistAndPhotosConfig = sections.addons?.playlistAndPhotos

    const show = guestPhotosConfig?.showGuestPhotos ?? playlistAndPhotosConfig?.showPlaylistAndPhotos

    if (show === false) {
        return null
    }

    const albumUrl = (guestPhotosConfig?.albumUrl as string) || (playlistAndPhotosConfig as Record<string, string>)?.qrAlbumUrl || 'https://photos.app.goo.gl/xqUqNJ5Cvm9mjo7m8'

    return (
        <>
            <section id="guest-photos" className="guest-photos-section">
                <div className="guest-photos-section__container">
                    <div className="guest-photos-section__left-col">
                        <div className="guest-photos-section__header">
                            <SectionHeader
                                pretitle="Recuerdos"
                                title={guestPhotosConfig?.title || 'Álbum de Fotos'}
                            />
                        </div>

                        <div className="guest-photos-section__icon">
                            <img src={icon} alt="Camera icon" />
                        </div>

                        <p className="guest-photos-section__text">
                            {guestPhotosConfig?.subtitle || 'Comparte tus fotos del evento para que todos las podamos disfrutar.'}
                        </p>
                    </div>

                    <div className="guest-photos-section__right-col">
                        <p className="guest-photos-section__message">Sube tus fotos en este apartado.</p>

                        <div className="guest-photos-section__qr-wrapper">
                            <div className="guest-photos-section__qr-card">
                                <QRCodeSVG
                                    value={albumUrl}
                                    size={130}
                                    bgColor="#ffffff"
                                    fgColor="#2a2a2a"
                                    level="M"
                                    className="guest-photos-section__qr-code"
                                />
                            </div>
                        </div>

                        <div className="guest-photos-section__button-wrapper">
                            <Button
                                variant="secondary"
                                radius="full"
                                icon={<ArrowSquareOutIcon size={18} weight="bold" />}
                                iconPosition="right"
                                onClick={() => window.open(albumUrl, '_blank', 'noopener,noreferrer')}
                            >
                                Abrir Álbum de Fotos
                            </Button>
                        </div>
                    </div>

                    <img
                        src={illustrationBottom}
                        alt="Decoración floral álbum"
                        className="guest-photos-section__bottom-img"
                    />
                </div>
            </section>
            <div className="guest-photos-section__photo">
                <div className="guest-photos-section__overlay" />
                <img src={photo} alt="Photo Grethel" />
            </div>

        </>
    )
}


