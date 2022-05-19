import { CreateProjectDto } from './dto/create-project-dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { GetProjectFilterDto } from './dto/get-project-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags('Projects')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
@UseInterceptors(ResponseInterceptor)
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Get()
    getAllProjects(@Query(ValidationPipe) filterDto: GetProjectFilterDto) {
        return this.projectService.getAllProjects(filterDto);
    }

    @Get('/:id')
    getProjectById(@Param('id', ParseIntPipe) id: number): Promise<Project> {
        return this.projectService.getProjectById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectService.createProject(createProjectDto);
    }

    @Delete('/:id')
    deleteProject(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.projectService.deleteProject(id);
    }
}
