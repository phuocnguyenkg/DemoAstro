export async function onRequest(context, next) {
  try {
    // Chuyển tiếp yêu cầu đến endpoint hoặc API route tiếp theo
    const response = await next();

    // Kiểm tra nếu phản hồi là lỗi (status code >= 400)
    if (response.status >= 400) {
      throw new Error(`API failed with status: ${response.status}`);
    }

    // Trả về phản hồi thành công
    return response;
  } catch (error) {
    // Xử lý lỗi và trả về phản hồi tùy chỉnh
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
