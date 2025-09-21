import React from 'react';

export default function AuthForm({ authMode, authForm, setAuthForm, handleAuthSubmit, authError, setAuthMode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <form
        onSubmit={handleAuthSubmit}
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-6 text-purple-400 font-semibold text-center">
          {authMode === 'login' ? 'Admin Login' : 'Admin Sign Up'}
        </h2>
        <label className="block mb-2">
          Username
          <input
            type="text"
            value={authForm.username}
            onChange={(e) =>
              setAuthForm({ ...authForm, username: e.target.value })
            }
            className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-100"
            required
          />
        </label>
        <label className="block mb-4">
          Password
          <input
            type="password"
            value={authForm.password}
            onChange={(e) =>
              setAuthForm({ ...authForm, password: e.target.value })
            }
            className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-100"
            required
          />
        </label>
        {authError && <p className="text-red-500 mb-4">{authError}</p>}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded"
        >
          {authMode === 'login' ? 'Login' : 'Sign Up'}
        </button>
        <p className="mt-4 text-center text-sm">
          {authMode === 'login' ? 'No account?' : 'Already have an account?'}{' '}
          <button
            type="button"
            className="text-purple-400 hover:underline"
            onClick={() =>
              setAuthMode(authMode === 'login' ? 'signup' : 'login')
            }
          >
            {authMode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}
