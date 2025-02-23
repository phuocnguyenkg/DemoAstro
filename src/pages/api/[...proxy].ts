import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  try {
    // Lấy đường dẫn từ yêu cầu
    const path = Array.isArray(context.params.proxy)
      ? context.params.proxy.join('/') // Nếu là mảng, chuyển thành chuỗi
      : context.params.proxy || '';    // Nếu là chuỗi, sử dụng trực tiếp

    const apiUrl = `https://jsonplaceholder.typicode.com/${path}`;

    // Gọi API bên ngoài
    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      throw new Error(`API failed with status: ${apiResponse.status}`);
    }

    // Trả về phản hồi từ API bên ngoài
    return new Response(await apiResponse.text(), {
      status: apiResponse.status,
      headers: apiResponse.headers,
    });
  } catch (error) {
    // Xử lý lỗi và trả về phản hồi tùy chỉnh
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
