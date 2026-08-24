import React from 'react'

export interface CarouselCardProps {
    image: string
    title?: string
    description?: string
    date?: string
    badge?: string
    alt?: string
    className?: string
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
    image,
    title,
    description,
    date,
    badge,
    alt,
    className = '',
}) => {
    return (
        <article className={`carousel-card ${className}`}>
            <div className="carousel-card__image-container">
                <img src={image} alt={alt || title || 'Imagen de carrusel'} className="carousel-card__image" loading="lazy" />
                {!!badge && <span className="carousel-card__badge">{badge}</span>}
            </div>

            {(!!date || !!title || !!description) && (
                <div className="carousel-card__content">
                    {!!date && <p className="carousel-card__date">{date}</p>}
                    {!!title && <h3 className="carousel-card__title">{title}</h3>}
                    {!!description && <p className="carousel-card__description">{description}</p>}
                </div>
            )}
        </article>
    )
}
