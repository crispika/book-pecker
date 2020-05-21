// for use of localstorage

function db_get_trolley_obj(){
    if(!window.localStorage.trolley_info){
        return undefined;
    }
    return JSON.parse(window.localStorage.trolley_info);
}

function db_update_trolley_items(obj){
    window.localStorage.trolley_info = JSON.stringify(obj);
}


/**
 * 
 * @param {string} id  book_name
 */
function db_delete_trolley_items(id){
    let obj = db_get_trolley_obj();
    delete obj[id];
    console.log("删除后的db: "+obj);
    db_update_trolley_items(obj);
}

export{
    db_get_trolley_obj as getTrolley,
    db_update_trolley_items as updateTrolley,
};

