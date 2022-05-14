import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from 'src/interceptor/ResponseInterceptor';
import { TemplateService } from './template.service';
import { GetTemplateFilterDto } from './dto/get-template-filter.dto';
import { CreateTemplateDto, TemplateDto } from './dto/template-dtos';

@Controller('template')
@UseGuards(AuthGuard())
@UseInterceptors(ResponseInterceptor)
export class TemplateController {
    constructor(private templateService: TemplateService) {}

    @Get()
    getAllTemplates(@Query(ValidationPipe) filterDto: GetTemplateFilterDto): Promise<{ templates: TemplateDto[]; count: number }> {
        return this.templateService.getAllTemplates(filterDto);
    }

    @Get('/:id')
    getTemplatesById(@Param('id', ParseIntPipe) id: number): Promise<TemplateDto> {
        return this.templateService.getTemplateById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTemplates(@Body() createTemplatesDto: CreateTemplateDto): Promise<TemplateDto> {
        return this.templateService.createTemplate(createTemplatesDto);
    }

    @Delete('/:id')
    deleteTemplate(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.templateService.deleteTemplate(id);
    }
}
