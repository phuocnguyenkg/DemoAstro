export const BASE_PATH = "http://localhost:3003/".replace(/\/+$/, "");

export interface ConfigurationParameters {
  basePath?: string;
  headers?: { [key: string]: string };
  middleware?: Middleware[];
  timeout?: number; // Thêm timeout cho yêu cầu
}

export class Configuration {
  constructor(private configuration: ConfigurationParameters = {}) { }

  get basePath(): string {
    return this.configuration.basePath || BASE_PATH;
  }

  get headers(): { [key: string]: string } {
    return this.configuration.headers || {};
  }

  get middleware(): Middleware[] {
    return this.configuration.middleware || [];
  }

  get timeout(): number {
    return this.configuration.timeout || 5000; // Mặc định timeout là 5000ms
  }
}

export interface Middleware {
  beforeRequest?(context: RequestContext): Promise<FetchParams | void>;
  afterResponse?(context: ResponseContext): Promise<Response | void>;
  handleError?(context: ErrorContext): Promise<Response | void>;
}

export interface RequestContext {
  url: string;
  init: RequestInit;
}

export interface ResponseContext {
  url: string;
  init: RequestInit;
  response: Response;
}

export interface ErrorContext {
  url: string;
  init: RequestInit;
  error: unknown;
  response?: Response;
}

export interface FetchParams {
  url: string;
  init: RequestInit;
}

export class ApiClient {
  private middleware: Middleware[];

  constructor(private configuration: Configuration) {
    this.middleware = configuration.middleware;
  }

  async request<T = any>(context: RequestContext): Promise<T> {
    let fetchParams: FetchParams = {
      url: context.url,
      init: {
        ...context.init,
        headers: {
          ...this.configuration.headers,
          ...context.init.headers,
        },
      },
    };

    // beforeRequest middleware: Thực hiện trước khi gửi yêu cầu HTTP
    for (const middleware of this.middleware) {
      if (middleware.beforeRequest) {
        fetchParams = await middleware.beforeRequest(fetchParams) || fetchParams;
      }
    }

    let response: Response | undefined;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.configuration.timeout);
    fetchParams.init.signal = controller.signal;

    try {
      response = await fetch(fetchParams.url, fetchParams.init);
      clearTimeout(timeoutId);
    } catch (error) {
      // handleError middleware: Thực hiện khi có lỗi xảy ra
      for (const middleware of this.middleware) {
        if (middleware.handleError) {
          response = await middleware.handleError({ ...fetchParams, error }) || response!;
        }
      }
      throw error;
    }

    // afterResponse middleware: Thực hiện sau khi nhận được phản hồi từ yêu cầu HTTP
    for (const middleware of this.middleware) {
      if (middleware.afterResponse) {
        response = await middleware.afterResponse({ ...fetchParams, response }) || response;
      }
    }

    return response.json();
  }

  async get<T = any>(url: string, headers?: { [key: string]: string }): Promise<T> {
    return this.request<T>({
      url: `${this.configuration.basePath}${url}`,
      init: {
        method: 'GET',
        headers,
      },
    });
  }

  async post<T = any>(url: string, body: any, headers?: { [key: string]: string }): Promise<T> {
    return this.request<T>({
      url: `${this.configuration.basePath}${url}`,
      init: {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      },
    });
  }

  async patch<T = any>(url: string, body: any, headers?: { [key: string]: string }): Promise<T> {
    return this.request<T>({
      url: `${this.configuration.basePath}${url}`,
      init: {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers,
      },
    });
  }

  async delete<T = any>(url: string, headers?: { [key: string]: string }): Promise<T> {
    return this.request<T>({
      url: `${this.configuration.basePath}${url}`,
      init: {
        method: 'DELETE',
        headers,
      },
    });
  }
}

export const config = new Configuration({
  basePath: 'http://localhost:3003/', // Đường dẫn cơ sở cho các yêu cầu API
  headers: {
    'Content-Type': 'application/json', // Tiêu đề HTTP mặc định
    // 'Authorization': 'Bearer your-token-here', // Tiêu đề Authorization
  },
  timeout: 5000, // Timeout cho yêu cầu
  middleware: [
    {
      beforeRequest: async (context) => {
        console.log('Request:', context); // Ghi log yêu cầu trước khi gửi
        return context;
      },
      afterResponse: async (context) => {
        console.log('Response:', context.response); // Ghi log phản hồi sau khi nhận
        return context.response;
      },
      handleError: async (context) => {
        console.error('Error:', context.error); // Ghi log lỗi nếu có
        return context.response;
      },
    },
  ],
});
