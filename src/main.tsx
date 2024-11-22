import { createRoot } from 'react-dom/client';
import './index.css';
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Layout } from './layout/Layout/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/api.ts';

const Menu = lazy(() => import('./pages/Menu//Menu.tsx'));

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '/',
					element: (
						<Suspense fallback={<>Загрузка...</>}>
							<Menu />
						</Suspense>
					)
				},
				{
					path: '/cart',
					element: <Cart />
				},
				{
					path: '/product/:id',
					element: <Product />,
					errorElement: <>Ошибка</>,
					loader: async ({ params }) => {
						await new Promise<void>((resolve) => {
							setTimeout(() => {
								resolve();
							}, 2000);
						});
						const { data } = await axios.get(
							`${PREFIX}/products/${params.id}`
						);
						return data;
					}
				}
			]
		},
		{
			path: '/cart',
			element: <Cart />
		},
		{
			path: '*',
			element: <ErrorPage />
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
