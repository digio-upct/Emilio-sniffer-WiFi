//Funcion para sacar el subtipo de la trama 802.11
//(El tipo será mgt porque así está especificado en el filtro de pcap)
//si el primer byte del campo Frame Control del MAC Header, justo después del RadioTap
// (4 bits de subtype, 2 de Type y 2 de version) es:
// 0100 0000 es de tipo probe request
// 1000 0000 es de tipo Beacon
const parseType = (bytes, l_RT) => {
    if (bytes[l_RT] == 64) {
        return 'PROBE REQUEST';
    }
    if (bytes[l_RT] == 128) {
        return 'BEACON';
    }
    return 'otro tipo';

}

// Sacamos el SSID
const parseSSID = (bytes, l_RT, type) => {

    var SSID_start;

    if (type === 'BEACON') {
        SSID_start = l_RT + 36; // Si Beacon bit 36 a partir del final del RadioTap
    } else {
        SSID_start = l_RT + 24; // Si Probe Request bit 24 a partir del final del RadioTap
    }

    var result;

    if (bytes[SSID_start] === 0) { // el campo number debe ser 0
        var length = bytes[SSID_start + 1]; // siguiente byte es la longitud del SSID
        if (length > 0) {
            result = '';
            //decodificamos SSID
            for (var i = SSID_start + 2; i < SSID_start + 2 + length; i++) {
                result += String.fromCharCode(bytes[i]);
            }
        } else { // si length SSID = 0 es que el SSID no se está transmitiendo
            return 'SSID oculto o desconocido';
        }
    }
    return result;
}

//Potencia recibida
const parseRSSI = (bytes, l_RT) => {
    // en el byte 26, contando desde el final del radioTap.
    // He comprobado que el radio tap no siempre tiene la misma longitud,
    // hay algunos bytes que pueden variar antes del campo  de la señal,
    // así que si cuento desde el final hacia atras siempre está en el mismo sitio
    return bytes.readInt8(l_RT - 26);

}

//MAC de origen
const parseSourceMAC = (bytes, l_RT) => {

    var MAC_start = l_RT + 10; //empieza en byte 10 a partir de fin radioTap
    var result = `${ bytes.toString('hex', MAC_start, MAC_start + 1)}`; //primer byte

    //siguientes 5 bytes, anteponiendo ':'
    for (var i = MAC_start + 1; i < MAC_start + 6; i++) {
        result += `:${ bytes.toString('hex', i, i + 1) }`;
    }
    return result;

}

//Frecuencia de emision
const parseFreq = (bytes, l_RT) => {
    // byte mas significativo en byte 29 desde el fin radioTap hacia atras
    // byte menos siginificativo en byte 30 desde fin radioTap hacia atras
    return (bytes[l_RT - 29] * 256) + (bytes[l_RT - 30]);
    //devuelve freq en Mhz
}

module.exports = {
    parseType,
    parseSSID,
    parseRSSI,
    parseSourceMAC,
    parseFreq
}