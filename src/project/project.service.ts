import { CreateProjectDto } from './dto/create-project-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { GetProjectFilterDto } from './dto/get-project-filter.dto';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectRepository)
        private projectRepository: ProjectRepository
    ) {}

    async getAllProjects(filterDto: GetProjectFilterDto): Promise<{ result: Project[]; count: number }> {
        return this.projectRepository.getProjects(filterDto);
    }

    async getProjectById(id: number): Promise<Project> {
        const project = await this.projectRepository.findOne(id);
        if (!project) throw new NotFoundException(`Project with id ${id} not found`);
        return project;
    }

    async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectRepository.createProject(createProjectDto);
    }

    async deleteProject(id: number): Promise<void> {
        const result = await this.projectRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Project with ID "${id}" not found`);
    }
}
