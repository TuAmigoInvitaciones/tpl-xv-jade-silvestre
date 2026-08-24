import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { closeModal, openModal, setModalContent, type ModalName } from "@/store/ui/modal.slice"

export const useModal = () => {
    const dispatch: AppDispatch = useDispatch()
    const { isOpen, modalTitle, modalName, modalContent } = useSelector((state: RootState) => state.modal)

    const onOpenModal = (modalName: ModalName, modalTitle: string) => {
        dispatch(openModal({ modalName, modalTitle }))
    }

    const onCloseModal = () => {
        dispatch(closeModal())
    }

    const onSetModalContent = (content: string) => {
        dispatch(setModalContent(content))
    }

    return {
        isOpen,
        modalTitle,
        modalName,
        modalContent,

        onOpenModal,
        onCloseModal,
        onSetModalContent
    }
}