import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) { alert("Error fetching posts"); }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body })
    });
    if (res.ok) { fetchPosts(); setTitle(''); setBody(''); }
  };

  const deletePost = async (id) => {
    await fetch(`http://127.0.0.1:8000/posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center', color: '#333' }}>
      <h1>MyPustak</h1>
      
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} required />
        <button type="submit">Add Post</button>
      </form>

      {loading ? <p>Loading...</p> : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;