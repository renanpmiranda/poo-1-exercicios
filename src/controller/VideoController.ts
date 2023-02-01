import { Request, Response } from 'express';
import { VideoDatabase } from './../database/VideoDatabase';
import { Video } from './../models/Video';

export class VideoController {

    public getVideos = async (req: Request, res: Response) => {
        try {
            
            const videoDatabase = new VideoDatabase()
            const videosDB = await videoDatabase.findVideos()
    
            const videos: Video[] = videosDB.map((videoDB) => new Video(
                videoDB.id,
                videoDB.title,
                videoDB.duration,
                videoDB.upload_date
            ))
    
            res.status(200).send(videos)
    
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }    
    }

    public createVideo = async (req: Request, res: Response) => {
        try {
            const { id, title, duration } = req.body
    
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
    
            if (typeof title !== "string") {
                res.status(400)
                throw new Error("'title' deve ser string")
            }
    
            if (typeof duration !== "number") {
                res.status(400)
                throw new Error("'duration' deve ser number")
            }
            
            // const [ videoDBExists ] = await db("videos").where({ id })
            const videoDatabase = new VideoDatabase()
            const videoDBExists = await videoDatabase.findVideoById(id)
    
            if (videoDBExists) {
                res.status(400)
                throw new Error("'id' já existe")
            }        
    
            const newVideo = new Video(
                id,
                title,
                duration,
                new Date().toISOString()
            )
    
            const newVideoDB = {
                id: newVideo.getId(),
                title: newVideo.getTitle(),
                duration: newVideo.getDuration(),
                upload_date: newVideo.getUploadDate()
            }
    
            // await db("videos").insert(newVideoDB)
            const newVideoDatabase = videoDatabase.insertVideo(newVideoDB)
    
            res.status(201).send("Vídeo criado com sucesso")
    
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editVideo = async (req: Request, res: Response) => {
        try {
            const videoId = req.params.id   
                
            const { title, duration } = req.body
    
            if(title !== undefined){
                if (typeof title !== "string") {
                    res.status(400)
                    throw new Error("'title' deve ser string")
                }
            }        
    
            if(duration !== undefined){
                if (typeof duration !== "number") {
                    res.status(400)
                    throw new Error("'duration' deve ser number")
                }  
            } 
            
            // const [ videoDBExists ] = await db("videos").where({ id: videoId })
            const videoDatabase = new VideoDatabase()
            const videoDBExists = await videoDatabase.findVideoById(videoId)
    
            if (!videoDBExists) {
                res.status(400)
                throw new Error("'id' não encontrada")
            }
            
            // const editedVideo = new Video(
            //     videoId,
            //     title || videoDBExists.title,
            //     duration || videoDBExists.duration,
            //     new Date(Date.now()).toUTCString()
            // )

            const editedVideo = new Video (
                videoDBExists.id,
                videoDBExists.title,
                videoDBExists.duration,
                videoDBExists.upload_date
            )

            title && editedVideo.setTitle(title)
            duration && editedVideo.setDuration(duration)
    
            const newVideoDB = {
                id: editedVideo.getId(),
                title: editedVideo.getTitle(),
                duration: editedVideo.getDuration(),
                upload_date: editedVideo.getUploadDate()
            }
    
            // await db("videos").update(newVideoDB).where({id: videoId})
            await videoDatabase.editVideo(videoId, newVideoDB)
            res.status(200).send("Vídeo editado com sucesso")
    
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteVideo = async (req: Request, res: Response) => {
        try {
            const videoId = req.params.id
    
            // const [ videoDBExists ] = await db("videos").where({ id: videoId })
            const videoDatabase = new VideoDatabase()
            const videoDBExists = await videoDatabase.findVideoById(videoId)

            if (!videoDBExists) {
                res.status(400)
                throw new Error("'id' não encontrada")
            }
    
            await videoDatabase.deleteVideo(videoId)
            res.status(200).send("Vídeo deletado com sucesso")
    
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}