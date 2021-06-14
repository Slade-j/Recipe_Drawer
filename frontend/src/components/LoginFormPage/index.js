// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import styles from './LoginFormPage.module.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
			return (
        <Redirect to='/recipe' />
    	)
		}

		const handleSubmit = (e) => {
			e.preventDefault();
			setErrors([]);
			return dispatch(sessionActions.login({ username, password }))
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
				});
		}

		const handleDemo = () => {
			return dispatch(sessionActions.login({ username: 'Demo-user', password: 'Demopasswordq9!' }))
		}

		return (
			<div className={styles.mainWrapper} >
				<div className={styles.formWrapper}>
					<div className={styles.titleWrapper}>
						<h2 className={styles.title}>Recipe Drawer</h2>
					</div>
					<form className={styles.form} onSubmit={handleSubmit}>
						<ul>
							{errors.map((error, idx) => <li key={idx}>{error}</li>)}
						</ul>
						<input
							placeholder={'Username'}
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required/>
						<input
							placeholder={'password'}
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required/>
						<button type="submit">Log In</button>
					</form>
					<div className={styles.demoWrapper}>
						<button className={styles.demo} onClick={handleDemo}>Demo User</button>
					</div>
					<div className={styles.linkWrapper}>
						<span>Don't have an account?</span>
						<NavLink
							className={styles.nav}
							exact={true}
							to={'/signup'}>
							Signup
						</NavLink>
					</div>
				</div>
			</div>
		);
	}

export default LoginFormPage;
