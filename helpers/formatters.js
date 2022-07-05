/**
 * Get pm2 app display name.
 * If the app is running in cluster mode, id will append [pm_id] as the suffix.
 *
 * @param {object} process
 * @returns {string} name
 */
module.exports.parseProcessName = function parseProcessName(process) {
    return process.name + (process.exec_mode === 'cluster_mode' && process.instances > 1 ? `[${process.pm_id}]` : '');
}   
