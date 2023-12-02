// export const ImagePath = import.meta.env.REACT_APP_IMG_URL || ""
export const ImagePath = import.meta.env.VITE_APP_IMG_URL || "";



export const restrictHeader = ['login', 'sign-up']


export function restrictHeaderAndFooter() {
    const url = String(window.location.href).split('/').slice(3)
    const path = restrictHeader.filter((restrict) => url.includes(restrict))
    return path.length === 0 ? true : false
}

export function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

export function breadCrumbsCapitalize(string) {
    const text = (String(string).split(' ').map(spli=> capitalize(spli)).join(" ").split("-").map((spli) => {
        return capitalize(spli)
    })).join(' ').split('_').map((spli) => {
        return capitalize(spli)
    }).join(' ')
    return text
}