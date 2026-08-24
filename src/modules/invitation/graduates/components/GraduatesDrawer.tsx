import React from 'react';
import { Drawer } from '@/common/components/drawer/Drawer';
import { Accordion } from '@/common/components/accordion/Accordion';
import { useGraduates } from '@/common/hooks';

export const GraduatesDrawer: React.FC = () => {
    const { careers } = useGraduates();

    const accordionItems = careers.map((career) => ({
        id: career.id,
        title: career.name,
        content: (
            <ul className="graduates-drawer__list">
                {career.graduates?.map((grad) => (
                    <li key={grad.id} className="graduates-drawer__item">
                        {grad.name}
                    </li>
                ))}
            </ul>
        )
    }));

    return (
        <Drawer>
            <div className="drawer-career-card">
                <p className="drawer-career-card__name">Lista de Participantes</p>
            </div>

            <div className="graduates-drawer__body">
                {accordionItems.length > 0 ? (
                    <Accordion items={accordionItems} variant="separated" />
                ) : (
                    <p className="graduates-drawer__empty">Próximamente...</p>
                )}
            </div>
        </Drawer>
    );
};
