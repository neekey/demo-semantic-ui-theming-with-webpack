function requireAll(requireContext) {
  return requireContext.keys().map(key => requireContext(key).default);
}
// requires and returns all modules that match
export default requireAll(require.context('app/pages', true, /.+\/route\.js$/));
