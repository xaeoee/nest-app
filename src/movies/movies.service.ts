import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[]  {
        return this.movies;
    }

    getOne(id:number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie) {
            throw new NotFoundException(`Movie with ID: ${id} not found.`);
        }
        return movie;
    }

    deleteOne(id:number): boolean {
        this.getOne(id);
        console.log("current total movies: ", this.movies.length);
        console.log(`movie id that currently deleting: ${id}`);
        // filter 메서드가 this.movies 배열을 순화할 때, 배열의 각 요소(즉, 각 영화 객체)가 movie로 전달 된다.
        this.movies = this.movies.filter(movie => movie.id !== id);
        console.log("total movies after deleting: ", this.movies.length);
        return true;
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    patch(id: number, movieData: UpdateMovieDto) {
        // const movie = this.getOne(id);
    
        // Object.assign(movie, movieData);
    
        // return movie;
        const movie = this.getOne(id); // Fetches the movie with the specified id
        this.deleteOne(id);            // Deletes the movie with the specified id from the array    
        this.movies.push({ ...movie, ...movieData }); // Adds the updated movie back into the array
    }
}
