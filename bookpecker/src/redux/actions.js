import { DELETE_BOOK, RECEIVE_BOOKLIST, RECEIVE_BOOKINFO, RECEIVE_BOOK_COMMENTS, RECEIVE_TROLLEYDATA, UPDATE_TROLLEYDATA } from "./action-types";
// for test
import UUID from "node-uuid";
import { db_init_table, db_insert_tableMapItem, db_select_table, db_select_MapItem, db_update_trolleyItem, db_delete_trolleyItem } from "../utils/localDb"
import { BOOKINFO, TROLLEY, COMMENTS } from "../utils/db-types"

export const deleteBook = (book_id) => ({ type: DELETE_BOOK, data: book_id });

export const getBookList = () => {
    return (dispatch) => {
        //模拟异步获取数据
        setTimeout(() => {
            const book_data = [
                {
                    "bookname": "猫不存在",
                    "short_intro": "从猫开始，全世界的科幻名家带你走出熟悉的日常，去往未知的奇境。",
                    "cover": "https://s1.ax1x.com/2020/05/17/YRcJKI.jpg",
                    // "id": UUID.v1(),
                    "id": "book1",
                    "author": "[美] 厄休拉・勒古恩",
                    "ISBN": "9787540486198",
                    "press": "湖南文艺出版社",
                    "publish_year": "2020-5",
                    "number_of_pages": "408",
                    "price": "49.8",
                    "grade": "8",
                    "star": "4",
                    "grade_spread": [["5星", 50], ["4星", 0], ["3星", 50], ["2星", 0], ["1星", 0]],
                    "description": "<p>科幻文化领域专业影响力品牌、亚太科幻大会主办方未来事务管理局重磅新作，致力打造中国科幻的黄金时代。<p/><p>从猫开始，全世界的科幻名家带你走出熟悉的日常，去往未知的奇境。17 个国内外科幻作家有关猫的科幻故事，5 篇与猫相关的科幻趣文。<p/><p>内附《牛筋名猫录》漫画师阿科创作的刘慈欣、韩松、儒勒・凡尔纳、阿瑟・C・克拉克、厄休拉・勒古恩等 9 位科幻作家猫漫画。<p/><p>融合虚构与非虚构，带你领略：有了猫，你就有了整个宇宙；在你腿上的毛茸茸，藏着宇宙的大秘密。</p>"
                },
                {
                    "bookname": "意大利的冬天",
                    "short_intro": "本书文章精选自法国 19 世纪著名历史学家儒勒・米什莱的 12 部代表著作,从内容上可以分为自然散文和历史散文两部分，作者的生活情趣和渊博学识闪现在字里行间。",
                    "cover": "https://s1.ax1x.com/2020/05/21/Yq1yHf.jpg",
                    // "id": UUID.v1(),
                    "id": "book2",
                    "author": "[法] 儒勒・米什莱",
                    "ISBN": "9787544773423",
                    "press": "译林出版社",
                    "publish_year": "2020-4",
                    "number_of_pages": "265",
                    "price": "39.00",
                    "grade": "8",
                    "star": "4",
                    "grade_spread": [["5星", 50], ["4星", 0], ["3星", 50], ["2星", 0], ["1星", 0]],
                    "description": "<p>本书文章精选自法国 19 世纪著名历史学家儒勒・米什莱的 12 部代表著作 ——《鸟》《虫》《海》《山》《意大利的冬天》《罗马史》《法国史》《人民》《我们的儿子》《女巫》《我的少年时代》，从内容上可以分为自然散文和历史散文两部分，作者的生活情趣和渊博学识闪现在字里行间。<p/>"
                },
                {
                    "bookname": "声音中的另一种语言",
                    "short_intro": "一场生命诗学的盛宴：从但丁、莎士比亚、爱伦・坡、兰波、波德莱尔、马拉美到俳句，作者邀约我们亲赴诗的腹地。",
                    "cover": "https://s1.ax1x.com/2020/05/21/Yq1cE8.jpg",
                    // "id": UUID.v1(),
                    "id": "book3",
                    "author": " [法] 伊夫・博纳富瓦",
                    "ISBN": "9787219109304",
                    "press": "拜德雅丨广西人民出版社",
                    "publish_year": "2020-3",
                    "number_of_pages": "408",
                    "price": "69.8",
                    "grade": "9.1",
                    "star": "4.5",
                    "grade_spread": [["5星", 55.6], ["4星", 44.4], ["3星", 50], ["2星", 0], ["1星", 0]],
                    "description": "<p>★瓦尔特・本雅明《译作者的任务》以来至为重要的翻译论著。<p/>★法国当代举足轻重的世界级诗坛巨匠、著名翻译家、艺术评论家，龚古尔诗歌奖、卡夫卡文学奖得主，法兰西公学院院士，伊夫・博纳富瓦翻译论集首部中译本。<p>★一场生命诗学的盛宴：从但丁、莎士比亚、爱伦・坡、兰波、波德莱尔、马拉美到俳句，作者邀约我们亲赴诗的腹地。<p/>★“一首诗歌（poème）的诗（poésie）以一种声音（voix）的方式走向读者。”<p>★通过诗的翻译，对虚幻的概念性言语提出质疑，在进一步自我批评的同时重新思考与异的关系，从而探寻真实的生活与场所，与自己真实的信念相遇。<p/><p>- 内容简介 -<p/><p>本书是法国著名诗人、翻译家、艺术评论家伊夫・博纳富瓦关于诗及诗的翻译的重要论集，是一部极具研读价值的诗学著作，堪称瓦尔特・本雅明《译作者的任务》以来至为重要的翻译论著。此外，它不仅是一部翻译论著，更是一场生命诗学的盛宴：从但丁、莎士比亚、爱伦・坡、兰波、波德莱尔、马拉美到俳句，作者邀约我们亲赴诗的腹地。<p/>"
                },
                {
                    "bookname": "猫不存在_v2",
                    "short_intro": "从猫开始，全世界的科幻名家带你走出熟悉的日常，去往未知的奇境。",
                    "cover": "https://s1.ax1x.com/2020/05/17/YRcJKI.jpg",
                    // "id": UUID.v1(),
                    "id": "book4",
                    "author": "[美] 厄休拉・勒古恩",
                    "ISBN": "9787540486198",
                    "press": "湖南文艺出版社",
                    "publish_year": "2020-5",
                    "number_of_pages": "408",
                    "price": "49.8",
                    "grade": "8",
                    "star": "4",
                    "grade_spread": [["5星", 50], ["4星", 0], ["3星", 50], ["2星", 0], ["1星", 0]],
                    "description": "<p>科幻文化领域专业影响力品牌、亚太科幻大会主办方未来事务管理局重磅新作，致力打造中国科幻的黄金时代。<p/><p>从猫开始，全世界的科幻名家带你走出熟悉的日常，去往未知的奇境。17 个国内外科幻作家有关猫的科幻故事，5 篇与猫相关的科幻趣文。<p/><p>内附《牛筋名猫录》漫画师阿科创作的刘慈欣、韩松、儒勒・凡尔纳、阿瑟・C・克拉克、厄休拉・勒古恩等 9 位科幻作家猫漫画。<p/><p>融合虚构与非虚构，带你领略：有了猫，你就有了整个宇宙；在你腿上的毛茸茸，藏着宇宙的大秘密。</p>"
                },
                {
                    "bookname": "意大利的冬天_v2",
                    "short_intro": "本书文章精选自法国 19 世纪著名历史学家儒勒・米什莱的 12 部代表著作,从内容上可以分为自然散文和历史散文两部分，作者的生活情趣和渊博学识闪现在字里行间。",
                    "cover": "https://s1.ax1x.com/2020/05/21/Yq1yHf.jpg",
                    // "id": UUID.v1(),
                    "id": "book5",
                    "author": "[法] 儒勒・米什莱",
                    "ISBN": "9787544773423",
                    "press": "译林出版社",
                    "publish_year": "2020-4",
                    "number_of_pages": "265",
                    "price": "39.00",
                    "grade": "8",
                    "star": "4",
                    "grade_spread": [["5星", 50], ["4星", 0], ["3星", 50], ["2星", 0], ["1星", 0]],
                    "description": "<p>本书文章精选自法国 19 世纪著名历史学家儒勒・米什莱的 12 部代表著作 ——《鸟》《虫》《海》《山》《意大利的冬天》《罗马史》《法国史》《人民》《我们的儿子》《女巫》《我的少年时代》，从内容上可以分为自然散文和历史散文两部分，作者的生活情趣和渊博学识闪现在字里行间。<p/>"
                },
                {
                    "bookname": "声音中的另一种语言_v2",
                    "short_intro": "一场生命诗学的盛宴：从但丁、莎士比亚、爱伦・坡、兰波、波德莱尔、马拉美到俳句，作者邀约我们亲赴诗的腹地。",
                    "cover": "https://s1.ax1x.com/2020/05/21/Yq1cE8.jpg",
                    // "id": UUID.v1(),
                    "id": "book6",
                    "author": " [法] 伊夫・博纳富瓦",
                    "ISBN": "9787219109304",
                    "press": "拜德雅丨广西人民出版社",
                    "publish_year": "2020-3",
                    "number_of_pages": "408",
                    "price": "69.8",
                    "grade": "9.1",
                    "star": "4.5",
                    "grade_spread": [["5星", 55.6], ["4星", 44.4], ["3星", 50], ["2星", 0], ["1星", 0]],
                    "description": "<p>★瓦尔特・本雅明《译作者的任务》以来至为重要的翻译论著。<p/>★法国当代举足轻重的世界级诗坛巨匠、著名翻译家、艺术评论家，龚古尔诗歌奖、卡夫卡文学奖得主，法兰西公学院院士，伊夫・博纳富瓦翻译论集首部中译本。<p>★一场生命诗学的盛宴：从但丁、莎士比亚、爱伦・坡、兰波、波德莱尔、马拉美到俳句，作者邀约我们亲赴诗的腹地。<p/>★“一首诗歌（poème）的诗（poésie）以一种声音（voix）的方式走向读者。”<p>★通过诗的翻译，对虚幻的概念性言语提出质疑，在进一步自我批评的同时重新思考与异的关系，从而探寻真实的生活与场所，与自己真实的信念相遇。<p/><p>- 内容简介 -<p/><p>本书是法国著名诗人、翻译家、艺术评论家伊夫・博纳富瓦关于诗及诗的翻译的重要论集，是一部极具研读价值的诗学著作，堪称瓦尔特・本雅明《译作者的任务》以来至为重要的翻译论著。此外，它不仅是一部翻译论著，更是一场生命诗学的盛宴：从但丁、莎士比亚、爱伦・坡、兰波、波德莱尔、马拉美到俳句，作者邀约我们亲赴诗的腹地。<p/>"
                },
                {
                    "bookname": "猫不存在_v3",
                    "short_intro": "从猫开始，全世界的科幻名家带你走出熟悉的日常，去往未知的奇境。",
                    "cover": "https://s1.ax1x.com/2020/05/17/YRcJKI.jpg",
                    // "id": UUID.v1(),
                    "id": "book7",
                    "author": "[美] 厄休拉・勒古恩",
                    "ISBN": "9787540486198",
                    "press": "湖南文艺出版社",
                    "publish_year": "2020-5",
                    "number_of_pages": "408",
                    "price": "49.8",
                    "grade": "8",
                    "star": "4",
                    "grade_spread": [["5星", 50], ["4星", 0], ["3星", 50], ["2星", 0], ["1星", 0]],
                    "description": "<p>科幻文化领域专业影响力品牌、亚太科幻大会主办方未来事务管理局重磅新作，致力打造中国科幻的黄金时代。<p/><p>从猫开始，全世界的科幻名家带你走出熟悉的日常，去往未知的奇境。17 个国内外科幻作家有关猫的科幻故事，5 篇与猫相关的科幻趣文。<p/><p>内附《牛筋名猫录》漫画师阿科创作的刘慈欣、韩松、儒勒・凡尔纳、阿瑟・C・克拉克、厄休拉・勒古恩等 9 位科幻作家猫漫画。<p/><p>融合虚构与非虚构，带你领略：有了猫，你就有了整个宇宙；在你腿上的毛茸茸，藏着宇宙的大秘密。</p>"
                },
                {
                    "bookname": "意大利的冬天_v3",
                    "short_intro": "本书文章精选自法国 19 世纪著名历史学家儒勒・米什莱的 12 部代表著作,从内容上可以分为自然散文和历史散文两部分，作者的生活情趣和渊博学识闪现在字里行间。",
                    "cover": "https://s1.ax1x.com/2020/05/21/Yq1yHf.jpg",
                    // "id": UUID.v1(),
                    "id": "book8",
                    "author": "[法] 儒勒・米什莱",
                    "ISBN": "9787544773423",
                    "press": "译林出版社",
                    "publish_year": "2020-4",
                    "number_of_pages": "265",
                    "price": "39.00",
                    "grade": "8",
                    "star": "4",
                    "grade_spread": [["5星", 50], ["4星", 0], ["3星", 50], ["2星", 0], ["1星", 0]],
                    "description": "<p>本书文章精选自法国 19 世纪著名历史学家儒勒・米什莱的 12 部代表著作 ——《鸟》《虫》《海》《山》《意大利的冬天》《罗马史》《法国史》《人民》《我们的儿子》《女巫》《我的少年时代》，从内容上可以分为自然散文和历史散文两部分，作者的生活情趣和渊博学识闪现在字里行间。<p/>"
                },
                {
                    "bookname": "声音中的另一种语言_v3",
                    "short_intro": "一场生命诗学的盛宴：从但丁、莎士比亚、爱伦・坡、兰波、波德莱尔、马拉美到俳句，作者邀约我们亲赴诗的腹地。",
                    "cover": "https://s1.ax1x.com/2020/05/21/Yq1cE8.jpg",
                    // "id": UUID.v1(),
                    "id": "book9",
                    "author": " [法] 伊夫・博纳富瓦",
                    "ISBN": "9787219109304",
                    "press": "拜德雅丨广西人民出版社",
                    "publish_year": "2020-3",
                    "number_of_pages": "408",
                    "price": "69.8",
                    "grade": "9.1",
                    "star": "4.5",
                    "grade_spread": [["5星", 55.6], ["4星", 44.4], ["3星", 50], ["2星", 0], ["1星", 0]],
                    "description": "<p>★瓦尔特・本雅明《译作者的任务》以来至为重要的翻译论著。<p/>★法国当代举足轻重的世界级诗坛巨匠、著名翻译家、艺术评论家，龚古尔诗歌奖、卡夫卡文学奖得主，法兰西公学院院士，伊夫・博纳富瓦翻译论集首部中译本。<p>★一场生命诗学的盛宴：从但丁、莎士比亚、爱伦・坡、兰波、波德莱尔、马拉美到俳句，作者邀约我们亲赴诗的腹地。<p/>★“一首诗歌（poème）的诗（poésie）以一种声音（voix）的方式走向读者。”<p>★通过诗的翻译，对虚幻的概念性言语提出质疑，在进一步自我批评的同时重新思考与异的关系，从而探寻真实的生活与场所，与自己真实的信念相遇。<p/><p>- 内容简介 -<p/><p>本书是法国著名诗人、翻译家、艺术评论家伊夫・博纳富瓦关于诗及诗的翻译的重要论集，是一部极具研读价值的诗学著作，堪称瓦尔特・本雅明《译作者的任务》以来至为重要的翻译论著。此外，它不仅是一部翻译论著，更是一场生命诗学的盛宴：从但丁、莎士比亚、爱伦・坡、兰波、波德莱尔、马拉美到俳句，作者邀约我们亲赴诗的腹地。<p/>"
                },
            ];

            const book_comments = {
                "book1": [{ username: "", comment: "you jump i jump", avatar: "https://cdnb.artstation.com/p/assets/images/images/006/534/075/smaller_square/gin-26.jpg?1499327788", number_of_like: 66, number_of_dislike: 33, my_action: "disliked", created_time: "20200208T080910" },
                { username: "Jack+20", comment: "you jump i will not jump with you", avatar: "https://th.bing.com/th/id/OIP.V15VTnxfK8tRQOfGjO2UnQAAAA?pid=Api&rs=1", number_of_like: 666, number_of_dislike: 333, my_action: "liked", created_time: "20200508T080910" },
                ],
                "book2": [{ username: "BlackJack", comment: "you jump i jump", avatar: "https://cdnb.artstation.com/p/assets/images/images/006/534/075/smaller_square/gin-26.jpg?1499327788", number_of_like: 66, number_of_dislike: 33, my_action: "disliked", created_time: "20200208T080910" },
                { username: "BlackJack+20", comment: "you jump i will not jump with you", avatar: "https://th.bing.com/th/id/OIP.V15VTnxfK8tRQOfGjO2UnQAAAA?pid=Api&rs=1", number_of_like: 666, number_of_dislike: 333, my_action: "liked", created_time: "20200508T080910" },
                ],
                "book3": [{ username: "RedJack", comment: "you jump i jump", avatar: "https://cdnb.artstation.com/p/assets/images/images/006/534/075/smaller_square/gin-26.jpg?1499327788", number_of_like: 66, number_of_dislike: 33, my_action: "disliked", created_time: "20200208T080910" },
                { username: "RedJack+20", comment: "you jump i will not jump with you", avatar: "https://th.bing.com/th/id/OIP.V15VTnxfK8tRQOfGjO2UnQAAAA?pid=Api&rs=1", number_of_like: 666, number_of_dislike: 333, my_action: "liked", created_time: "20200508T080910" },
                ],
                "book4": [{ username: "GreenJack", comment: "you jump i jump", avatar: "https://cdnb.artstation.com/p/assets/images/images/006/534/075/smaller_square/gin-26.jpg?1499327788", number_of_like: 66, number_of_dislike: 33, my_action: "disliked", created_time: "20200208T080910" },
                { username: "GreenJack+20", comment: "you jump i will not jump with you", avatar: "https://th.bing.com/th/id/OIP.V15VTnxfK8tRQOfGjO2UnQAAAA?pid=Api&rs=1", number_of_like: 666, number_of_dislike: 333, my_action: "liked", created_time: "20200508T080910" },
                ],
                "book5": [{ username: "YellowJack", comment: "you jump i jump", avatar: "https://cdnb.artstation.com/p/assets/images/images/006/534/075/smaller_square/gin-26.jpg?1499327788", number_of_like: 66, number_of_dislike: 33, my_action: "disliked", created_time: "20200208T080910" },
                { username: "YellowJack+20", comment: "you jump i will not jump with you", avatar: "https://th.bing.com/th/id/OIP.V15VTnxfK8tRQOfGjO2UnQAAAA?pid=Api&rs=1", number_of_like: 666, number_of_dislike: 333, my_action: "liked", created_time: "20200508T080910" },
                ],
                "book6": [{ username: "PinkJack", comment: "you jump i jump", avatar: "https://cdnb.artstation.com/p/assets/images/images/006/534/075/smaller_square/gin-26.jpg?1499327788", number_of_like: 66, number_of_dislike: 33, my_action: "disliked", created_time: "20200208T080910" },
                { username: "PinkJack+20", comment: "you jump i will not jump with you", avatar: "https://th.bing.com/th/id/OIP.V15VTnxfK8tRQOfGjO2UnQAAAA?pid=Api&rs=1", number_of_like: 666, number_of_dislike: 333, my_action: "liked", created_time: "20200508T080910" },
                ],
                "book7": [{ username: "WhiteJack", comment: "you jump i jump", avatar: "https://cdnb.artstation.com/p/assets/images/images/006/534/075/smaller_square/gin-26.jpg?1499327788", number_of_like: 66, number_of_dislike: 33, my_action: "disliked", created_time: "20200208T080910" },
                { username: "WhiteJack+20", comment: "you jump i will not jump with you", avatar: "https://th.bing.com/th/id/OIP.V15VTnxfK8tRQOfGjO2UnQAAAA?pid=Api&rs=1", number_of_like: 666, number_of_dislike: 333, my_action: "liked", created_time: "20200508T080910" },
                ],
                "book8": [{ username: "BlueJack", comment: "you jump i jump", avatar: "https://cdnb.artstation.com/p/assets/images/images/006/534/075/smaller_square/gin-26.jpg?1499327788", number_of_like: 66, number_of_dislike: 33, my_action: "disliked", created_time: "20200208T080910" },
                { username: "BlueJack+20", comment: "you jump i will not jump with you", avatar: "https://th.bing.com/th/id/OIP.V15VTnxfK8tRQOfGjO2UnQAAAA?pid=Api&rs=1", number_of_like: 666, number_of_dislike: 333, my_action: "liked", created_time: "20200508T080910" },
                ],
                "book9": [{ username: "OrangeJack", comment: "you jump i jump", avatar: "https://cdnb.artstation.com/p/assets/images/images/006/534/075/smaller_square/gin-26.jpg?1499327788", number_of_like: 66, number_of_dislike: 33, my_action: "disliked", created_time: "20200208T080910" },
                { username: "OrangeJack+20", comment: "you jump i will not jump with you", avatar: "https://th.bing.com/th/id/OIP.V15VTnxfK8tRQOfGjO2UnQAAAA?pid=Api&rs=1", number_of_like: 666, number_of_dislike: 333, my_action: "liked", created_time: "20200508T080910" },
                ],
            }

            // 存入本地数据库，方便添加到购物车的数据沟通
            db_init_table(BOOKINFO);
            db_init_table(TROLLEY);
            db_init_table(COMMENTS);

            book_data.forEach((book) => {
                db_insert_tableMapItem(BOOKINFO, book.id, book)
            });

            Object.keys(book_comments).forEach(id => db_insert_tableMapItem(COMMENTS,id,book_comments[id]))

            // 模拟调用数据库
            let book_list = [];
            book_data.forEach(book => {
                const { bookname, short_intro, id, cover } = book;
                book_list.push({ bookname, short_intro, id, cover });
            });
            dispatch(receiveBookList(book_list));
        }, 100);
    };
};

