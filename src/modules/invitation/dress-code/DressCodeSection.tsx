import React from 'react'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

import dressCode from '@/assets/images/icons/dress-code.svg'
import florCentral from '@/assets/images/icons/flor-central.svg'
import photo from '@/assets/images/photos/2.jpeg'

export const DressCodeSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const dressCodeConfig = sections.dressCode

    if (!dressCodeConfig?.showDressCode) {
        return null
    }

    const title = dressCodeConfig.title || 'Dress Code'
    const description = dressCodeConfig.description
    const attire = dressCodeConfig.attire

    return (
        <section id="dress-code" className="dress-code-section">
            <div className="dress-code-section__container">
                <div className="dress-code-section__flor dress-code-section__flor--top-right">
                    <img src={florCentral} alt="Flor decorativa" />
                </div>
                <div className="dress-code-section__flor dress-code-section__flor--bottom-left">
                    <img src={florCentral} alt="Flor decorativa" />
                </div>


                <SectionHeader
                    pretitle="CÓDIGO DE VESTIMENTA"
                    title={title}
                    align="center"
                />

                {description && (
                    <p className="dress-code-section__description">{description}</p>
                )}

                <div className="dress-code-section__illustration">
                    <div className="dress-code-section__icon">
                        <img src={dressCode} alt="Dress Code" />
                    </div>
                </div>

                <div className="dress-code-section__content">
                    {(attire?.women || attire?.men) && (
                        <div className="dress-code-section__attire">
                            {attire.women && (
                                <p className="dress-code-section__attire-line">
                                    <span className="dress-code-section__attire-label">Damas:</span> {attire.women}
                                </p>
                            )}
                            {attire.men && (
                                <p className="dress-code-section__attire-line">
                                    <span className="dress-code-section__attire-label">Hombres:</span> {attire.men}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="dress-code-section__color-swatches">
                        <span className="dress-code-section__color-circle dress-code-section__color-circle--2" />
                        <span className="dress-code-section__color-circle dress-code-section__color-circle--3" />
                        <span className="dress-code-section__color-circle dress-code-section__color-circle--4" />
                        <span className="dress-code-section__color-circle dress-code-section__color-circle--5" />
                    </div>
                </div>
            </div>

            <div className="dress-code-section__photo-frame">
                <div className="dress-code-section__photo-inner">
                    <img src={photo} alt="Foto Dress Code" />
                </div>
            </div>
        </section>
    )
}








