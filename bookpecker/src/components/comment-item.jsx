import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';


const CommentItem = (props) => {
  const { username, comment, avatar, number_of_like, number_of_dislike, my_action,created_time } = props.comment;

  const [likes, setLikes] = useState(number_of_like);
  const [dislikes, setDislikes] = useState(number_of_dislike);
  const [action, setAction] = useState(my_action);

  const like = () => {
    if (action === "liked") {
      setLikes(likes-1);
      setDislikes(dislikes);
      setAction(null);
    }
    else if(action === "disliked"){
      setLikes(likes+1);
      setDislikes(dislikes-1);
      setAction('liked');
    }
    else{
      setLikes(likes+1);
      setDislikes(dislikes);
      setAction('liked');
    }
    //TODO 更新my_action，我的点踩信息到服务器
  };

  const dislike = () => {
    if (action === "disliked") {
      setLikes(likes);
      setDislikes(dislikes-1);
      setAction(null);
    }
    else if(action === "liked"){
      setLikes(likes-1);
      setDislikes(dislikes+1);
      setAction('disliked');
    }
    else{
      setLikes(likes);
      setDislikes(dislikes);
      setAction('disliked');
    }

  };

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
          onClick: like,
        })}
      </Tooltip>
      <span className="comment-action">{likes}</span>
    </span>,
    <span key=' key="comment-basic-dislike"'>
      <Tooltip title="Dislike">
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
          onClick: dislike,
        })}
      </Tooltip>
      <span className="comment-action">{dislikes}</span>
    </span>,
  ];

  return (
    <Comment
      actions={actions}
      author={username}
      avatar={
        <Avatar
          // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          src={avatar}
          alt={username}
        />
      }
      content={
        <p>
          {comment}
        </p>
      }
      datetime={
        <Tooltip title={moment(created_time).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(created_time).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

export default CommentItem;