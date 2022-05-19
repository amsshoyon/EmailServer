import { CreateProjectDto } from './dto/create-project-dto';
import { Project } from './project.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetProjectFilterDto } from './dto/get-project-filter.dto';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
    async getProjects(filterDto: GetProjectFilterDto): Promise<{ result: Project[]; count: number }> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('project');
        if (search) query.andWhere('(project.title LIKE :search)', { search: `%${search}%` });
        const [result, count] = await query.getManyAndCount();
        return { result, count };
    }

    async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        const { title } = createProjectDto;
        const project = new Project();
        project.title = title;
        await project.save();
        return project;
    }
}
