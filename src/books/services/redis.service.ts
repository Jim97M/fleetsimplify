import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";
import axios from "axios";

@Injectable()
export class RedisServiceClass {
   
    constructor(
      @Inject('Redis') private readonly redisClient: Redis,
      
    ) {}

    async getBookInfo(isbn: string): Promise<any> {
        const cachedInfo = await this.redisClient.get(isbn);

        if (cachedInfo) {
            return JSON.parse(cachedInfo);
          } else {
            const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`);
            const bookInfo = response.data[`ISBN:${isbn}`];
            
            // Cache the fetched information for future use
            await this.redisClient.set(isbn, JSON.stringify(bookInfo));
      
            return bookInfo;
          }
    }
}
