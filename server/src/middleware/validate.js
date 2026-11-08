import mongoose from 'mongoose';

// Small helpers shared by the route files (categories, programs, services, career services, enquiries).

// Use on routes that have :id in the address, e.g. router.put('/:id', requireAuth, validId, ...)
// An id that is not a real MongoDB id answers "404 Not found" instead of crashing.
export function validId(req, res, next) {
  return mongoose.isValidObjectId(req.params.id) ? next() : res.status(404).json({ message: 'Not found' });
}

// Answers "400" with the list of problems when a zod check fails:
//   const parsed = someSchema.safeParse(req.body);
//   if (!parsed.success) return invalid(res, parsed);
export function invalid(res, parsed) {
  return res.status(400).json({ message: 'Please check the highlighted fields.', errors: parsed.error.flatten().fieldErrors });
}
