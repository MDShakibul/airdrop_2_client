/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hook';
import { toast } from 'react-toastify';

const Login = () => {
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		if (!address.trim()) {
			setError('Address field cannot be empty');
			return;
		}

		setError('');
		setLoading(true);

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_BASE}/user/login`,
				{
					address: address,
				}
			);

			console.log(res);

			if (res.status === 200) {
				dispatch(
					login({
						wallet_address: res?.data?.data?.wallet_address,
						ref_code: res?.data?.data?.refer_code,
					})
				);
                toast.success("Login Successful!");
				navigate('/dashboard');
			} else {
				setError('Invalid address or login failed');
			}
		} catch (err) {
			setError('Error logging in. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-[70vh]">
			{/* Card is wider now */}
			<div className="card w-full max-w-lg shadow-2xl bg-base-100 p-6">
				<div className="card-body">
					<h2 className="text-2xl font-bold text-center">Login</h2>

					{error && <p className="text-error text-sm">{error}</p>}

					<div className="form-control">
						<label className="label">
							<span className="label-text">Address</span>
						</label>
						{/* Input is longer now */}
						<input
							type="text"
							placeholder="Enter your address"
							className="input input-bordered w-full"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</div>

					<div className="form-control mt-4 flex items-center justify-center">
						<button
							className={`btn btn-primary ${loading ? 'loading' : ''}`}
							onClick={handleLogin}
							disabled={loading}
						>
							{loading ? 'Loading...' : 'Login'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
