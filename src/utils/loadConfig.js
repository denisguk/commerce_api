function loadConfig(configFile, version = process.env.NODE_ENV || 'dev') {
    return require( `../config/${configFile}.${version}.js`).default;
}

export default loadConfig;
