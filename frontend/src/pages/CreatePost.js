import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      await axios.post('http://localhost:8000/posts', { title, content });
      navigate('/posts');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">新しい記事を作成</h1>
      <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力"
            className="w-full p-2 mb-4 text-xl font-bold border-b focus:outline-none focus:border-blue-500"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="本文を入力"
            className="w-full p-2 min-h-[200px] resize-vertical focus:outline-none"
          />
          <div className="flex justify-end mt-4 pt-3 border-t">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 focus:outline-none focus:ring"
              disabled={!title.trim() || !content.trim()}
            >
              投稿する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;