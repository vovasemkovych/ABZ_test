// Sign up form with client-side validation and ABZ API integration
import React, { useEffect, useState } from 'react';
import { getPositions, createUser } from '../../api/userApi';
import Button from '../Button/Button';
import './Form.scss';
import Popup from '../Popup/Popup';
import successImg from '../../assets/success-image.svg';

const initial = {
  name: '',
  email: '',
  phone: '',
  position_id: '',
  photo: null,
};

export default function SignUpForm({ onSuccess }) {
  const [form, setForm] = useState(initial);
  const [positions, setPositions] = useState([]);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Load positions for radios
  useEffect(() => {
    (async () => {
      try {
        setLoadingPositions(true);
        const data = await getPositions();
        setPositions(data?.positions || []);
      } catch (e) {
        setError('Failed to load positions');
      } finally {
        setLoadingPositions(false);
      }
    })();
  }, []);

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  // Front-end validation aligned with common ABZ rules:
  // name: 2..60 chars
  // email: valid format
  // phone: "+380" + 9 digits (they accept 380XXXXXXXXX too)
  // position_id: required
  // photo: <= 5MB, type jpeg/jpg (API accepts jpeg; avoid svg)
  const validators = {
    name: (v) => v.trim().length >= 2 && v.trim().length <= 60,
    email: (v) => /\S+@\S+\.\S+/.test(v),
    phone: (v) => /^(\+?380)\d{9}$/.test(v.trim()),
    position_id: (v) => !!v,
    photo: (f) => !!f && f.size <= 5 * 1024 * 1024 && /jpe?g$/i.test(f.name),
  };

  const isValid = Object.entries(validators).every(([k, fn]) => fn(form[k]));

  const onInput = (e) => {
    const { name, value, files, type } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    if (type === 'file') {
      setField('photo', files?.[0] || null);
    } else {
      setField(name, value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    // quick check to surface inline errors
    if (!isValid) {
      setTouched({ name: true, email: true, phone: true, position_id: true, photo: true });
      return;
    }
    try {
      setSubmitting(true);
      const res = await createUser({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim().replace(/^0+/, ''), // keep intl
        position_id: form.position_id,
        photo: form.photo,
      });
      if (res?.success) {
        setForm(initial);
        setTouched({});
        setShowSuccess(true);
        onSuccess?.();
      } else {
        setError(res?.message || 'Registration failed');
      }
    } catch (err) {
      const apiMsg =
        err?.response?.data?.message ||
        Object.values(err?.response?.data?.fails || {})?.[0]?.[0] ||
        err?.message;
      setError(apiMsg || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const showErr = (name) => touched[name] && !validators[name](form[name]);

  return (
    <section className="signup-wrap" id="signup">
      <h2 className="signup-wrap__title">Working with POST request</h2>

      <Popup open={showSuccess} onClose={() => setShowSuccess(false)}>
        <img src={successImg} alt="Success" width="64" height="64" />
        <h3 style={{margin: '8px 0 4px', color: '#222'}}>Registration successful!</h3>
        <p style={{marginBottom:'8px', color:'#555'}}>Your account has been created.</p>
      </Popup>

      <form className="signup" onSubmit={submit} noValidate>
        <div className={`field ${showErr('name') ? 'field--error' : ''}`}>
          <input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={onInput}
          />
          {showErr('name') && <span className="hint">Name should be 2–60 characters</span>}
        </div>

        <div className={`field ${showErr('email') ? 'field--error' : ''}`}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onInput}
          />
          {showErr('email') && <span className="hint">Enter a valid email</span>}
        </div>

        <div className={`field ${showErr('phone') ? 'field--error' : ''}`}>
          <input
            name="phone"
            placeholder="Phone (e.g. +380501234567)"
            value={form.phone}
            onChange={onInput}
          />
          {showErr('phone') && <span className="hint">Format: +380XXXXXXXXX</span>}
        </div>

        <fieldset className="radio-group">
          <legend>Select your position</legend>
          {loadingPositions && <div className="muted">Loading positions…</div>}
          {!loadingPositions &&
            positions.map((p) => (
              <label key={p.id} className="radio">
                <input
                  type="radio"
                  name="position_id"
                  value={p.id}
                  checked={String(form.position_id) === String(p.id)}
                  onChange={onInput}
                />
                <span>{p.name}</span>
              </label>
            ))}
          {showErr('position_id') && <div className="hint">Please select a position</div>}
        </fieldset>

        <div className={`file ${showErr('photo') ? 'file--error' : ''}`}>
          <label className="upload">
            <span className="upload__btn">Upload</span>
            <input
              type="file"
              name="photo"
              accept="image/jpeg,image/jpg"
              onChange={onInput}
              hidden
            />
          </label>
          <span className="upload__filename">
            {form.photo ? form.photo.name : 'Upload your photo (JPEG, ≤5MB)'}
          </span>
          {showErr('photo') && <div className="hint">JPEG only, size ≤ 5MB</div>}
        </div>

        {error && <div className="form-error">{error}</div>}

        <Button className="btn--pill" type="submit" disabled={!isValid || submitting}>
          {submitting ? 'Signing…' : 'Sign up'}
        </Button>
      </form>
    </section>
  );
}
