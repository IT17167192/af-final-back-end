//userSignupValidator middleware implementation
exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must between 3 to 50 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @ sign')
        .isLength({
            min: 3,
            max: 50
        });
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({
            min: 6
        })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');

    const errors = req.validationErrors();

    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
};

exports.doctorValidator = (req, res, next) => {
    req.check('name', 'Doctor name must be added!').notEmpty()
        .isLength({
            min: 1,
        })
        .withMessage('Doctor name cannot be empty');

    req.check('specialization', 'Specialization must be added!').notEmpty()
        .isLength({
            min: 1,
        })
        .withMessage('Specialization cannot be empty');

    req.check('maxPatientsPerDay', 'Max patients must be added!').notEmpty()
        .isLength({
            min: 1,
        })
        .withMessage('Max patients cannot be empty');

    req.check('availableWeekDay', 'Available weekday must be added!').notEmpty()
        .isLength({
            min: 1,
        })
        .withMessage('Available weekday cannot be empty');

    req.check('availableTime', 'Available time must be added!').notEmpty()
        .isLength({
            min: 1,
        })
        .withMessage('Available time cannot be empty');

    const catErr = req.validationErrors();

    if (catErr) {
        const catNameError = catErr.map(catErr => catErr.msg)[0];
        return res.status(400).json({error: catNameError});
    }
    next();
};
