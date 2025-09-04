
// Users list section with load-more behavior
import React from 'react';
import UserCard from '../UserCard/UserCard';
import Button from '../Button/Button';
import './UsersBlock.scss';

export default function UsersSection({
  users,
  isLoading,
  error,
  onShowMore,
  hasMore,
}) {
  return (
    <section className="users-section" id="users" aria-label="Users">
      <h2 className="users-section__title">Working with GET request</h2>

      {isLoading && !users.length && <p className="users-section__status">Loading…</p>}
      {error && <p className="users-section__status users-section__status--error">{error}</p>}

      <div className="users-grid">
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>

      {hasMore && (
        <div className="users-section__more">
          <Button onClick={onShowMore} className="btn--pill" style={{ width: '120px' }}>Show more</Button>
        </div>
      )}
    </section>
  );
}
