import SimpleLoader from '@/components/simple-loader';
import React from 'react';

interface LoadingProps {
}

const Loading: React.FC<LoadingProps> = (props) => {
    return (
        <SimpleLoader />
    );
};

export default Loading;
