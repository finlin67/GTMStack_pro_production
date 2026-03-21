/**
 * ensure-next-dev-manifest.js is already invoked by the `dev` npm script
 * (`node scripts/ensure-next-dev-manifest.js && next dev --webpack`) before
 * Next.js starts, so nothing needs to happen here at runtime.
 */
exports.register = async function register() {}
