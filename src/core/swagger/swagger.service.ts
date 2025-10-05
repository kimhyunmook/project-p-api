import { Injectable, INestApplication, RequestMethod } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

@Injectable()
export class SwaggerService {
  /**
   * 전역 접두사 설정
   */
  setupGlobalPrefix(app: INestApplication): void {
    app.setGlobalPrefix("api/v1", {
      exclude: [
        { path: "api-docs", method: RequestMethod.ALL },
        { path: "health", method: RequestMethod.ALL },
        { path: "auth/signup", method: RequestMethod.ALL },
        { path: "auth/signin", method: RequestMethod.ALL },
      ],
    });
  }

  /**
   * Swagger 문서 설정
   */
  setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle("Project P API")
      .setDescription("The Project P API description")
      .setVersion("1.0")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api-docs", app, document, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        persistAuthorization: true,
      },
    });
  }

  /**
   * 애플리케이션 설정 초기화
   */
  setup(app: INestApplication): void {
    this.setupGlobalPrefix(app);
    this.setupSwagger(app);
  }
}
