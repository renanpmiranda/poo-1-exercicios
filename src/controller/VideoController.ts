import { VideoBusiness } from './../business/VideoBusiness';
import { Request, Response } from 'express';

export class VideoController {

    public getVideos = async (req: Request, res: Response) => {
        try {
            
            const videoBusiness = new VideoBusiness()
            const output = await videoBusiness.getVideos()
    
            res.status(200).send(output)
    
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
            const input = {
                id: req.body.id,
                title: req.body.title,
                duration: req.body.duration
            }

            const videoBusiness = new VideoBusiness()
            const output = await videoBusiness.createVideo(input)
    
            res.status(201).send(output)
    
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
            const input = {
                videoId: req.params.id,
                title: req.body.title,
                duration: req.body.duration
            }
            
            const videoBusiness = new VideoBusiness()
            const output = await videoBusiness.editVideo(input)
            
            res.status(200).send(output)
    
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
    
            const videoBusiness = new VideoBusiness()
            const output = await videoBusiness.deleteVideo(videoId)

            res.status(200).send(output)
    
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