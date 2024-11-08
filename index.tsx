import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import * as elements from "typed-html";

const app = new Elysia()
    .use(html())
    .get("/", ({ html }) => html(
        <BaseHtml>
            <body class="flex w-full h-screen justify-center items-center">
                <h1>Basic HTML</h1>
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    hx-post="/clicked"
                    hx-swap="outerHTML">
                    Click Me
                </button>
            </body>
        </BaseHtml>
    ))
    .post("/clicked", () => <div> I was rendered on the server </div>)
    .listen(3000)

console.log(
    `Elysia is running on http://${app.server?.hostname}:${app.server?.port}`
)

const BaseHtml = ({ children }: any /*elements.Children*/ ) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beth Example</title>
    <script src="https://unpkg.com/htmx.org@2.0.3" integrity="sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq" crossorigin="anonymous"></script>
    <!-- Note: tailwind does not recomend this for prod -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>

${children}
`

