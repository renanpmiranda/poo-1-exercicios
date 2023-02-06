import { VideoDatabase } from './../database/VideoDatabase';
import { Video } from "../models/Video"

export class VideoBusiness {

    public getVideos = async () => {
        
        const videoDatabase = new VideoDatabase()
        const videosDB = await videoDatabase.findVideos()
    
        const videos: Video[] = videosDB.map((videoDB) => new Video(
            videoDB.id,
            videoDB.title,
            videoDB.duration,
            videoDB.upload_date
        ))

        return({videos})
    }

    public createVideo = async (input: any) => {

        const { id, title, duration } = input
    
        if (typeof id !== "string") {            
            throw new Error("'id' deve ser string")
        }
    
        if (typeof title !== "string") {            
            throw new Error("'title' deve ser string")
        }
    
        if (typeof duration !== "number") {            
            throw new Error("'duration' deve ser number")
        }
            
        // const [ videoDBExists ] = await db("videos").where({ id })
        const videoDatabase = new VideoDatabase()
        const videoDBExists = await videoDatabase.findVideoById(id)
    
        if (videoDBExists) {            
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
        return({
            message: "Novo vídeo criado com sucesso",
            video: newVideo
        })
    }

    public editVideo = async (input: any) => {

        const { videoId, title, duration } = input
    
        if(title !== undefined){
            if (typeof title !== "string") {                
                throw new Error("'title' deve ser string")
            }
        }        
    
        if(duration !== undefined){
            if (typeof duration !== "number") {                
                throw new Error("'duration' deve ser number")
            }  
        } 
            
        // const [ videoDBExists ] = await db("videos").where({ id: videoId })
        const videoDatabase = new VideoDatabase()
        const videoDBExists = await videoDatabase.findVideoById(videoId)
    
        if (!videoDBExists) {            
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
        return({
            message: "Vídeo editado com sucesso",
            video: editedVideo
        })
    }

    public deleteVideo = async (videoId: string) => {

        // const [ videoDBExists ] = await db("videos").where({ id: videoId })
        const videoDatabase = new VideoDatabase()
        const videoDBExists = await videoDatabase.findVideoById(videoId)

        if (!videoDBExists) {            
            throw new Error("'id' não encontrada")
        }

        await videoDatabase.deleteVideo(videoId)
        return({
            message: "Vídeo deletado com sucesso"
        })
    }
}