import { Controller, Get, Post, Delete, Param, Patch, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// entry points of URL e.g http://localhost:3000/movies
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll(): Movie[] {
        console.log("getAll Controller.");
        return this.moviesService.getAll();
    }

    // @Get("/search")
    // search(@Query('year') searchingYear: string) {
    //     return `We are searching for a movie made after ${searchingYear}`;
    // }

    @Get('/:id')
    getOne(@Param('id') id: number): Movie {
        console.log("getOne Controller.");
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        console.log("create Controller.")
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') id: number) {
        console.log("remove Controller.")
        return this.moviesService.deleteOne(id);
    }

    @Patch("/:id")
    patch(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
        console.log("patch Controller.")
        // return {
        //     updatedMovie: id,
        //     ...updateData,
        // };
        return this.moviesService.patch(id, updateData);
    }
}
