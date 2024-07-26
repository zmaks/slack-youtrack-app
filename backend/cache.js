exports.cached = (entity, timeoutMin, dataFunction) => {
    if (!timeoutMin || timeoutMin <= 0 ) {
        return dataFunction();
    }
    const timeoutMs = timeoutMin * 60 * 1000
    const now = Date.now();
    if (entity.extensionProperties.cacheTimestamp
        && now - entity.extensionProperties.cacheTimestamp < timeoutMs) {
        return JSON.parse(entity.extensionProperties.cacheData);
    } else {
        const data = dataFunction();
        if (!data || data.error) return data;
        entity.extensionProperties.cacheData = JSON.stringify(data);
        entity.extensionProperties.cacheTimestamp = now;
        return data;
    }
}