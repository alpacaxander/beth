import { html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import * as elements from "typed-html";

type Todo = {
    id: number,
    name: string,
    checked: boolean
}

const db: Todo[] = [
    {
        id: 1,
        name: "Learn vim motions you slow fuck",
        checked: false
    },
    {
        id: 2,
        name: "Fill out your journel for today",
        checked: true
    }
]

const app = new Elysia()
    .use(html())
    .get("/", ({ html }) => html(
        <BaseHtml>
            <body 
                class="flex w-full h-screen justify-center items-center"
                hx-get="/todos"
                hx-trigger="load"
            >
                spinner
            </body>
        </BaseHtml>
    ))
    .post("/clicked", () => <div> I was rendered on the server </div>)
    .get("/todos", () => <TodoList todos={db}/>)
    .post(
        "/todo/:id/toggle",
        ({params}) => {
            const todo = db.find((todo) => todo.id === params.id)
            if (todo) {
                todo.checked = !todo.checked
                return <Todo {...todo}/>
            }
        },
        {
            params: t.Object({
                id: t.Numeric(),
            })
        }
    )
    .delete(
        "/todo/:id",
        ({params}) => {
            const index = db.findIndex((todo) => todo.id === params.id)
            db.splice(index, 1)
            
        },
        {
            params: t.Object({
                id: t.Numeric(),
            })
        }
    )
    .listen(3000)

console.log(
    `Elysia is running on http://${app.server?.hostname}:${app.server?.port}`
)

const Todo = ({id, name, checked}: Todo) => (
    <div>
        <p>{name}</p>
        <input
            hx-post={`/todo/${id}/toggle`}
            hx-target="closest div"
            hx-swap="outerHTML"
            type="checkbox"
            checked={checked}
        ></input>
        <button
            class="text-red-500"
            hx-delete={`/todo/${id}`}
            hx-swap="outerHTML"
            hx-target="closest div"
        >
            X
        </button>

    </div>
)

const TodoList = ({todos}: {todos: Todo[]}) => (
    <ul>
        {
            todos.map((todo) => (
                <li><Todo {...todo}/></li>
            ))
        }
        
    </ul>
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

