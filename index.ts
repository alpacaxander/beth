import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello World!").listen(3000)
console.log(
    `Elysia is running on http://${app.server?.hostname}:${app.server?.port}`
)

