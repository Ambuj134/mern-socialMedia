import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { Users } from "../../data";
const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/users?userId=${post.userId}`
      );
      // console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = (e) => {
    e.preventDefault();

    try {
      axios.put(`http://localhost:4000/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  // console.log(post);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt="img1"
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
      </div>
      <div className="postCenter">
        <span className="postText">{post?.desc}</span>
        <img src={PF + post.img} alt="img1" className="postImg" />
      </div>
      <div className="postBottom">
        <div className="postBottomLeft">
          <img
            className="likeIcon"
            src={`${PF}like.png`}
            alt="like"
            srcset=""
            onClick={likeHandler}
          />
          <img
            className="likeIcon"
            src={`${PF}heart.png`}
            alt="heart"
            srcset=""
            onClick={likeHandler}
          />
          <span className="postLikeCounter">{like} Likes</span>
        </div>
        <div className="postBottomRight">
          <span className="postCommentText">{post.comment} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
