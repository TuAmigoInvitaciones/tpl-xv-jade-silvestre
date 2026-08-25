import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInvitationConfig, useToast } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'
import { Button } from '@/common/components/button/Button'
import { Accordion } from '@/common/components/accordion/Accordion'
import type { AccordionItem } from '@/common/types'
import { GiftIcon, BankIcon, EnvelopeOpenIcon, CopyIcon, CheckIcon, ArrowSquareOutIcon } from '@phosphor-icons/react'
import florPresents from '@/assets/images/icons/flor-presents.svg'
import florCentral from '@/assets/images/icons/flor-central.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const PresentsSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const presentsConfig = sections.presents
    const { showSuccess } = useToast()
    const [copiedClabe, setCopiedClabe] = useState(false)

    if (!presentsConfig?.showPresents) {
        return null
    }

    const { url, bankDetails, envelopeRain } = presentsConfig

    const handleCopyClabe = () => {
        if (bankDetails?.clabe) {
            navigator.clipboard.writeText(bankDetails.clabe)
            setCopiedClabe(true)
            showSuccess('CLABE copiada al portapapeles')
            setTimeout(() => setCopiedClabe(false), 2500)
        }
    }

    const accordionItems: AccordionItem[] = []

    if (url) {
        accordionItems.push({
            id: 'liverpool-registry',
            title: 'Mesa de Regalos',
            icon: <GiftIcon size={30} weight="light" />,
            defaultOpen: true,
            content: (
                <div className="presents-section__accordion-content">
                    <p className="presents-section__card-text">
                        Tu presencia es nuestro mejor regalo. Si deseas hacernos un detalle, puedes consultar nuestra mesa de regalos en Liverpool.
                    </p>
                    <Button
                        variant="outline"
                        radius="full"
                        icon={<ArrowSquareOutIcon size={18} weight="bold" />}
                        iconPosition="right"
                        onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                    >
                        Ver en Liverpool
                    </Button>
                    <img
                        src={florPresents}
                        alt=""
                        className="presents-section__card-flor presents-section__card-flor--bottom-right"
                    />
                </div>
            ),
        })
    }

    if (bankDetails) {
        accordionItems.push({
            id: 'bank-transfer',
            title: 'Transferencia Bancaria',
            icon: <BankIcon size={30} weight="light" />,
            defaultOpen: true,
            content: (
                <div className="presents-section__accordion-content">
                    <div className="presents-section__bank-info">
                        {bankDetails.bank && (
                            <p className="presents-section__bank-line">
                                <span>Banco:</span> <strong>{bankDetails.bank}</strong>
                            </p>
                        )}
                        {bankDetails.holder && (
                            <p className="presents-section__bank-line">
                                <span>Titular:</span> <strong>{bankDetails.holder}</strong>
                            </p>
                        )}
                        {bankDetails.account && (
                            <p className="presents-section__bank-line">
                                <span>Cuenta:</span> <strong>{bankDetails.account}</strong>
                            </p>
                        )}
                        {bankDetails.clabe && (
                            <p className="presents-section__bank-line presents-section__bank-line--clabe">
                                <span>CLABE:</span> <strong>{bankDetails.clabe}</strong>
                            </p>
                        )}
                    </div>
                    {bankDetails.clabe && (
                        <Button
                            variant="outline"
                            radius="full"
                            icon={copiedClabe ? <CheckIcon size={18} weight="bold" /> : <CopyIcon size={18} weight="bold" />}
                            onClick={handleCopyClabe}
                        >
                            {copiedClabe ? '¡Copiado!' : 'Copiar CLABE'}
                        </Button>
                    )}
                    <img
                        src={florCentral}
                        alt=""
                        className="presents-section__card-flor presents-section__card-flor--bottom-left"
                    />
                </div>
            ),
        })
    }

    if (envelopeRain) {
        accordionItems.push({
            id: 'envelope-rain',
            title: 'Lluvia de Sobres',
            icon: <EnvelopeOpenIcon size={30} weight="light" />,
            defaultOpen: true,
            content: (
                <div className="presents-section__accordion-content">
                    <p className="presents-section__card-text">
                        Si prefieres apoyarnos en efectivo, contaremos con un buzón el día del evento donde podrás colocar tu sobre con tus buenos deseos.
                    </p>
                    <img
                        src={florPresents}
                        alt=""
                        className="presents-section__card-flor presents-section__card-flor--bottom-right"
                    />
                </div>
            ),
        })
    }



    return (
        <section id="presents" className="presents-section">
            <div className="presents-section__container">
                <SectionHeader
                    pretitle="Sugerencia de Regalos"
                    title={presentsConfig.title || 'Mesa de Regalos'}
                    align="center"
                />

                <motion.div
                    className="presents-section__accordion-wrapper"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: FLUID_EASE }}
                >
                    <Accordion
                        items={accordionItems}
                        variant="separated"
                        allowMultiple
                    />
                </motion.div>
            </div>
        </section>
    )
}