const receiveBookList = (book_list) => ({
    type: RECEIVE_BOOKLIST,
    data: book_list,
});

// 根据id向服务器fetch书籍的详情
export const getBookInfo = (id) => {
    return (dispatch) => {

        //模拟异步获取数据
        setTimeout(() => {
            // const book_info = {
            //     book_info: {
            //         id: id,
            //         bookname: "猫不存在",
            //         cover: "https://s1.ax1x.com/2020/05/17/YRcJKI.jpg",
            //         author: " [美] 厄休拉・勒古恩",
            //         "ISBN": "9787540486198",
            //         "press": "湖南文艺出版社",
            //         "publish_year": "2020-5",
            //         "number_of_pages": "408",
            //         "price": "49.8",
            //         "grade": "8",
            //         "star": "4",
            //         "grade_spread": [["5星", 50], ["4星", 0], ["3星", 50], ["2星", 0], ["1星", 0]],
            //         "description": "<p>科幻文化领域专业影响力品牌、亚太科幻大会主办方未来事务管理局重磅新作，致力打造中国科幻的黄金时代。<p/><p>从猫开始，全世界的科幻名家带你走出熟悉的日常，去往未知的奇境。17 个国内外科幻作家有关猫的科幻故事，5 篇与猫相关的科幻趣文。<p/><p>内附《牛筋名猫录》漫画师阿科创作的刘慈欣、韩松、儒勒・凡尔纳、阿瑟・C・克拉克、厄休拉・勒古恩等 9 位科幻作家猫漫画。<p/><p>融合虚构与非虚构，带你领略：有了猫，你就有了整个宇宙；在你腿上的毛茸茸，藏着宇宙的大秘密。</p>"
            //     }
            // }

            

            const book_info = {book_info:db_select_MapItem(BOOKINFO,id)}
            console.log(book_info);

            dispatch(receiveBookInfo(book_info));
        }, 1000);
    };
};

