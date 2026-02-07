// MVP: Dummy auth middleware — no real authentication
// Injects a fake user into req.user so controllers work without Firebase

export const dummyAuth = (req, res, next) => {
  req.user = {
    uid: 'demo-user-001',
    fullName: 'Demo User',
    email: 'demo@vault.app',
  };
  next();
};
