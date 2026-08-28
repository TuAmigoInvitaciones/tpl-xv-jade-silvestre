import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigation, useMusicPlayer } from '@/common/hooks'
import { EnvelopeClosed } from './EnvelopeClosed'
import { EnvelopeOpen } from './EnvelopeOpen'
import grethelPhoto from '@/assets/images/photos/1.jpeg'
import envelopFlowers from '@/assets/images/icons/envelop-flowers.svg'

export const Envelope: React.FC = () => {
    const timeoutRef = useRef<number | null>(null)
    const flashTimeoutRef = useRef<number | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [showFlash, setShowFlash] = useState(false)
    const { goTo } = useNavigation()
    const { onPlayMusic } = useMusicPlayer()

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
        }
    }, [])

    const handleOpen = () => {
        if (isOpen) return
        setIsOpen(true)
        onPlayMusic()

        flashTimeoutRef.current = window.setTimeout(() => {
            setShowFlash(true)
        }, 4200)

        timeoutRef.current = window.setTimeout(() => {
            goTo('/invitation')
        }, 5000)
    }

    return (
        <div className="envelope">
            <div className="envelope__card">
                <motion.h1
                    className="envelope__title"
                    key={isOpen ? 'open-title' : 'closed-title'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {isOpen ? 'Abriendo la invitación' : 'Mensaje Nuevo'}
                </motion.h1>
                <p className="envelope__subtitle">
                    {isOpen ? 'Por favor espera unos momentos...' : 'Haz clic para abrir tu invitación'}
                </p>
            </div>

            <div className="envelope__closed-wrapper" onClick={handleOpen}>
                <AnimatePresence>
                    {!isOpen ? (
                        <motion.div
                            key="closed"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0 }}
                        >
                            <EnvelopeClosed />
                            <div className="envelope__indicator-ring" />

                            <div className="envelope__flowers-corner">
                                <img src={envelopFlowers} alt="Flores decorativas" className="envelope__flowers-corner-img" />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open-container"
                            className="envelope__open-container"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1 }}
                        >
                            <EnvelopeOpen />

                            <motion.div
                                className="envelope__polaroid"
                                initial={{ y: 70, opacity: 0, scale: 0.85, rotate: 0 }}
                                animate={{
                                    y: -15,
                                    opacity: 1,
                                    scale: [1, 1.025, 1],
                                    rotate: -3,
                                }}
                                transition={{
                                    y: { duration: 0.7, delay: 0, ease: [0.16, 1, 0.3, 1] },
                                    opacity: { duration: 0.5, delay: 0 },
                                    scale: { duration: 2.2, delay: 0.7, repeat: Infinity, ease: 'easeInOut' },
                                }}
                            >
                                <div className="envelope__polaroid-img-wrapper">
                                    <img src={grethelPhoto} alt="Grethel Stefania" />
                                </div>
                                <p className="envelope__polaroid-caption">Grethel Stefania</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="envelope__footer-text">
                <p className="envelope__name">Grethel Stefania</p>
                <p className="envelope__subtitle">¡Quiero invitarte a mis XV años!</p>
            </div>

            {showFlash && (
                <div className="envelope__flash-transition" />
            )}
        </div>
    )
}
