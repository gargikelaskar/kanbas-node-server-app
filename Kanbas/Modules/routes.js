import * as dao from "./dao.js"; 

function ModuleRoutes(app) {
    
    app.get("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const modules = await dao.findModulesByCourse(cid);
        res.send(modules);
    });

    app.post("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        const module = await dao.createModule(newModule);
        res.send(newModule);
    });

    app.delete("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const status = await dao.deleteModule(mid);
        res.sendStatus(200);
    });

    app.put("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const status = await dao.updateModule(mid, req.body);
        res.sendStatus(204);
    });
}
export default ModuleRoutes;