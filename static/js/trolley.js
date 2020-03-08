if (!window.localStorage || typeof (JSON) == 'undefined') {
    alert("因您的浏览器版本过低，网站功能无法完全使用，请升级浏览器。");
} else {
    // XXX 不要污染全局ns
    load_page();

    //set the logic of checkboxs
    set_check_box();

    // bind onclick callback for qty+/- btn
    let all_input = document.querySelectorAll("div.qty-wrap>input");
    let all_book_name = document.querySelectorAll("li.trolley-item>h3");
    let all_subtotal = document.querySelectorAll("li.trolley-item.subtotal");

    bind_mod_item_qty("div.qty-wrap a.add-qty", "+", all_input, all_subtotal, all_book_name);
    bind_mod_item_qty("div.qty-wrap a.reduce-qty", "-", all_input, all_subtotal, all_book_name);

    // // XXX __problem 如果想直接绑定，this绑定问题? -目前换了一个思路，写一个函数来统一绑定onlick，而非写一个回调函数赋给onclick
    // for(let i=0; i<btn_add_qty.length;i++){
    //     btn_add_qty[i].id = i;
    //     btn_reduce_qty[i].id = i;
    //     btn_add_qty[i].onclick = mod_item_qty.bind(btn_add_qty[i],"+",all_input,all_subtotal,all_price);

    //     // btn_reduce_qty[i].onclick = ;
    // }

    // disable qty- btn if qty =1
    disable_qty1_input(all_input, all_book_name);

    // bind method to delete-item
    bind_delete_item();
}

function bind_delete_item(){
    let delete_btns = document.querySelectorAll("li.trolley-item>a.delete-item");
    for(let each of delete_btns){
        each.onclick = function(){
            let book_name = each.parentNode.parentNode.getElementsByTagName("h3")[0].innerHTML;
            let main = each.parentNode.parentNode.parentNode.parentNode;
            // delete data from db
            db_delete_trolley_items(book_name);
            // remove dom node
            main.removeChild(each.parentNode.parentNode.parentNode);
            set_total_bar();
            // check whether trolley is empty
            console.log(main.childNodes.length);
            if (Object.keys(db_get_trolley_obj()).length === 0) {
                // clear trolley-list-header/footer in the trolley page
                let list_header = main.querySelector("ul.trolley-head");
                let list_footer = main.querySelector("ul.trolley-total");
                list_header.parentNode.removeChild(list_header);
                list_footer.parentNode.removeChild(list_footer);
                // display the empty-info section
                let empty_info = document.querySelector("div.empty-info");
                empty_info.style.display = "block";
                
            }
        }
    }
}


/**
 * 给qty+/- btn绑定响应函数
 * 点击+/- qty 按钮时刷新subtotal/total的数据
 * @param {string} selector 
 * @param {string} flag 判定要进行+还是-的响应函数绑定
 * @param {*} all_input 
 * @param {*} all_subtotal 
 * @param {*} all_price 
 */

//  XXX 另一种思路，如果不取到这么细，一开始就应该取每个ul为单位，query子元素会不会方便一点？ || 其实根本不需要id?
function bind_mod_item_qty(selector, flag, all_input, all_subtotal, all_book_name) {
    let trolley_jsonObj = db_get_trolley_obj();
    // obtain lists of qty-/qty+ btns 
    let btn_list = document.querySelectorAll(selector);
    for (let i = 0; i < btn_list.length; i++) {
        btn_list[i].id = i;
        all_input[i].id = i;
        btn_list[i].onclick = function () {
            let input = all_input[this.id];
            let book_name = all_book_name[this.id].innerHTML;
            let subtotal = all_subtotal[this.id];
            let price = trolley_jsonObj[book_name].book_price;
            switch (flag) {
                case "+":
                    input.value = parseInt(input.value) + 1;
                    if (parseInt(input.value) === 2) {
                        input.parentNode.querySelector("a.reduce-qty").disabled = false;
                        trolley_jsonObj[book_name].input_disabled = false;
                    }
                    // update qty in localstorage
                    trolley_jsonObj[book_name].qty = parseInt(input.value);
                    // window.localStorage.trolley_info = JSON.stringify(trolley_jsonObj);
                    db_update_trolley_items(trolley_jsonObj);
                    break;
                case "-":
                    //TODO 减的逻辑 - <1 禁用btn
                    input.value = parseInt(input.value) - 1;
                    if (parseInt(input.value) <= 1) {
                        input.parentNode.querySelector("a.reduce-qty").disabled = true;
                        trolley_jsonObj[book_name].input_disabled = true;
                    }
                    trolley_jsonObj[book_name].qty = parseInt(input.value);
                    db_update_trolley_items(trolley_jsonObj);
                    console.log(db_get_trolley_obj());
                    break;
                default:
                    console.log("flag error");
                    break;
            }

            // change subtotal
            subtotal.innerHTML = formatMoney(calSubtotal(input.value, price));

            //change total 
            set_total_bar();
        }
    }
}

function set_total_bar(){

    let total_count = 0;
    let total_price = 0;
    let check_items = document.querySelectorAll("input.check-trolley-item");
    let price_span = document.getElementById("total-price");
    let count_span = document.getElementById("total-item-count");
    for(let each of check_items){
        if(each.checked){
            let qty = parseInt(each.parentNode.parentNode.querySelector("input.qty").value);
            let price = each.parentNode.parentNode.querySelector("li.trolley-item.price").innerHTML;
            total_count+=qty;
            console.log(total_price);
            console.log(calSubtotal(qty,price));
            total_price+=calSubtotal(qty,price);
        }
    }
    price_span.innerHTML = formatMoney(total_price);
    count_span.innerHTML = total_count;
}

