import React from 'react'
import { motion } from 'framer-motion'
import { SwiperSlide } from 'swiper/react'
import { Carousel } from '@/common/components/carousel/Carousel'
import { useInvitationConfig } from '@/common/hooks'
import { SectionHeader } from '@/common/components/section-header/SectionHeader'

import illustrationTop from '@/assets/images/icons/flores-superiores-notas.svg'
import florCentral from '@/assets/images/icons/flor-central.svg'

const FLUID_EASE = [0.22, 1, 0.36, 1] as const

export const DetailsSection: React.FC = () => {
    const { sections } = useInvitationConfig()
    const detailsConfig = sections.details

    if (detailsConfig?.showDetails === false) {
        return null
    }

    const cards = [
        ...(detailsConfig?.noKids !== false ? [{
            id: 'no-kids',
            category: 'SOBRE EL EVENTO',
            title: 'No Niños',
            description: detailsConfig?.noKidsMessage || 'Aunque amamos a los pequeños, esta recepción ha sido planeada exclusivamente para adultos. Agradecemos tu comprensión.',
        }] : []),
        ...(detailsConfig?.punctuality !== false ? [{
            id: 'punctuality',
            category: 'LOGÍSTICA',
            title: 'Aviso de Puntualidad',
            description: detailsConfig?.punctualityMessage || 'Te sugerimos llegar con 15 minutos de anticipación para acomodarte tranquilamente y no perderte ningún momento especial.',
        }] : []),
        {
            id: 'hashtag',
            category: 'REDES SOCIALES',
            title: 'Hashtag Oficial',
            description: 'Te invitamos a compartir tus fotografías y recuerdos del evento usando nuestro hashtag en tus publicaciones:',
            highlight: detailsConfig?.hashtag || '#GrethelStefaniaXV',
        },
    ]

    return (
        <section id="details" className="details-section">
            <motion.img
                className="details-section__img details-section__img--top"
                src={illustrationTop}
                alt="Decoración superior notas"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 3.0, ease: FLUID_EASE }}
            />

            <div className="details-section__container">
                <SectionHeader
                    pretitle="Notas Importantes"
                    title={detailsConfig?.title || 'Recordatorios'}
                    align="center"
                />

                <div className="details-section__swiper-wrapper">
                    <Carousel
                        slidesPerView={1.2}
                        spaceBetween={16}
                        loop={true}
                        autoplay={true}
                        delay={4500}
                        showNavigation={false}
                        showPagination={true}
                        breakpoints={{
                            576: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            992: {
                                slidesPerView: 3,
                                spaceBetween: 28,
                            },
                        }}
                    >
                        {cards.map((card) => (
                            <SwiperSlide key={card.id}>
                                <div className="details-section__card">
                                    <img src={florCentral} alt="Flor decorativa" className="details-section__card-flower" />
                                    <div className="details-section__card-header">
                                        <span className="details-section__card-category">{card.category}</span>
                                        <h3 className="details-section__card-title">{card.title}</h3>
                                    </div>
                                    <div className="details-section__card-body">
                                        <p className="details-section__card-description">
                                            {card.description}
                                        </p>
                                        {card.highlight && (
                                            <span className="details-section__card-highlight">
                                                {card.highlight}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Carousel>
                </div>

            </div>
        </section>
    )
}



