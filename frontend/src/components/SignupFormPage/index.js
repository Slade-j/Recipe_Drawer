// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import styles from './SignupFormPage.module.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

		const handleSubmit = (e) => {
			e.preventDefault();
			if (password === confirmPassword) {
				setErrors([]);
				return dispatch(sessionActions.signup({ username, password }))
					.catch(async (res) => {
						const data = await res.json();
						if (data && data.errors) setErrors(data.errors);
					});
			}
			return setErrors(['Confirm Password field must be the same as the Password field']);
		};

		return (
			<div className={styles.mainWrapper}>
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
							placeholder={'Password'}
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required/>
						<input
							placeholder={'Confirm Password'}
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required/>
						<button type="submit">Sign Up</button>
						<div className={styles.linkWrapper}>
							<span>Already have an account?</span>
							<NavLink
								className={styles.nav}
								exact={true}
								to={'/'}>
								Log in
							</NavLink>
						</div>
					</form>
				</div>
			</div>
		);
	}

	export default SignupFormPage;
