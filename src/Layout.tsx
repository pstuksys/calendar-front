import React, { lazy, Suspense } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { closeModal } from './redux/features/modalSlice';

const LazyModal = lazy(() => import('./components/modal/index'));

const Layout = ({ children }: { children: React.ReactNode }) => {
    const store = useAppSelector((st)=>st.modal);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(closeModal());
    };

    return(
        <>
            {children}
            <Suspense fallback={<>Kraunama...</>}>
                <LazyModal onClose={handleClose} {...store} children={store.content} />
            </Suspense>
         </>
    )
}

export default Layout