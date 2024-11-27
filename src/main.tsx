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
import { AuthLayuout } from './layout/Auth/AuthLayuout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

// eslint-disable-next-line react-refresh/only-export-components
const Menu = lazy(() => import('./pages/Menu//Menu.tsx'));

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <RequireAuth> <Layout /></RequireAuth>,
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
		},
		{
			path: '/auth',
			element: <AuthLayuout />,
			children: [
				{
					path: 'login',
					element: <Login />
				},
				{
					path: 'register',
					element: <Register />
				}
			]
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
		<Provider store={store}>
			<RouterProvider
				router={router}
				future={{
					v7_startTransition: true
				}}
			/>
		</Provider>
	</React.StrictMode>
);
