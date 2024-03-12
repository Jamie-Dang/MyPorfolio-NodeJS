function isActiveRoute(route, currentRoute) {
    return route === currentRoute ? 'Active' : '';
}

module.exports = { isActiveRoute };
