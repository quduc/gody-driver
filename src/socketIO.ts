import { io } from "socket.io-client";
import { useStore } from "./store/useStore";

export const socket = io('http://108.61.182.206:5000', {
    query: {
        token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTJhMGFkMjJhOTA0YTEzMDA0Zjc5MzMiLCJwaG9uZSI6Iis4NDk2NDIzMjgyNSIsIm5hbWUiOiJLaMOhY2ggaMOgbmciLCJyb2xlIjp7ImlzQWN0aXZlIjp0cnVlLCJfaWQiOiI2MTI3NTJjN2UxZmVlYTQyNGM0NDYwYzkiLCJuYW1lIjoiQ3VzdG9tZXIiLCJjb2RlIjoiY3VzdG9tZXIiLCJfX3YiOjB9LCJpYXQiOjE2MzEzMzI1MDMsImV4cCI6MTAwMDE2MzEzMzI1MDJ9.22osW7atc-9_1WYQslCfnyOwaSwA1MgfBQbGK9utlCI',
    },
});

export const connectSocket = (token: string) => {
    return io('http://108.61.182.206:5000', {
        query: {
            token
        },
    });
}