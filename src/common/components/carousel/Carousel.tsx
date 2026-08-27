import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade, EffectCoverflow, EffectCards } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'


import { Button, type ButtonVariant } from '../button/Button'
import { CarouselCard, type CarouselCardProps } from './CarouselCard'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-cards'

export type CarouselEffect = 'slide' | 'fade' | 'coverflow' | 'cards'

export interface CarouselProps {
    items?: CarouselCardProps[]
    images?: string[]
    effect?: CarouselEffect
    autoplay?: boolean
    loop?: boolean
    delay?: number
    slidesPerView?: number
    spaceBetween?: number
    centeredSlides?: boolean
    breakpoints?: Record<number, unknown>
    showNavigation?: boolean
    showPagination?: boolean
    buttonVariant?: ButtonVariant
    children?: React.ReactNode
    className?: string
}

export const Carousel: React.FC<CarouselProps> = ({
    items = [],
    images = [],
    effect = 'slide',
    autoplay = true,
    loop = true,
    delay = 3500,
    slidesPerView = 1,
    spaceBetween = 20,
    centeredSlides = false,
    breakpoints,
    showNavigation = true,
    showPagination = true,
    buttonVariant = 'floating',
    children,
    className = '',
}) => {
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

    const autoplayConfig = autoplay ? { delay, disableOnInteraction: false } : false

    return (
        <div className={`carousel carousel--effect-${effect} ${className}`}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade, EffectCoverflow, EffectCards]}
                effect={effect}
                slidesPerView={effect === 'cards' || effect === 'fade' ? 1 : slidesPerView}
                spaceBetween={spaceBetween}
                centeredSlides={centeredSlides}
                breakpoints={breakpoints as SwiperOptions['breakpoints']}

                autoplay={autoplayConfig}
                loop={loop}
                pagination={showPagination ? { clickable: true } : false}
                navigation={
                    showNavigation && prevEl && nextEl
                        ? { prevEl, nextEl }
                        : false
                }
            >

                {/* 1. Diapositivas Personalizadas */}
                {children}

                {/* 2. Lista de Items con CarouselCard */}
                {!children && items.length > 0 &&
                    items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <CarouselCard {...item} />
                        </SwiperSlide>
                    ))
                }

                {/* 3. Galería de Imágenes Pura */}
                {!children && items.length === 0 && images.length > 0 &&
                    images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="carousel-card">
                                <div className="carousel-card__image-container" style={{ aspectRatio: '16 / 9' }}>
                                    <img src={img} alt={`Galería ${index + 1}`} className="carousel-card__image" loading="lazy" />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {/* Botones de Navegación Personalizados con Referencias de Estado React */}
            {showNavigation && (
                <>
                    <button
                        ref={(node) => setPrevEl(node)}
                        className="carousel__nav carousel__nav--prev"
                        aria-label="Anterior"
                        style={{ border: 'none', background: 'transparent', padding: 0 }}
                    >
                        <Button
                            variant={buttonVariant}
                            isFloating
                            icon={<CaretLeftIcon size={24} />}
                        />
                    </button>

                    <button
                        ref={(node) => setNextEl(node)}
                        className="carousel__nav carousel__nav--next"
                        aria-label="Siguiente"
                        style={{ border: 'none', background: 'transparent', padding: 0 }}
                    >
                        <Button
                            variant={buttonVariant}
                            isFloating
                            icon={<CaretRightIcon size={24} />}
                        />
                    </button>
                </>
            )}
        </div>
    )
}
