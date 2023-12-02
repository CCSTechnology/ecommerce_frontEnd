// export const ImagePath = import.meta.env.REACT_APP_IMG_URL || ""
export const ImagePath = import.meta.env.VITE_APP_IMG_URL || "";



export const restrictHeader = ['login', 'sign-up']


export function restrictHeaderAndFooter(){
    const url = String(window.location.href).split('/').slice(3)
    const path = restrictHeader.filter((restrict)=> url.includes(restrict))
    return path.length === 0 ? true : false
}