'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define TypeScript interface for URL data
interface ShortUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
}

export default function Dashboard() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingUrl, setEditingUrl] = useState<ShortUrl | null>(null);
  const [newAlias, setNewAlias] = useState('');
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateError, setDuplicateError] = useState('');
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    // In a real app, you would check if the user is authenticated
    // For example, check if a token exists in localStorage
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   router.push('/login');
    //   return;
    // }
    // setIsAuthenticated(true);

    // For demo purposes, we'll just set isAuthenticated to true
    setIsAuthenticated(true);
    fetchUrls();
  }, [router]);

  const fetchUrls = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch from your API
      // const response = await fetch('/api/urls', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const data = await response.json();
      // setUrls(data);

      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 500));
      setUrls([
        {
          id: '1',
          originalUrl: 'https://example.com/very/long/url/that/needs/shortening/1',
          shortCode: 'abc123',
          createdAt: '2025-06-20T10:30:00Z',
        },
        {
          id: '2',
          originalUrl: 'https://example.com/another/very/long/url/that/needs/shortening/2',
          shortCode: 'def456',
          createdAt: '2025-06-21T14:15:00Z',
        },
        {
          id: '3',
          originalUrl: 'https://example.com/yet/another/long/url/3',
          shortCode: 'ghi789',
          createdAt: '2025-06-22T09:45:00Z',
        }
      ]);
    } catch (err) {
      setError('Failed to fetch your URLs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this URL?')) return;

    try {
      // In a real app, you would call your API
      // await fetch(`/api/urls/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });

      // Mock successful deletion
      await new Promise(resolve => setTimeout(resolve, 300));
      setUrls(urls.filter(url => url.id !== id));
    } catch (err) {
      setError('Failed to delete URL');
      console.error(err);
    }
  };

  const startEditing = (url: ShortUrl) => {
    setEditingUrl(url);
    setNewAlias(url.shortCode);
  };

  const cancelEditing = () => {
    setEditingUrl(null);
    setNewAlias('');
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUrl) return;

    try {
      // Check if the alias already exists (except for the current URL)
      const isDuplicate = urls.some(url => 
        url.shortCode === newAlias && url.id !== editingUrl.id
      );

      if (isDuplicate) {
        setDuplicateError(`The alias "${newAlias}" is already in use. Please choose a different one.`);
        setShowDuplicateModal(true);
        return;
      }

      // In a real app, you would call your API
      // const response = await fetch(`/api/urls/${editingUrl.id}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({ shortCode: newAlias })
      // });
      // 
      // if (!response.ok) {
      //   const data = await response.json();
      //   if (data.error === 'duplicate_alias') {
      //     setDuplicateError(`The alias "${newAlias}" is already in use. Please choose a different one.`);
      //     setShowDuplicateModal(true);
      //     return;
      //   }
      //   throw new Error(data.message || 'Failed to update URL');
      // }

      // Mock successful update
      await new Promise(resolve => setTimeout(resolve, 300));
      setUrls(urls.map(url => 
        url.id === editingUrl.id ? { ...url, shortCode: newAlias } : url
      ));
      setEditingUrl(null);
    } catch (err) {
      setError('Failed to update URL');
      console.error(err);
    }
  };
  
  const closeDuplicateModal = () => {
    setShowDuplicateModal(false);
  };

  const copyToClipboard = (shortCode: string) => {
    const fullUrl = `short.url/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    // In a real app, you would clear the token
    // localStorage.removeItem('token');
    router.push('/login');
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
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
            </Link>
          </div>
          <nav className="flex items-center">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-800 font-medium mr-6"
            >
              Home
            </Link>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Your Shortened URLs
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              href="/"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New URL
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : urls.length === 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No URLs found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new shortened URL.</p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create URL
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Short URL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {urls.map((url) => (
                    <tr key={url.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="max-w-xs truncate">
                          <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {url.originalUrl}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {editingUrl && editingUrl.id === url.id ? (
                          <form onSubmit={handleEdit} className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <span className="text-gray-500">short.url/</span>
                              <input
                                type="text"
                                value={newAlias}
                                onChange={(e) => setNewAlias(e.target.value)}
                                className="ml-1 border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter new alias"
                                required
                              />
                            </div>
                            <button
                              type="submit"
                              className="inline-flex items-center p-1 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditing}
                              className="inline-flex items-center p-1 border border-transparent rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </form>
                        ) : (
                          <div className="flex items-center">
                            <a 
                              href={url.originalUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline"
                            >
                              short.url/{url.shortCode}
                            </a>
                            <button
                              onClick={() => copyToClipboard(url.shortCode)}
                              className="ml-2 text-gray-400 hover:text-gray-600"
                              title="Copy to clipboard"
                            >
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatDate(url.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingUrl && editingUrl.id === url.id ? null : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditing(url)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(url.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
