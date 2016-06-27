/**
 * test entry for browser specs.
 */
const context = require.context('..', true, /specs\/.+\.spec\.js$/);

context.keys().forEach(context);

module.exports = context;