/**
 * 遍历设置qty- btn的 disabled
 * @param {*} all_input 
 * @param {*} all_book_name 
 */
function disable_qty1_input(all_input, all_book_name) {
    let db = db_get_trolley_obj();
    for (let i = 0; i < all_input.length; i++) {
        let id = all_input[i].id;
        let book_name = all_book_name[id].innerHTML;
        all_input[i].parentNode.querySelector("a.reduce-qty").disabled = db[book_name].input_disabled;
        // TODO 禁用<a>，pointer-events? - CSS切换类 toggle_class, 顺便设置禁用样式
    }
}

function set_check_box() {
    let check_alls = document.querySelectorAll("li.check-all input");
    let check_items = document.querySelectorAll("input.check-trolley-item");

    //set check_all/check_none
    for (let i = 0; i < check_alls.length; i++) {
        check_alls[i].onclick = function () {
            for (let each of check_alls) {
                each.checked = check_alls[i].checked;
            }
            for (let each of check_items) {
                each.checked = check_alls[i].checked;
            }
            set_total_bar();
        }
    }

    // set check_item
    for(let each of check_items){
        each.onclick = function(){
            let counter = 0;
            for(let each of check_items){
                if(each.checked) counter+=1;
            }
            for (let each of check_alls){
                each.checked = (counter === check_items.length);
            }
            set_total_bar();
        }
    }
}

/* 从ls中读取数据，加载购物车页面 */
function load_page() {
    if (!db_get_trolley_obj() || Object.keys(db_get_trolley_obj()).length === 0) {
        // display the empty-info section in the trolley page
        let empty_info = document.querySelector("div.empty-info");
        empty_info.style.display = "block";
    }
    else {
        let main = document.querySelector("main");
        // add table head of trolley-list
        main.appendChild(create_trolley_head());
        // append items into trolley-list
        let item;
        for (let attr in db_get_trolley_obj()) {
            item = db_get_trolley_obj()[attr];
            main.appendChild(create_trolley_item(
                item.book_name,
                item.book_price,
                item.qty,
                item.book_cover))
        }
        // append the trolley-total toolbar
        main.appendChild(create_trolley_total());

    }
}

/* 创建购物车列表表头 */
function create_trolley_head() {
    let ul = document.createElement("ul");
    ul.className = "trolley-head";
    ul.innerHTML = "<li class=\"check-all\">" +
        "            <input type=\"checkbox\" name=\"check-all\" id=\"\">" +
        "            全选" +
        "            </li>" +
        "            <li class=\"book-info\">商品信息</li>" +
        "            <li class=\"other\">单价（元）</li>" +
        "            <li class=\"other\">数量</li>" +
        "            <li class=\"other\">金额（元）</li>" +
        "            <li class=\"other\">操作</li>";
    return ul;
}

/**
 * 创建购物车item项
 * @param {string} book_name 
 * @param {string} price 
 * @param {numebr} qty 
 * @param {string} cover_src 
 */
function create_trolley_item(book_name, price, qty, cover_src) {
    let total = formatMoney(calSubtotal(qty, price));
    // console.log("total price: "+total);
    let ul = document.createElement("ul");
    ul.className = "trolley-list clearfix"
    ul.innerHTML = "        <ul class=\"trolley-list clearfix\">" +
        "            <li class=\"trolley-item checkbox-wrap\">" +
        "                <input type=\"checkbox\" class=\"check-trolley-item\" name=\"\" id=\"\">" +
        "            </li>" +
        "            <li class=\"trolley-item img-wrap\">" +
        "                <img src=\".." + cover_src + "\" alt=\"" + book_name + "\">" +
        "            </li>" +
        "            <li class=\"trolley-item book-info\">" +
        "                <h3 class=\"book-title\">" + book_name + "</h3>" +
        "            </li>" +
        "            <li class=\"trolley-item other price\">" + price + "</li>" +
        "            <li class=\"trolley-item other\">" +
        "                <div class=\"qty-wrap\">" +
        "                    <a href=\"javascript:void(0)\" class=\"reduce-qty\">-</a>" +
        "                    <input class=\"qty\" disabled type=\"text\" value=\"" + qty + "\">" +
        "                    <a href=\"javascript:void(0)\" class=\"add-qty\">+</a>" +
        "                </div>" +
        "            </li>" +
        "            <li class=\"trolley-item other subtotal\">" + total + "</li>" +
        "            <li class=\"trolley-item delete-item\">" +
        "                <a href=\"javascript:void(0)\" class=\"delete-item\">删除</a>" +
        "            </li>" +
        "        </ul>";
    return ul;
}

function create_trolley_total() {
    let ul = document.createElement("ul");
    ul.className = "trolley-total";
    ul.innerHTML = "        <li class=\"check-all\">" +
        "            <input type=\"checkbox\" name=\"check-all\" id=\"\">" +
        "            全选" +
        "        </li>" +
        "        <li class=\"total-item-count\">" +
        "            已选择 <span id=\"total-item-count\">0</span> 件商品" +
        "        </li>" +
        "        <li class=\"total-price\">" +
        "            总价 <span id=\"total-price\">￥0.00</span>" +
        "        </li>" +
        "        <li class=\"pay-btn-wrap\">" +
        "            <a href=\"javascript:void(0)\" class=\"pay-btn\">结算</a>" +
        "        </li>";
    return ul;
}




