/** 将float转为金钱格式
 *  src: https://www.cnblogs.com/mingmingruyuedlut/archive/2013/05/19/3082177.html
 *  e.g. formatMoney(1213.234, "2", "￥")
 */

export function formatMoney(number, places, symbol, thousand, decimal) {
    number = number || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "￥";
    thousand = thousand || "";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}


/**
 * 避免js金额计算时,parseFloat产生的精度问题：
 * src: https://blog.csdn.net/MatinBell/article/details/78571292
 * @param {number} qty    
 * @param {string} price_str  currency format of price, e.g. $ 9.99
 * @param {number} pos       position to start slice the price string to remove symbol, e.g. "$"
 */
export function calSubtotal(qty,price_str,pos){
    let price = 0.00;
    if(pos) {
         price = parseFloat(price_str.substr(pos));
    }
    else {
        price = parseFloat(price_str)
    }
    // console.log(price);
    return Math.floor(parseFloat(parseInt(qty)*100*price))/100;
}