import { createRoot } from 'react-dom/client';
import './index.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Menu } from './pages/Menu/Menu.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Layout } from './layout/Layout/Layout.tsx';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <Menu />
				},
				{
					path: '/cart',
					element: <Cart />
				}
			]
		},
		{
			path: '/cart',
			element: <Cart />
		},
		{
			path: '*',
			element: <Error />
		}
	],
	{
		future: {
			v7_relativeSplatPath: true,
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_skipActionErrorRevalidation: true
		}
	}
);

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider
			router={router}
			future={{
				v7_startTransition: true
			}}
		/>
	</React.StrictMode>
);
