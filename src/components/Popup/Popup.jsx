import React, { useEffect } from 'react';
import './Popup.scss';

export default function Popup({ open, onClose, children, autoCloseMs = 2500 }) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      onClose?.();
    }, autoCloseMs);
    return () => clearTimeout(id);
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  return (
    <div className="popup" role="dialog" aria-modal="true">
      <div className="popup__backdrop" onClick={onClose} />
      <div className="popup__content" role="document">
        <button className="popup__close" aria-label="Close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}


