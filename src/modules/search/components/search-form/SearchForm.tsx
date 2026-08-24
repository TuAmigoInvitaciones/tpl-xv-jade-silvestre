import React from 'react'
import { useForm } from 'react-hook-form'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useTicket, useNavigation } from '@/common/hooks'
import { Button } from '@/common/components/button/Button'

interface TicketSearch {
    keyPass: string
}

export const SearchForm: React.FC = () => {
    const { goTo } = useNavigation()
    const { onGetTicket, isLoading } = useTicket()
    const { register, handleSubmit, formState: { errors } } = useForm<TicketSearch>({
        defaultValues: { keyPass: '' }
    })

    const onSubmit = async (data: TicketSearch) => {
        const isSuccess = await onGetTicket(data.keyPass)
        if (isSuccess) {
            goTo('/envelop')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
            <div className="search-form__field">
                <label htmlFor="keyPass" className="search-form__label">
                    Ingresa tu clave de acceso
                </label>

                <input
                    {...register('keyPass', {
                        required: 'Por favor, ingresa tu clave de acceso',
                        validate: (val) => (val && val.trim().length > 0) || 'Por favor, ingresa una clave de acceso válida',
                        minLength: { value: 4, message: 'La clave de acceso debe tener al menos 4 caracteres' },
                    })}
                    type="text"
                    className="search-form__input"
                    id="keyPass"
                    placeholder="Ej: abc123"
                    autoComplete="off"
                    disabled={isLoading}
                />
                {errors.keyPass && (
                    <span className="search-form__error">
                        {errors.keyPass.message}
                    </span>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    radius="full"
                    icon={<MagnifyingGlassIcon size={18} weight="bold" />}
                    aria-label="Buscar invitación"
                    isLoading={isLoading}
                >
                    BUSCAR INVITACIÓN
                </Button>
            </div>
        </form>
    )
}
