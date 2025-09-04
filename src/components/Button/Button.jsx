// Reusable button with base styles and optional modifiers
import React from "react";
import './Button.scss';

export default function Button({ children, onClick, className = '', type = 'button', ...props }) {
return(
    <button className={`btn ${className}`} onClick={onClick} type={type} {...props}>
        {children}
    </button>
)
}