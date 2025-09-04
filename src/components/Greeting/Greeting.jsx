// Hero/Greeting section with background image and CTA
import React from 'react';
import './Greeting.scss';
import Button from '../Button/Button';

export default function Greeting({ image, title, subtitle }) {
  return (
    <section className="hero" aria-label="Intro">
      {/* Render the hero image as an <img> to allow priority loading and decoding hints */}
      {image && (
        <img
          src={image}
          alt="Background"
          loading="eager"
          decoding="sync"
          fetchpriority="high"
          className="hero__bg"
        />
      )}
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>
        <Button className="btn--pill" style={{ marginLeft: 12 }} onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}>Sign up</Button>

      </div>
    </section>
  );
}
