import { createServer, Model } from "miragejs"

export function makeServer({ environment = 'test' }) {
  return createServer({
    environment,

    models: {
      todo: Model,
    },

    seeds(server) {
      server.create('todo', {
        id: 1,
        text: "text",
        done: false,
        category: "Personal",
        priority: "Low",
        date: 1637439398294
      })
      server.create('todo', {
        id: 2,
        text: "text2",
        done: false,
        category: "Personal",
        priority: "Low",
        date: 1637439398294
      })
    },

    routes() {
      this.namespace = "api"

      this.get("/todo", (schema, request) => {
        return schema.todos.all()
      })

      this.post("/todo", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return schema.todos.create(attrs)
      })

      this.patch("/todo/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody)
        let id = request.params.id
        let todo = schema.todos.find(id)

        return todo.update(newAttrs)
      })

      this.delete("/todo/:id", (schema, request) => {
        let id = request.params.id
        return schema.todos.find(id).destroy()
      })
    },

  })
}