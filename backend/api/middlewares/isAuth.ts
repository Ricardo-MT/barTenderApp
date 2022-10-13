const isAuth = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    return res.status(403).json({
        'status': 403,
        'message': 'Access denied'
    });
}
export default isAuth;
