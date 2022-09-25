import { Avatar } from '@mui/material';
import React,{forwardRef, useEffect, useState} from 'react';
import InputOption from './InputOption';
import "./CommentReply.css";
import { ChatOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import firebase from 'firebase/compat/app';
import {db} from "./firebase";
import { doc, FieldValue } from 'firebase/firestore';



const CommentReply=forwardRef(({id,name,description},ref ) => {

    
  
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
            <InputOption Icon={ChatOutlined} title="Comment"
            color="white"/>
        </div>
        </div>
        </div>
        
  );
})

export default CommentReply