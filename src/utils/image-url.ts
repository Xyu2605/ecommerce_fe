/**
 * Chuyển đổi URL ảnh từ MinIO nội bộ (Docker) sang URL public mà browser có thể truy cập.
 *
 * Ví dụ:
 *   http://minio:9000/images/abc.jpg → http://localhost:9000/images/abc.jpg
 */
export function toPublicImageUrl(url: string | undefined | null): string {
    if (!url) return "/placeholder.png";

    const publicMinioUrl = import.meta.env.VITE_MINIO_URL || "http://localhost:9000";

    // Thay thế hostname nội bộ Docker bằng URL public
    return url.replace(/^https?:\/\/minio:\d+/, publicMinioUrl);
}
