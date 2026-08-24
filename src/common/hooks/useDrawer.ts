import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { closeDrawer, openDrawer, type DrawerName } from "@/store/ui/drawer.slice";

export const useDrawer = () => {
    const dispatch: AppDispatch = useDispatch();
    const { isOpen, drawerTitle, drawerName } = useSelector((state: RootState) => state.drawer);

    const onOpenDrawer = (drawerName: DrawerName, drawerTitle: string) => {
        dispatch(openDrawer({ drawerName, drawerTitle }));
    };

    const onCloseDrawer = () => {
        dispatch(closeDrawer());
    };

    return {
        isOpen,
        drawerTitle,
        drawerName,

        onOpenDrawer,
        onCloseDrawer
    };
};
