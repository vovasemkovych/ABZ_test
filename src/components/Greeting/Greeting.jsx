// Hero/Greeting section with background image and CTA
import React from 'react';
import './Greeting.scss';
import Button from '../Button/Button';

export default function Greeting({ image, title, subtitle }) {
  const style = image ? { backgroundImage: `url(${image})` } : {};
  return (
    <section className="hero" style={style} aria-label="Intro">
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>
        <Button className="btn--pill" style={{ marginLeft: 12 }} onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}>Sign up</Button>

      </div>
    </section>
  );
}
