export interface SwaggerCustomOptions {
    useGlobalPrefix?: boolean;
    explorer?: boolean;
    swaggerOptions?: Record<string, any>;
    customCss?: string;
    customCssUrl?: string;
    customJs?: string;
    customJsStr?: string;
    customfavIcon?: string;
    swaggerUrl?: string;
    customSiteTitle?: string;
    validatorUrl?: string;
    url?: string;
    urls?: Record<'url' | 'name', string>[];
    initOAuth?: Record<string, any>;
}
