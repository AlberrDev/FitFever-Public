export function getUsernameFromCookie() {
    let username = "";

    // Obtener las cookies
    const cookies = document.cookie;

    // Verificar si existe la cookie "userInfo"
    if (document.cookie.indexOf("userInfo") !== -1) {
        // Obtener el valor de la cookie "userInfo"
        const TokensUser = cookies
            .split('; ')
            .find(row => row.startsWith('userInfo='))
            .split('=')[1];
        // Convertir el valor de la cookie en un objeto JavaScript
        const userInfo = JSON.parse(TokensUser);
        // Asignar el valor del username
        username = userInfo.username;
        // Imprimir el valor del username
    } else {
        console.log('No se encontró la cookie.');
    }

    return username;
}