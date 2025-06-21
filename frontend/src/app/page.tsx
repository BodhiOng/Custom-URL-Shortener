'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);
    
    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This is a mock API call - in a real app, you would call your backend
      // const response = await fetch('/api/shorten', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ longUrl, customAlias }),
      // });
      // const data = await response.json();
      
      // Mock response
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockShortUrl = `short.url/${customAlias || Math.random().toString(36).substring(2, 7)}`;
      
      setShortUrl(mockShortUrl);
    } catch (err) {
      setError('Failed to create short URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-gray-50">
      <header className="w-full max-w-4xl flex justify-between items-center py-4">
        <div className="flex items-center">
          <svg 
            className="w-8 h-8 text-blue-500 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" 
            />
          </svg>
          <h1 className="text-xl font-bold text-gray-700">URL Shortener</h1>
        </div>
        <nav>
          <Link 
            href="/dashboard" 
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Dashboard
          </Link>
          <Link 
            href="/login" 
            className="ml-6 text-gray-600 hover:text-gray-800 font-medium"
          >
            Login
          </Link>
        </nav>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center justify-center flex-grow py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-gray-700">Shorten Your Links</h2>
          <p className="text-xl text-gray-600">
            Paste a link, get a short URL that never expires
          </p>
        </div>

        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Long URL
                </label>
                <input
                  id="longUrl"
                  type="url"
                  placeholder="https://example.com/very/long/url/that/needs/shortening"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="customAlias" className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Alias (Optional)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border border-r-0 border-gray-300 rounded-l-md">
                    short.url/
                  </span>
                  <input
                    id="customAlias"
                    type="text"
                    placeholder="my-custom-url"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    className="flex-1 px-4 py-3 text-black border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-medium text-center transition-colors disabled:bg-blue-300"
              >
                {isLoading ? 'Creating...' : 'Create Short URL'}
              </button>
            </form>
            
            {shortUrl && (
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-gray-600 mb-2">Your shortened URL:</p>
                <div className="flex">
                  <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md bg-white"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center py-8 text-gray-500 text-sm">
        <p>© {new Date().getFullYear().toString()} URL Shortener. All rights reserved.</p>
      </footer>
    </div>
  );
}
