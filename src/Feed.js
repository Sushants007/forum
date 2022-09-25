import React, { useEffect, useState,useRef } from 'react';
import'./Feed.css';
import { CalendarViewDay, Create, Subscriptions } from '@mui/icons-material';
import {Image} from '@mui/icons-material';
import InputOption from './InputOption';
import {EventNote} from '@mui/icons-material'
import Post from "./Post";
import {db} from "./firebase";
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from "react-flip-move";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Feed({searchInput, setSearchInput}) {
  const user = useSelector(selectUser);
  const [input,setInput]=useState('');
  const[posts, setPosts] = useState([]);
  const [img, setImg] = useState("");
  const [isUploading,setIsUploading]=useState(true);
  const inputRef = useRef(null);
  //const [localSearch,setLocalSearch]=useState("");
  const handleClick = (e) => {
    e.preventDefault()
    setIsUploading(true)
    inputRef.current.click();
    
  };
  const handleFileChange = event => {
    const file = event.target.files && event.target.files[0];
    console.log(file.name)
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        window.alert("uploading image")
        console.log('Uploaded a blob or file!');
      }).then(()=>getDownloadURL(storageRef).then((url) => { setImg(url); setIsUploading(false); console.log(url)}).catch((error) => {
        console.log(error)
    }))
      
    }
  const temposts=[];
  useEffect(()=>{
    console.log("no input")
      db.collection('posts')
    .orderBy("timestamp","desc")
    .onSnapshot((snapshot)=>{setPosts(snapshot.docs.map((doc) =>({
                id:doc.id,
                data:doc.data()
              }
    )))
            
    })
    //setPosts(temposts)
  },[]);
  if(searchInput && searchInput!="")
  { console.log(searchInput)
    db.collection('posts').onSnapshot((snapshot)=>snapshot.docs.map((doc) => {
      if((doc.data().name?.toLowerCase().includes(searchInput)) || doc.data().message?.toLowerCase().includes(searchInput))
      {
        const tempObj={id:doc.id, data:doc.data()}
        temposts.push(tempObj)
        console.log(temposts)
        setPosts(temposts)
        setSearchInput("")
        return(console.log(doc.data()))
        
      }
    }))
    //setPosts(temposts)
  }
  
  
  
  const sendPost = e =>{
    //e.preventDefault();
    db.collection('posts').add({
        name:user.displayName,
        description:user.email,
        message: input,
        photoUrl: user.photoUrl ||"",
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        postImage:img || "",
        comments:[],
        likedBy:[],
    });
    
  setInput("");  
  setImg("");
  };
  


  return (
    <div className='feed'>
        <div className='feed__inputContainer'>
            <div className='feed__input'>
                <Create/>
                <form>
                    <input value ={input} onChange={e => setInput(e.target.value)} type ="text"/>
                    <button onClick={sendPost} type='submit' >Send</button>
                
                </form>

            </div>
            <div className='feed__inputOptions'>
                <input style={{display: 'none'}} ref={inputRef} type="file" onChange={handleFileChange} />
                <button style={{border: 'none',backgroundColor:'transparent'}} onClick={handleClick}><InputOption Icon={Image} title="Photo" color="#70B5F9" clickedColor="#70B5F9"/></button>

            </div>
        </div>
        <FlipMove>
            {posts.map(({id, data:{name,description,message,photoUrl,postImage,comments}},ind)=>(
            <Post
            key={ind}
            id={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
            postImage={postImage}
            comments={comments}
            />
   
         ))}   
        </FlipMove>
        
    
    </div>
  )
}

export default Feed;