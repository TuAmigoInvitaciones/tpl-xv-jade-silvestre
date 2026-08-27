import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { ConfirmationSectionForm } from './ConfirmationSectionForm'
import { useInvitationConfig } from '@/common/hooks'
import flor from '@/assets/images/icons/flor-2.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as const

export const ConfirmationSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const confirmationConfig = sections.confirmation

    if (!confirmationConfig?.showConfirmation) {
        return null
    }

    const isQuantityFree = Boolean(confirmationConfig?.isQuantityFree)

    return (
        <div className="confirmation-wrapper">
            <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" className="confirmation-svg-wave">
                <path d="M 0,600 L 0,150 C 106.21052631578945,107.86602870813397 212.4210526315789,65.73205741626793 309,79 C 405.5789473684211,92.26794258373207 492.52631578947376,160.9377990430622 594,188 C 695.4736842105262,215.0622009569378 811.4736842105264,200.51674641148324 896,168 C 980.5263157894736,135.48325358851676 1033.578947368421,84.99521531100478 1119,79 C 1204.421052631579,73.00478468899522 1322.2105263157896,111.50239234449761 1440,150 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="#f0f2de" fillOpacity="0.53"></path>
                <path d="M 0,600 L 0,350 C 86.63157894736841,329.3492822966507 173.26315789473682,308.69856459330146 273,328 C 372.7368421052632,347.30143540669854 485.57894736842104,406.555023923445 584,414 C 682.421052631579,421.444976076555 766.4210526315791,377.0813397129187 865,351 C 963.5789473684209,324.9186602870813 1076.7368421052631,317.1196172248804 1175,320 C 1273.2631578947369,322.8803827751196 1356.6315789473683,336.4401913875598 1440,350 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="#f0f2de" fillOpacity="1"></path>
            </svg>

            <section id="confirmation" className="confirmation-section">
                <div className="confirmation-section__container">
                    <motion.div
                        className="confirmation-section__card"
                        initial={{ opacity: 0, y: 35, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 2.5, delay: 0.1, ease: FLUID_EASE }}
                    >
                        <div className="confirmation-section__flor confirmation-section__flor--top">
                            <img src={flor} alt="Flor" />
                        </div>
                        <div className="confirmation-section__flor confirmation-section__flor--bottom">
                            <img src={flor} alt="Flor" />
                        </div>


                        <SectionHeader
                            pretitle="Confirma Tu Asistencia"
                            title="¿Nos Acompañas?"
                            subtitle="Por favor confirma tu asistencia antes del evento para asegurar tu lugar"
                            align="center"
                        />


                        <div className="confirmation-section__content">
                            <ConfirmationSectionForm isQuantityFree={isQuantityFree} />
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
