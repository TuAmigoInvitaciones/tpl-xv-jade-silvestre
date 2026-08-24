import React from 'react';
import { useDrawer } from '@/common/hooks';
import { DRAWER_NAMES } from '@/store/ui/drawer.slice';
import { GraduatesDrawer } from '@/modules/invitation/graduates/components/GraduatesDrawer';

export const DrawerMaster: React.FC = () => {
    const { isOpen, drawerName } = useDrawer();

    return (
        <>
            {isOpen && drawerName === DRAWER_NAMES.graduates && <GraduatesDrawer />}
        </>
    );
};
