import { Hono } from "@hono/hono";
import { generateRandomId } from "./ramdomId.ts";
import { schema, urlCollection } from "./database.ts";

const app = new Hono();

app.post("/", async (c) => {
    try{
        const hostUrl = c.req.url
        const {url} = await c.req.json()
        console.log(url);
        
        const randomId = generateRandomId(6)

        urlCollection.save({_id: randomId, url});
        return c.json({ id: randomId, url , shortUrl: hostUrl+randomId}, 201);
    }catch(_){
        return c.json({ error: "Something Went Wrong" }, 400);
    }
});

app.get("/:id", async (c)=>{
    try {
        const id =  c.req.param("id")
        const result = await urlCollection.findById(id)
        if (!result.value) return c.html(
            `<div align="center">
                <h1>404</h1>
                <h2>URL Not Found</h2>
            </div>`
        )
        
        // redirect to the url
        const {url} = result.value as schema;
        return c.redirect(url, 302)
    } catch (err) {
        console.log(err)
        return c.json({ error: "Something Went Wrong" }, 400);
    }
})

export default app;