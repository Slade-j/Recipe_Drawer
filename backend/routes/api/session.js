// backend/routes/api/session.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('username')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors,
  ];

// Log in
router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res, next) => {
      const { username, password } = req.body;

      const user = await User.login({ username, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

    return res.json({ user });
}));

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // Restore session user
  router.get('/', restoreUser, (req, res) => {
      const { user } = req;
      if (user) return res.json({ user: user.toSafeObject() });
      else return res.json({});
    }
  );


module.exports = router;
