import { Avatar } from '@mui/material';
import React,{forwardRef, useEffect, useState} from 'react';
import InputOption from './InputOption';
import "./Post.css";
import { ChatOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import firebase from 'firebase/compat/app';
import {db} from "./firebase";
import { doc, FieldValue } from 'firebase/firestore';
import Comment from './Comment'
import { v4 as uuid } from 'uuid';

const Post=forwardRef(({id,name , description, message, photoUrl,postImage,comments},ref ) => {
    const user = useSelector(selectUser);
    const [showCommentBox, setShowCommentBox]=useState(false)
    const[comment,setComment]=useState();
    const[input,setInput] = useState();

    
    useEffect(()=>{
        db.collection('posts').onSnapshot((snapshot)=>snapshot.docs.map((doc) =>
        {
            if(doc.id===id)
            {setComment(
                    doc.data().comments?.map((comment)=>(
                        { 
                            pid:doc.id,
                            data:{
                                id:comment.id,
                                name:comment.name,
                                description:comment.description,
                                photoUrl:comment.photoUrl,
                                reply:comment.reply,
                                likedBy:comment.likedBy
                            }
                        }
                    ))
                )
            }
        }))
        return console.log("success")
      },[]);

    async function sendComment(e){
        e.preventDefault();
        let tempComment={
        name:user.displayName,
        description: input,
        photoUrl:user.photoUrl||"",
        id:uuid(),
        reply:[],
        likedBy:[]
        }
        
        await(db.collection('posts').onSnapshot((snapshot)=>snapshot.docs.map((doc) =>{{
            if(doc.id===id)
            {
                //(doc.data().comments).push(tempComment)
                console.log(id)
                console.log(tempComment)
                db.collection('posts').doc(id).update({comments: firebase.firestore.FieldValue.arrayUnion(tempComment)})
            }
            return(console.log(doc.id, doc.data().comments))
        }})));
        setInput('')
    };
    const setTrue=()=>{
        setShowCommentBox(!showCommentBox)
    }
  return (
    <div ref={ref} className='post'>
        <div className='post__header'>
            <Avatar src={photoUrl} >{name?.[0]}</Avatar>
            <div className='post__info'>
                <h2>{name}</h2>
                
            </div>
        </div>

        <div className='post__body'>
            <p style={{marginLeft:'20px'}}>{message}
            </p>
            <p>{(postImage)?(<img src={postImage} alt="" />):("")}</p>
        </div>
        <div className='post__buttons'>
            <InputOption Icon={ThumbUpAltOutlined} title="Like"
            color="gray"  clickedColor="blue"/>
            <button onClick={setTrue} style={{backgroundColor:'transparent', border:'none'}}><InputOption Icon={ChatOutlined} title="Comment" color="gray" clickedColor="gray"/></button>
        </div>
        {
            (showCommentBox)?
            (<div className='post__comment'>
                <div className='post__comment__input'>
                    <form>
                        <input value={input} type="text" placeholder="Type a comment" onChange={(e)=>setInput(e.target.value)}/>
                        <button style={{display:'none'}} onClick={sendComment} type='submit'>Send</button>
                    </form>
                </div>
                <div>
                {comment?.map(({pid, data:{name, id,description,photoUrl,likedBy,reply},ind})=>(
                        <Comment
                        key={ind}
                        pid={pid}
                        id={id}
                        name={name}
                        description={description}
                        photoUrl={photoUrl}
                        likedBy={likedBy}
                        reply={reply}
                        />
   
                 ))}  
                </div>

            </div>):""
        }
        
    </div>
  );
})

export default Post