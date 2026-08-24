import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import {
    CheckCircleIcon,
    XCircleIcon,
    UserIcon,
    PhoneIcon,
    UsersIcon,
    BabyIcon,
    PlusIcon,
    MinusIcon,
    PaperPlaneRightIcon,
    ArrowCounterClockwiseIcon,
} from '@phosphor-icons/react'
import { Button } from '@/common/components/button/Button'
import { useInvitationConfig, useConfirmation } from '@/common/hooks'

export interface ConfirmationFormData {
    attending: 'si' | 'no'
    fullName: string
    phone: string
    adults: number
    children: number
}

interface Props {
    isQuantityFree?: boolean
}

export const ConfirmationSectionForm: React.FC<Props> = ({ isQuantityFree = false }) => {
    const { sections } = useInvitationConfig()
    const noKids = Boolean(sections.dressCode?.colors?.suggested && (sections.dressCode as Record<string, unknown>).noKids)

    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors },
    } = useForm<ConfirmationFormData>({
        defaultValues: {
            attending: 'si',
            fullName: '',
            phone: '',
            adults: 1,
            children: 0,
        },
        mode: 'onTouched',
    })

    const attending = useWatch({ control, name: 'attending' })
    const adults = useWatch({ control, name: 'adults' })
    const childrenCount = useWatch({ control, name: 'children' })

    const {
        isLoading,
        isSubmitted,
        submittedData,
        handleAttendingSelect,
        handleIncrementAdults,
        handleDecrementAdults,
        handleIncrementChildren,
        handleDecrementChildren,
        onSubmit,
        handleResetForm,
    } = useConfirmation({
        setValue,
        reset,
        adults: adults ?? 1,
        childrenCount: childrenCount ?? 0,
        attending,
        isQuantityFree,
        noKids,
    })

    if (isSubmitted && submittedData) {
        return (
            <div className="confirmation-form__success">
                <div className="confirmation-form__success-card">
                    {submittedData.attending === 'si' ? (
                        <>
                            <CheckCircleIcon size={56} className="confirmation-form__success-icon confirmation-form__success-icon--yes" />
                            <h3 className="confirmation-form__success-title">¡Asistencia Confirmada!</h3>
                            <p className="confirmation-form__success-desc">
                                Gracias <strong>{submittedData.fullName}</strong> por confirmar tu asistencia. ¡Nos dará mucho gusto verte en nuestro evento!
                            </p>
                        </>
                    ) : (
                        <>
                            <XCircleIcon size={56} className="confirmation-form__success-icon confirmation-form__success-icon--no" />
                            <h3 className="confirmation-form__success-title">Respuesta Registrada</h3>
                            <p className="confirmation-form__success-desc">
                                Gracias <strong>{submittedData.fullName}</strong> por avisarnos. Lamentamos que no puedas acompañarnos.
                            </p>
                        </>
                    )}

                    <div className="confirmation-form__actions">
                        <Button
                            type="button"
                            variant="outline"
                            radius="full"
                            onClick={handleResetForm}
                            icon={<ArrowCounterClockwiseIcon size={18} />}
                        >
                            Modificar Respuesta
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <form className="confirmation-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="confirmation-form__group">
                <label className="confirmation-form__label">
                    1. ¿Nos acompañarás en nuestro gran día? <span className="confirmation-form__required">*</span>
                </label>
                <div className="confirmation-form__attending-grid">
                    <button
                        type="button"
                        className={`confirmation-form__attending-btn ${attending === 'si' ? 'confirmation-form__attending-btn--active' : ''}`}
                        onClick={() => handleAttendingSelect('si')}
                    >
                        <CheckCircleIcon size={24} weight={attending === 'si' ? 'fill' : 'regular'} />
                        <span>Sí, asistiré</span>
                    </button>

                    <button
                        type="button"
                        className={`confirmation-form__attending-btn confirmation-form__attending-btn--no ${attending === 'no' ? 'confirmation-form__attending-btn--active' : ''}`}
                        onClick={() => handleAttendingSelect('no')}
                    >
                        <XCircleIcon size={24} weight={attending === 'no' ? 'fill' : 'regular'} />
                        <span>No podré asistir</span>
                    </button>
                </div>
            </div>

            <div className="confirmation-form__group">
                <label className="confirmation-form__label" htmlFor="fullName">
                    2. Nombre completo {isQuantityFree ? 'o de la familia' : ''} <span className="confirmation-form__required">*</span>
                </label>
                <div className="confirmation-form__input-wrapper">
                    <UserIcon className="confirmation-form__input-icon" size={20} />
                    <input
                        id="fullName"
                        type="text"
                        className={`confirmation-form__input ${errors.fullName ? 'confirmation-form__error' : ''}`}
                        placeholder={isQuantityFree ? 'Ej. Familia Pérez González / Juan Pérez' : 'Ej. María Rodríguez'}
                        {...register('fullName', {
                            required: 'Por favor ingresa tu nombre completo',
                            minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' },
                        })}
                    />
                </div>
                {errors.fullName && <span className="confirmation-form__error">{errors.fullName.message}</span>}
            </div>

            <div className="confirmation-form__group">
                <label className="confirmation-form__label" htmlFor="phone">
                    3. Número de teléfono <span className="confirmation-form__required">*</span>
                </label>
                <div className="confirmation-form__input-wrapper">
                    <PhoneIcon className="confirmation-form__input-icon" size={20} />
                    <input
                        id="phone"
                        type="tel"
                        className={`confirmation-form__input ${errors.phone ? 'confirmation-form__error' : ''}`}
                        placeholder="Ej. 449 123 4567"
                        {...register('phone', {
                            required: 'Por favor ingresa tu número de teléfono',
                            minLength: { value: 7, message: 'El número debe tener al menos 7 dígitos' },
                        })}
                    />
                </div>
                {errors.phone && <span className="confirmation-form__error">{errors.phone.message}</span>}
            </div>

            {isQuantityFree && (
                <>
                    <div className="confirmation-form__group">
                        <label className="confirmation-form__label">
                            4. Cantidad de adultos <span className="confirmation-form__required">*</span>
                        </label>
                        <div className="confirmation-form__counter-wrapper">
                            <div className="confirmation-form__counter-info">
                                <UsersIcon size={22} className="confirmation-form__counter-icon" />
                                <span className="confirmation-form__counter-title">Adultos</span>
                            </div>

                            <div className="confirmation-form__counter-controls">
                                <button
                                    type="button"
                                    className="confirmation-form__counter-btn"
                                    onClick={handleDecrementAdults}
                                    disabled={attending === 'no' || (adults ?? 0) <= 1}
                                    aria-label="Disminuir adultos"
                                >
                                    <MinusIcon size={16} weight="bold" />
                                </button>

                                <input
                                    id="adults"
                                    type="number"
                                    className="confirmation-form__counter-input"
                                    readOnly
                                    {...register('adults', {
                                        valueAsNumber: true,
                                        min: { value: attending === 'no' ? 0 : 1, message: 'Mínimo 1 adulto' },
                                    })}
                                />

                                <button
                                    type="button"
                                    className="confirmation-form__counter-btn"
                                    onClick={handleIncrementAdults}
                                    disabled={attending === 'no'}
                                    aria-label="Aumentar adultos"
                                >
                                    <PlusIcon size={16} weight="bold" />
                                </button>
                            </div>
                        </div>
                        {errors.adults && <span className="confirmation-form__error">{errors.adults.message}</span>}
                    </div>

                    {!noKids && (
                        <div className="confirmation-form__group">
                            <label className="confirmation-form__label">
                                5. Cantidad de niños
                            </label>
                            <div className="confirmation-form__counter-wrapper">
                                <div className="confirmation-form__counter-info">
                                    <BabyIcon size={22} className="confirmation-form__counter-icon" />
                                    <span className="confirmation-form__counter-title">Niños</span>
                                </div>

                                <div className="confirmation-form__counter-controls">
                                    <button
                                        type="button"
                                        className="confirmation-form__counter-btn"
                                        onClick={handleDecrementChildren}
                                        disabled={attending === 'no' || (childrenCount ?? 0) <= 0}
                                        aria-label="Disminuir niños"
                                    >
                                        <MinusIcon size={16} weight="bold" />
                                    </button>

                                    <input
                                        id="children"
                                        type="number"
                                        className="confirmation-form__counter-input"
                                        readOnly
                                        {...register('children', {
                                            valueAsNumber: true,
                                            min: { value: 0, message: 'La cantidad no puede ser negativa' },
                                        })}
                                    />

                                    <button
                                        type="button"
                                        className="confirmation-form__counter-btn"
                                        onClick={handleIncrementChildren}
                                        disabled={attending === 'no'}
                                        aria-label="Aumentar niños"
                                    >
                                        <PlusIcon size={16} weight="bold" />
                                    </button>
                                </div>
                            </div>
                            {errors.children && <span className="confirmation-form__error">{errors.children.message}</span>}
                        </div>
                    )}
                </>
            )}

            <div className="confirmation-form__actions">
                <Button
                    type="submit"
                    variant="secondary"
                    radius="full"
                    fullWidth
                    isLoading={isLoading}
                    icon={<PaperPlaneRightIcon size={20} weight="bold" />}
                >
                    Enviar Confirmación
                </Button>
            </div>
        </form>
    )
}
