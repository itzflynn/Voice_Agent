import React from 'react';

// Types for the button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
    variant = 'default',
    size = 'md',
    children,
    ...props
}) => {
    // Define base styles
    let baseStyle = 'p-2 rounded focus:outline-none focus:ring focus:ring-opacity-50';
    
    // Variants
    const variantStyles = {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white',
        ghost: 'bg-transparent text-blue-500 hover:bg-blue-100',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
    };
    
    // Sizes
    const sizeStyles = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };
    
    // Combine styles
    const buttonStyles = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]}`;
    
    return (
        <button className={buttonStyles} {...props}>
            {children}
        </button>
    );
};

export default Button;