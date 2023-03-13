import { Cat } from '@/domain/cat'
import { BaseAPIService } from './base-api-service'

interface GetCommand {
  id: string
}


export class CatsService extends BaseAPIService {
  async get (params: GetCommand): Promise<Cat | null> {
    return await this._fetchGET(`http://localhost:8080/api/1/cats/${params.id}`)
  }

  async all(): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET("http://localhost:8080/api/1/cats")
  }

  async search(params: any): Promise<{ cats: Cat[] } | null> {
    return this._fetchGET(`http://localhost:8080/api/1/cats/search/${params}`)
  }
}
