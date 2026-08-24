import React from "react";
import { XIcon } from "@phosphor-icons/react";
import { useDrawer } from "@/common/hooks";

interface Props {
    children: React.ReactNode;
}

export const Drawer: React.FC<Props> = ({ children }) => {
    const { onCloseDrawer, isOpen } = useDrawer();

    if (!isOpen) return null;

    return (
        <div className="drawer-overlay" onClick={onCloseDrawer}>
            <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="drawer-close-btn"
                    onClick={onCloseDrawer}
                    aria-label="Cerrar"
                >
                    <XIcon size={20} weight="bold" />
                </button>
                <div className="drawer-body">
                    {children}
                </div>
            </div>
        </div>
    );
};
