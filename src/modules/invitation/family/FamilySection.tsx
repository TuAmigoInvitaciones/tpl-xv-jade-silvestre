import React from 'react'
import { useInvitationConfig } from '@/common/hooks'

import flowers from '@/assets/images/icons/flores-inferiores.svg'

export const FamilySection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const familyConfig = sections.family

    if (familyConfig?.showFamily === false) {
        return null
    }

    const parents = (familyConfig?.parents as string[]) || [
        'Yesenia Ortega Ortiz',
        'Francisco Javier Nava Trinidad',
    ]

    const godparents = (familyConfig?.godparents as string[]) || [
        'Rosa Trinidad Carmona',
        'Rosa Ma. Ortiz Saucedo',
    ]

    return (
        <section id="family" className="family-section">
            <div className="family-section__container">
                <div className="family-section__decoration family-section__decoration--rotate">
                    <img src={flowers} alt="Flores" />
                </div>

                <div className="family-section__quote-container">
                    <p className="family-section__quote">
                        “Pues mandará a sus ángeles acerca de tí, para que te guarden en todos tus caminos.”
                    </p>
                    <span className="family-section__quote-author">&mdash; SALMO 91:11 &mdash;</span>
                </div>

                <h2 className="family-section__blessing">
                    CON LA BENDICIÓN DE DIOS Y EN COMPAÑÍA<br />DE MIS PADRES Y PADRINOS
                </h2>

                <div className="family-section__grid">
                    <div className="family-section__group">
                        <h3 className="family-section__role">MIS PADRES</h3>
                        <div className="family-section__names">
                            {parents.map((name, index) => (
                                <p key={index} className="family-section__name">{name}</p>
                            ))}
                        </div>
                    </div>

                    <div className="family-section__group">
                        <h3 className="family-section__role">MIS PADRINOS</h3>
                        <div className="family-section__names">
                            {godparents.map((name, index) => (
                                <p key={index} className="family-section__name">{name}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="family-section__decoration">
                    <img src={flowers} alt="Flores" />
                </div>
            </div>
        </section>
    )
}
