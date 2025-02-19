import { ApiClient, config } from "@/utils/configApi";

const apiClient = new ApiClient(config);

type User = {
  id: number;
  name: string;
  email: string;
};

export const userApi = {
  getListUser: () => {
    return apiClient.get<User[]>('/users');
  },
  createUser: (requestBody: any) => {
    return apiClient.post('/endpoint', requestBody);
  },
  updateUser: (requestBody: any) => {
    return apiClient.patch('/endpoint', requestBody);
  },
  deleteUser: () => {
    return apiClient.delete('/endpoint');
  }
}
