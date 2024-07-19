import { Loader } from 'lucide-react';
import React from 'react';

interface SimpleLoaderProps {
}

const SimpleLoader: React.FC<SimpleLoaderProps> = (props) => {
    return (
        <div className="flex items-center justify-center h-96">
            <Loader
                className='size-8 animate-spin'
                aria-label='Loading...'
            />
        </div>
    );
};

export default SimpleLoader;
