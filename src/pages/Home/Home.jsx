// Home page: orchestrates header, hero, users list and sign-up form
import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import Header from '../../components/Header/Header';
import Greeting from '../../components/Greeting/Greeting';
import UsersBlock from '../../components/UsersBlock/UsersBlock';
// Keep the form lazy (below-the-fold), load UsersBlock eagerly to avoid placeholder shifts
const Form = lazy(() => import('../../components/Form/Form'));
import { getUsers } from '../../api/userApi';
import backgroundImage from '../../assets/pexels-alexandr-podvalny-1227513.jpeg';
import './Home.scss';

export default function Home() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const count = 6; // users per page

  const fetchPage = useCallback(async (targetPage = 1, append = false) => {
    try {
      setLoading(true);
      setErr('');
      const data = await getUsers({ page: targetPage, count });
      // keep newest first (defensive sort by registration_timestamp)
      const sortedUsers = [...data.users].sort(
        (a, b) => new Date(b.registration_timestamp) - new Date(a.registration_timestamp)
      );
      const nextUsers = append ? [...users, ...sortedUsers] : sortedUsers;
      setUsers(nextUsers);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (e) {
      setErr('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [users]);

  useEffect(() => {
    fetchPage(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasMore = totalPages ? page < totalPages : false;

  const showMore = () => {
    if (!hasMore) return;
    fetchPage(page + 1, true);
  };

  // After successful registration reload first page so new user appears first
  const handleRegistered = async () => {
  try {
    setLoading(true);
    // Reset to page 1 and clear existing users
    setUsers([]);
    setPage(1);
    await fetchPage(1, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    setErr('Failed to refresh users');
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Header />
      <Greeting
        image={backgroundImage}
        title="Test assignment for front-end developer"
        subtitle="What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving."
      />

      <main className="home">
        <UsersBlock
          users={users}
          isLoading={loading}
          error={err}
          onShowMore={showMore}
          hasMore={hasMore}
        />

        <Suspense fallback={<div style={{textAlign:'center', padding: 20}}>Loading form…</div>}>
          <Form onSuccess={handleRegistered} />
        </Suspense>
      </main>
    </>
  );
}
