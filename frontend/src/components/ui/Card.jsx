import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div 
            ref={ref}
            className={twMerge("glass-card", className)} 
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';

export default Card;
