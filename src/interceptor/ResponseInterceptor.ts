import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response {
    statusCode: number;
    message: string;
    data: any;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor<Response> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
        return next.handle().pipe(
            map(data => ({
                statusCode: context.switchToHttp().getResponse().statusCode,
                message: data.message ? data.message : 'success',
                count: data.count,
                data: data.result ? data.result : data
            }))
        );
    }
}
