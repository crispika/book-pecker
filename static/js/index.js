if (!window.localStorage || typeof (JSON) == 'undefined') {
    alert("因您的浏览器版本过低，网站功能无法完全使用，请升级浏览器。");
} else {

    // XXX 不要污染全局ns
    let db = window.localStorage;

    // select all <a> of trolley icons to add the item to trolley
    let trolleys = document.querySelectorAll("main li.book-item a.trolley");

    for (let i = 0; i < trolleys.length; i++) {
        trolleys[i].id = i;

        /* XXX - 之后应该加入book-id，使用book-id来做流程
        *   JSON数据包:
        *   book_item[
        *       {"book_id": int(6),
        *        "book_name": String(100),
        *        "book_author": char(50),
        *        "book_cover": url,
        *        "book_price": float}
        *   ,{...},{...}]
        */
        trolleys[i].onclick = function () {

            // get info of the chosen book and save to localstorage
            let book_name = this.parentNode.querySelector(".book-name").innerHTML;
            //obtain the trolley info saved in local storage
            console.log(get_trolley_obj());
            let trolley_jsonObj = get_trolley_obj() || {};
            
            // XXX later,此处应用book-id替代
            console.log(trolley_jsonObj[book_name]);

            if(trolley_jsonObj[book_name]){
                trolley_jsonObj[book_name].qty +=1;
                trolley_jsonObj[book_name].input_disabled = false;
            }else{
                let book_price = this.parentNode.querySelector(".book-price").innerHTML;
                let book_cover= this.parentNode.querySelector("img").src;
                // get the relative path of book-src
                book_cover = book_cover.slice(book_cover.match("/img/").index); 

                trolley_jsonObj[book_name]={
                    "book_name":book_name,
                    "qty":1,
                    "book_price":book_price,
                    "book_cover":book_cover,
                    "input_disabled":true,
                }    
            }
            // put the edited data back to localstorage
            trolley_jsonString = JSON.stringify(trolley_jsonObj);
            db.trolley_info = trolley_jsonString;

            console.log(trolley_jsonObj[book_name]);
            let flag = confirm("添加成功❤~，是否要前往购物车？");
            if(flag){
                location.assign("/components/trolley.html");
            }
        }
    }
}