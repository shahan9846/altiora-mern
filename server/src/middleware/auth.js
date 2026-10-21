import jwt from 'jsonwebtoken';

export function signToken(user) {
  return jwt.sign({ sub: String(user._id), email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
}

// Protects admin routes: expects "Authorization: Bearer <token>".
export function requireAuth(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Not signed in' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Session expired, please sign in again' });
  }
}
