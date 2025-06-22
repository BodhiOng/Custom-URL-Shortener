'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateError, setDuplicateError] = useState('');

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
      // if (data.error === 'DUPLICATE_ALIAS') {
      //   setDuplicateError(`The alias "${customAlias}" is already in use. Please choose a different one.`);
      //   setShowDuplicateModal(true);
      //   return;
      // }
      
      // Mock response - simulate duplicate alias check
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, let's pretend 'test' is already taken
      if (customAlias === 'test') {
        setDuplicateError(`The alias "${customAlias}" is already in use. Please choose a different one.`);
        setShowDuplicateModal(true);
        setIsLoading(false);
        return;
      }
      
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
  
  const closeDuplicateModal = () => {
    setShowDuplicateModal(false);
    setCustomAlias('');
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-gray-50">
      {/* Duplicate URL Modal */}
      {showDuplicateModal && (
        <>
          {/* Background overlay */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40"></div>
          
          {/* Modal container */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4 text-center">
              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              {/* Modal panel */}
              <div className="relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Duplicate Short URL</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{duplicateError}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={closeDuplicateModal}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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
              <div className="mt-6">
                {/* Tab-like display for the shortened URL */}
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  {/* Tab header */}
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                    <h3 className="font-medium text-gray-700">Your Shortened URL</h3>
                  </div>
                  
                  {/* Tab content */}
                  <div className="p-4 bg-white">
                    <div className="flex mb-4">
                      <input
                        type="text"
                        value={shortUrl}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md bg-white text-gray-700"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-600">This URL will never expire and is ready to share</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a 
                        href="/dashboard" 
                        className="text-blue-500 hover:text-blue-700 flex items-center"
                      >
                        <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        View all your shortened URLs
                      </a>
                    </div>
                  </div>
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
