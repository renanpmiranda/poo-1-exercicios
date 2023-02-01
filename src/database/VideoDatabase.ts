import { TVideoDB } from './../types';
import { BaseDatabase } from "./BaseDatabase";

export class VideoDatabase extends BaseDatabase {

    public static TABLE_VIDEOS = "videos"

    public async findVideos(): Promise <TVideoDB[]> {
        const result = await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS)
        return result
    }

    public async findVideoById(id: string | undefined): Promise <TVideoDB | undefined> {
        const [ videoDBExists ] = await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS).where({ id })
        return videoDBExists
    }

    public async insertVideo(newVideo: TVideoDB): Promise <void> {
        await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS).insert(newVideo)
    }

    public async editVideo(id: string | undefined, newVideoDB: TVideoDB): Promise <void> {
        await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS).update(newVideoDB).where({ id })
    }

    public async deleteVideo(id: string | undefined): Promise <void> {
        await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS).del().where({ id })
    }
}