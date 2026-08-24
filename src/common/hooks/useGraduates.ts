import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export const useGraduates = () => {
    const { careers } = useSelector((state: RootState) => state.graduates);

    return {
        careers,
    };
};
