import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:8000/posts');
    setPosts(response.data.reverse());
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:8000/posts/${editingPost.id}`, {
      title: editTitle,
      content: editContent
    });
    setEditingPost(null);
    fetchPosts();
  };

  const handleDelete = async (postId) => {
    if (window.confirm('本当にこの投稿を削除しますか？')) {
      await axios.delete(`http://localhost:8000/posts/${postId}`);
      fetchPosts();
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">ブログ記事一覧</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">まだ記事がありません。</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                {editingPost && editingPost.id === post.id ? (
                  <div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-2 mb-4 text-xl font-bold border-b focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 min-h-[100px] mb-4 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <div>
                      <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">更新</button>
                      <button onClick={() => setEditingPost(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">キャンセル</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div>
                      <button onClick={() => handleEdit(post)} className="text-blue-500 mr-2 hover:underline">編集</button>
                      <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:underline">削除</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;