export const setSessionStorage = (key, varToSet) => {
    localStorage.setItem(key, window.btoa(varToSet))
}
export const getSessionStorage = (key) => {
    if (typeof window !== 'undefined') {
        const getStorage = localStorage.getItem(key)
        try {
            return getStorage ? window.atob(getStorage) : false
        } catch (e) {
            return false
        }
    }
}
export const removeSessionStorage = (key) => {
    localStorage.removeItem(key)
}
export const unsetSessionStorage = () => {
    localStorage.clear()
}