const receiveBookInfo = (book_info) => ({
    type: RECEIVE_BOOKINFO,
    data: book_info,
});


// 根据id向服务器fetch书籍的评论
export const getBookComments = (id) => {
    return (dispatch) => {
        // console.log(`正在获取id为${id}的书的book_comments`);
        //模拟异步获取数据 
        setTimeout(() => {
            // const book_comments = {
            //     book_comments: [
            //         { username: "Jack", comment: "you jump i jump", avatar: "https://cdnb.artstation.com/p/assets/images/images/006/534/075/smaller_square/gin-26.jpg?1499327788", number_of_like: 66, number_of_dislike: 33, my_action: "disliked", created_time: "20200208T080910" },
            //         { username: "Jack+20", comment: "you jump i will not jump with you", avatar: "https://th.bing.com/th/id/OIP.V15VTnxfK8tRQOfGjO2UnQAAAA?pid=Api&rs=1", number_of_like: 666, number_of_dislike: 333, my_action: "liked", created_time: "20200508T080910" },
            //     ]
            // }
            const book_comments = {book_comments: db_select_MapItem(COMMENTS,id)}
            dispatch(receiveBookComments(book_comments));
        }, 1000);
    };
};

const receiveBookComments = (book_comments) => ({
    type: RECEIVE_BOOK_COMMENTS,
    data: book_comments,
});

