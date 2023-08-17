import express from 'express'
import { getPost,addPost,updatePost,deletePost } from '../controller/task.js'


const router = express.Router()

router.get("/:id" , getPost )
router.post("/:id" , addPost)
router.put("/:id" , updatePost )
router.delete("/:id" , deletePost )


export default router