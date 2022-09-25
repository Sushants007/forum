import { Avatar } from '@mui/material';
import React,{forwardRef, useEffect, useState} from 'react';
import InputOption from './InputOption';
import "./Comment.css";
import { ChatOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import firebase from 'firebase/compat/app';
import {db} from "./firebase";
import { doc, FieldValue } from 'firebase/firestore';
import './Comment.css'
import { v4 as uuid } from 'uuid';
import CommentReply from './CommentReply';

const Comment=forwardRef(({pid, id, name, description,photoUrl,likedBy,reply},ref ) => {
  
    const user = useSelector(selectUser);
    const [showCommentBox, setShowCommentBox]=useState(false)
    const[replyLocal,setReplyLocal]=useState([]);
    const[input,setInput] = useState();

    
    useEffect(()=>{
        db.collection('posts').onSnapshot((snapshot)=>snapshot.docs.map((doc) =>
        {if(doc.id===pid)
            {(doc.data().comments.map((comment)=>{
                if(comment.id===id)
                {setReplyLocal(comment.reply.map((repl)=>({
                            pid:comment.id,
                            data:{
                                name:repl.name,
                                description:repl.description,
                                photoUrl:repl.photoUrl,
                                likedBy:[],
                                id:repl.id
                }})))
                }
            })
                )
            }
        }))
        return console.log("success")
      },[]);

    async function sendReply(e){
        e.preventDefault();
        let tempReply={
        name:user.displayName,
        description: input,
        photoUrl:user.photoUrl||"",
        id:uuid(),
        reply:[],
        likedBy:[]
        };
        
        db.collection('posts').onSnapshot((snapshot)=>{
            snapshot.docs.map((doc)=>{
                if(doc.id===pid)
                {
                    doc.data().comments.map((comment)=>{
                        if(comment.id===id)
                        {
                            comment.reply.push(tempReply)
                            db.collection('posts').doc(id).update({comments: firebase.firestore.FieldValue.arrayUnion(comment)})
                        }
                    })
                }
            })
        })
    };
    const setTrue=()=>{
        setShowCommentBox(!showCommentBox)}
    
  return (
    <div ref={ref}  className="comment__wrap">
    <div className='comment__header'>
            <Avatar >{name?.[0]}</Avatar>
            
        </div>
    <div className='comment'>
        <div className='comment__body'>
            <p >{description}
            </p>
        </div>
        <div className='comment__buttons'>
            <InputOption Icon={ThumbUpAltOutlined} title="Like"
            color="white"/>
            <button onClick={setTrue} style={{backgroundColor:'transparent', border:'none'}}><InputOption Icon={ChatOutlined} title="Comment" color="gray" clickedColor="gray"/></button>
        </div>
        </div>
        {
            (false)?
            (<div className='comment__reply'>
                <div className='comment__reply__input'>
                    <form>
                        <input value={input} type="text" placeholder="Type a comment" onChange={(e)=>setInput(e.target.value)}/>
                        <button style={{display:'none'}} onClick={sendReply} type='submit'>Send</button>
                    </form>
                </div>
                <div>
                {replyLocal?.map(({pid, data:{name,id,description,photoUrl,likedBy}},ind)=>(
                        <CommentReply
                        key={ind}
                        id={id}
                        pid={pid}
                        name={name}
                        description={description}
                        photoUrl={photoUrl}
                        likedBy={likedBy}
                        />
   
                 ))}  
                </div>

            </div>):""
        }
        </div>
        
  );
})

export default Comment