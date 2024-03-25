import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ClientPortalInterface = {
    children: React.ReactNode;
    show?: boolean;
    selector: string;
};

export default function ClientPortal({ children, selector, show }: ClientPortalInterface) {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        ref.current = document.getElementById(selector);
    }, [selector]);

    return (show && ref.current) ? createPortal(children, ref.current) : null;
};