/* 购物车页面的操作 */

export const getTrolleyList = () => {
    return (dispatch) => {
        // 异步从服务器取数据

        // 从本地数据库调数据
        const trolley_db = db_select_table(TROLLEY);
        const trolley_data = []
        if (Object.keys(trolley_db).length > 0) {
            Object.keys(trolley_db).forEach(key => {
                let trolley_item = db_select_MapItem(BOOKINFO, key);
                trolley_item.qty = trolley_db[key];
                trolley_item.key = key;
                trolley_data.push(trolley_item)
            })
        }
        dispatch(receiveTrolleyData(trolley_data));
    }
};

const receiveTrolleyData = (trolley_data) => ({
    type: RECEIVE_TROLLEYDATA,
    data: trolley_data,
});

export const updateTrolleyData = (newData, bookid, qty) => {

    return dispatch => {
        //发请求给服务器确认
        // local stroage 模拟服务器更新：
        db_update_trolleyItem(TROLLEY, bookid, qty)

        // .then(模拟服务器确认更新成功:        
        dispatch(updateSuccess(newData));
        console.log("dispatched")
    }

};

export const deleteTrolleyData = (newData, bookid) => {

    return dispatch => {
        //发请求给服务器确认
        // local stroage 模拟服务器更新：
        db_delete_trolleyItem(TROLLEY, bookid)

        // .then(模拟服务器确认更新成功:        
        dispatch(updateSuccess(newData));
        console.log("dispatched")
    }

};


export const updateSuccess = (newData) => {
    return {
        type: UPDATE_TROLLEYDATA,
        data: newData,
    }
};

