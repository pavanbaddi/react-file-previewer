import React, {useState, useLayoutEffect}  from "react";
import { Store } from '@react-pdf-viewer/core';

export default function ReadingProgress({store}) {
    const [percentages, setPercentages] = useState(0);

    const handleScroll = (event) => {
        const target = event.target;
        if(target instanceof HTMLElement){
            const progress = Math.floor((100*target.scrollTop)/(target.scrollHeight-target.clientHeight));
            setPercentages(progress)
        }
    }

    const handlePagesContainer = () => {
        const getPagesContainer = store.get('getPagesContainer');
        if (!getPagesContainer) {
            return;
        }

        const pagesEle = getPagesContainer();
        pagesEle.addEventListener('scroll', handleScroll);
    };

    useLayoutEffect(() => {
        store.subscribe('getPagesContainer', handlePagesContainer);
        return () => store.unsubscribe('getPagesContainer', handlePagesContainer);
    }, []);

    return (
        <div
            style={{
                height: '4px',
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgb(53, 126, 221)',
                    height: '100%',
                    width: `${percentages}%`,
                }}
            />
        </div>
    );
}